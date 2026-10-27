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
const territoryLevelOptions = ref<OptionRow[]>([]);
const branchOptions = ref<OptionRow[]>([]);
const values = reactive<Record<string, unknown>>({
  territoryLevelId: '' as unknown,
  branchId: '' as unknown,
  isYouth: false as unknown,
  label: '' as unknown,
});

onMounted(() => {
  apiClient.list<OptionRow>('territory-level').then((data) => { territoryLevelOptions.value = data; }).catch(() => {});
  apiClient.list<OptionRow>('branch').then((data) => { branchOptions.value = data; }).catch(() => {});
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('role', id)
    .then((data) => {
    values.territoryLevelId = (data as any).territoryLevelId ?? '';
    values.branchId = (data as any).branchId ?? '';
    values.isYouth = (data as any).isYouth ?? false;
    values.label = (data as any).label ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    territoryLevelId: values.territoryLevelId === '' ? undefined : values.territoryLevelId,
    branchId: values.branchId === '' ? undefined : values.branchId,
    isYouth: Boolean(values.isYouth),
    label: values.label,
  };
  try {
    if (isEdit && id) await apiClient.update('role', id, payload);
    else await apiClient.create('role', payload);
    router.push('/role');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : Role</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'territoryLevelId'">
        territory_level_id
        <select id="territoryLevelId" name="territoryLevelId" v-model="values.territoryLevelId" ><option value="">-- Sélectionner --</option><option v-for="opt in territoryLevelOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).name ?? opt.id }}</option></select>
      </label>
      <label :for="'branchId'">
        branch_id
        <select id="branchId" name="branchId" v-model="values.branchId" ><option value="">-- Sélectionner --</option><option v-for="opt in branchOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).name ?? opt.id }}</option></select>
      </label>
      <label :for="'isYouth'">
        is_youth
        <input type="checkbox" id="isYouth" name="isYouth" v-model="values.isYouth" />
      </label>
      <label :for="'label'">
        label
        <input type="text" id="label" name="label" v-model="values.label"  />
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/role')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
