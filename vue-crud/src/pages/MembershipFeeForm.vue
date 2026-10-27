<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiClient } from '../api/client';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const isEdit = Boolean(id);
const loading = ref(isEdit);
const error = ref<string | null>(null);
type OptionRow = Record<string, unknown>;
const membershipYearOptions = ref<OptionRow[]>([]);
const roleOptions = ref<OptionRow[]>([]);
const values = reactive<Record<string, unknown>>({
  membershipYearId: '' as unknown,
  fee: '' as unknown,
  roleId: '' as unknown,
});

onMounted(() => {
  apiClient.list<OptionRow>('membership-year').then((data) => { membershipYearOptions.value = data; }).catch(() => {});
  apiClient.list<OptionRow>('role').then((data) => { roleOptions.value = data; }).catch(() => {});
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('membership-fee', id)
    .then((data) => {
    values.membershipYearId = (data as any).membershipYearId ?? '';
    values.fee = (data as any).fee ?? '';
    values.roleId = (data as any).roleId ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    membershipYearId: values.membershipYearId === '' ? undefined : values.membershipYearId,
    fee: values.fee === '' ? undefined : Number(values.fee),
    roleId: values.roleId === '' ? undefined : values.roleId,
  };
  try {
    if (isEdit && id) await apiClient.update('membership-fee', id, payload);
    else await apiClient.create('membership-fee', payload);
    router.push('/membership-fee');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : MembershipFee</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'membershipYearId'">
        membership_year_id
        <select id="membershipYearId" name="membershipYearId" v-model="values.membershipYearId" ><option value="">-- Sélectionner --</option><option v-for="opt in membershipYearOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).label ?? opt.id }}</option></select>
      </label>
      <label :for="'fee'">
        fee
        <input type="number" step="any" id="fee" name="fee" v-model="values.fee"  />
      </label>
      <label :for="'roleId'">
        role_id
        <select id="roleId" name="roleId" v-model="values.roleId" ><option value="">-- Sélectionner --</option><option v-for="opt in roleOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).label ?? opt.id }}</option></select>
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/membership-fee')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
