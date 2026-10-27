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
const values = reactive<Record<string, unknown>>({
  name: '' as unknown,
  firstname: '' as unknown,
  dateOfBirth: '' as unknown,
  email: '' as unknown,
  phone: '' as unknown,
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('member', id)
    .then((data) => {
    values.name = (data as any).name ?? '';
    values.firstname = (data as any).firstname ?? '';
    values.dateOfBirth = ((data as any).dateOfBirth ? String((data as any).dateOfBirth).slice(0, 10) : '');
    values.email = (data as any).email ?? '';
    values.phone = (data as any).phone ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    name: values.name,
    firstname: values.firstname,
    dateOfBirth: values.dateOfBirth,
    email: values.email,
    phone: values.phone,
  };
  try {
    if (isEdit && id) await apiClient.update('member', id, payload);
    else await apiClient.create('member', payload);
    router.push('/member');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};

const membershipRows = ref<OptionRow[]>([]);
const membershipNew = reactive<Record<string, unknown>>({
  territoryId: '',
  roleDetail: '',
  status: '',
  membershipFeeId: '',
  membershipPaymentId: '',
});
const membershipError = ref<string | null>(null);
const membershipTerritoryOptions = ref<OptionRow[]>([]);
const membershipMembershipFeeOptions = ref<OptionRow[]>([]);
const membershipMembershipPaymentOptions = ref<OptionRow[]>([]);

const loadMembership = () => {
  apiClient.list<OptionRow>('membership').then((all) => {
    membershipRows.value = all.filter((r) => String((r as any).memberId) === String(id));
  }).catch(() => {});
};
onMounted(() => {
  if (!isEdit || !id) return;
  loadMembership();
  apiClient.list<OptionRow>('territory').then((data) => { membershipTerritoryOptions.value = data; }).catch(() => {});
  apiClient.list<OptionRow>('membership-fee').then((data) => { membershipMembershipFeeOptions.value = data; }).catch(() => {});
  apiClient.list<OptionRow>('membership-payment').then((data) => { membershipMembershipPaymentOptions.value = data; }).catch(() => {});
});

const membershipTerritoryLabel = (val: unknown) => {
  if (val === null || val === undefined || val === '') return '';
  const found = membershipTerritoryOptions.value.find((o) => String(o.id) === String(val));
  return found ? String((found as any).name ?? val ?? '') : String(val);
};
const membershipMembershipFeeLabel = (val: unknown) => {
  if (val === null || val === undefined || val === '') return '';
  const found = membershipMembershipFeeOptions.value.find((o) => String(o.id) === String(val));
  return found ? String((found as any).membershipYearId ?? val ?? '') : String(val);
};
const membershipMembershipPaymentLabel = (val: unknown) => {
  if (val === null || val === undefined || val === '') return '';
  const found = membershipMembershipPaymentOptions.value.find((o) => String(o.id) === String(val));
  return found ? String((found as any).date ?? val ?? '') : String(val);
};
const handleAddMembership = async () => {
  membershipError.value = null;
  const payload: Record<string, unknown> = {
    territoryId: membershipNew.territoryId === '' ? undefined : membershipNew.territoryId,
    roleDetail: membershipNew.roleDetail,
    status: membershipNew.status === '' ? undefined : Number(membershipNew.status),
    membershipFeeId: membershipNew.membershipFeeId === '' ? undefined : membershipNew.membershipFeeId,
    membershipPaymentId: membershipNew.membershipPaymentId === '' ? undefined : membershipNew.membershipPaymentId,
    memberId: id,
  };
  try {
    await apiClient.create('membership', payload);
    membershipNew.territoryId = '';
    membershipNew.roleDetail = '';
    membershipNew.status = '';
    membershipNew.membershipFeeId = '';
    membershipNew.membershipPaymentId = '';
    loadMembership();
  } catch (err) {
    membershipError.value = err instanceof Error ? err.message : "Erreur lors de l'ajout";
  }
};
const handleDeleteMembership = async (lineId: unknown) => {
  if (!window.confirm('Supprimer cette ligne ?')) return;
  await apiClient.remove('membership', lineId as string);
  loadMembership();
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : Member</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'name'">
        name
        <input type="text" id="name" name="name" v-model="values.name"  />
      </label>
      <label :for="'firstname'">
        firstname
        <input type="text" id="firstname" name="firstname" v-model="values.firstname"  />
      </label>
      <label :for="'dateOfBirth'">
        date_of_birth
        <input type="date" id="dateOfBirth" name="dateOfBirth" v-model="values.dateOfBirth"  />
      </label>
      <label :for="'email'">
        email
        <input type="text" id="email" name="email" v-model="values.email"  />
      </label>
      <label :for="'phone'">
        phone
        <input type="text" id="phone" name="phone" v-model="values.phone"  />
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/member')">Annuler</button>
        </div>
      </form>
      <template v-if="isEdit">
    <div class="detail-block">
      <h2>Membership</h2>
      <p v-if="membershipError" class="empty-state">{{ membershipError }}</p>
      <div class="card">
      <table>
        <thead>
          <tr>
            <th>territory_id</th>
            <th>role_detail</th>
            <th>status</th>
            <th>membership_fee_id</th>
            <th>membership_payment_id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="membershipRows.length === 0"><td colspan="6" class="empty-state">Aucune ligne pour le moment.</td></tr>
          <tr v-for="(row, i) in membershipRows" :key="String(row.id ?? i)">
            <td>{{ membershipTerritoryLabel((row as any).territoryId) }}</td>
            <td>{{ (row as any).roleDetail ?? '' }}</td>
            <td>{{ (row as any).status ?? '' }}</td>
            <td>{{ membershipMembershipFeeLabel((row as any).membershipFeeId) }}</td>
            <td>{{ membershipMembershipPaymentLabel((row as any).membershipPaymentId) }}</td>
            <td><button type="button" class="btn danger" @click="handleDeleteMembership(row.id)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
      </div>
      <form class="detail-add-form" @submit.prevent="handleAddMembership">
        <label :for="'territoryId'">
          territory_id *
          <select id="territoryId" name="territoryId" v-model="membershipNew.territoryId" required><option value="">-- Sélectionner --</option><option v-for="opt in membershipTerritoryOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).name ?? opt.id }}</option></select>
        </label>
        <label :for="'roleDetail'">
          role_detail
          <input type="text" id="roleDetail" name="roleDetail" v-model="membershipNew.roleDetail"  />
        </label>
        <label :for="'status'">
          status *
          <input type="number" step="any" id="status" name="status" v-model="membershipNew.status" required />
        </label>
        <label :for="'membershipFeeId'">
          membership_fee_id
          <select id="membershipFeeId" name="membershipFeeId" v-model="membershipNew.membershipFeeId" ><option value="">-- Sélectionner --</option><option v-for="opt in membershipMembershipFeeOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).membershipYearId ?? opt.id }}</option></select>
        </label>
        <label :for="'membershipPaymentId'">
          membership_payment_id
          <select id="membershipPaymentId" name="membershipPaymentId" v-model="membershipNew.membershipPaymentId" ><option value="">-- Sélectionner --</option><option v-for="opt in membershipMembershipPaymentOptions" :key="String(opt.id)" :value="String(opt.id)">{{ (opt as any).date ?? opt.id }}</option></select>
        </label>
        <div class="form-actions">
          <button type="submit" class="btn">Ajouter</button>
        </div>
      </form>
    </div>
      </template>
    </div>
  </div>
</template>
