<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiClient } from '../api/client';

type Row = Record<string, unknown>;

const rows = ref<Row[]>([]);
const membershipYearOptions = ref<Row[]>([]);
const roleOptions = ref<Row[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const load = () => {
  loading.value = true;
  error.value = null;
  apiClient
    .list<Row>('membership-fee')
    .then((data) => { rows.value = data; })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
};

onMounted(load);

onMounted(() => {
  apiClient.list<Row>('membership-year').then((data) => { membershipYearOptions.value = data; }).catch(() => {});
  apiClient.list<Row>('role').then((data) => { roleOptions.value = data; }).catch(() => {});
});

const membershipYearLabel = (id: unknown) => {
  if (id === null || id === undefined || id === '') return '';
  const found = membershipYearOptions.value.find((o) => String(o.id) === String(id));
  return found ? String((found as any).label ?? id ?? '') : String(id);
};
const roleLabel = (id: unknown) => {
  if (id === null || id === undefined || id === '') return '';
  const found = roleOptions.value.find((o) => String(o.id) === String(id));
  return found ? String((found as any).label ?? id ?? '') : String(id);
};

const handleDelete = async (id: unknown) => {
  if (!window.confirm('Supprimer cet élément ?')) return;
  await apiClient.remove('membership-fee', id as string);
  load();
};
</script>

<template>
  <div>
    <div class="page-header">
      <h1>MembershipFee</h1>
      <RouterLink class="btn" to="/membership-fee/new">+ Nouveau</RouterLink>
    </div>
    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="empty-state">{{ error }}</p>
    <p v-else-if="rows.length === 0" class="empty-state">Aucun élément pour le moment.</p>
    <div v-else class="card">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>membershipYearId</th>
          <th>fee</th>
          <th>roleId</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="String(row.id ?? i)">
          <td>{{ (row as any).id ?? '' }}</td>
          <td>{{ membershipYearLabel((row as any).membershipYearId) }}</td>
          <td>{{ (row as any).fee ?? '' }}</td>
          <td>{{ roleLabel((row as any).roleId) }}</td>
          <td>
            <RouterLink :to="`/membership-fee/${row.id}/edit`">Modifier</RouterLink>
            <button type="button" class="btn danger" @click="handleDelete(row.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
