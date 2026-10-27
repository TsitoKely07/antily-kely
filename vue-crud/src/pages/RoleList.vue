<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiClient } from '../api/client';

type Row = Record<string, unknown>;

const rows = ref<Row[]>([]);
const territoryLevelOptions = ref<Row[]>([]);
const branchOptions = ref<Row[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const load = () => {
  loading.value = true;
  error.value = null;
  apiClient
    .list<Row>('role')
    .then((data) => { rows.value = data; })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
};

onMounted(load);

onMounted(() => {
  apiClient.list<Row>('territory-level').then((data) => { territoryLevelOptions.value = data; }).catch(() => {});
  apiClient.list<Row>('branch').then((data) => { branchOptions.value = data; }).catch(() => {});
});

const territoryLevelLabel = (id: unknown) => {
  if (id === null || id === undefined || id === '') return '';
  const found = territoryLevelOptions.value.find((o) => String(o.id) === String(id));
  return found ? String((found as any).name ?? id ?? '') : String(id);
};
const branchLabel = (id: unknown) => {
  if (id === null || id === undefined || id === '') return '';
  const found = branchOptions.value.find((o) => String(o.id) === String(id));
  return found ? String((found as any).name ?? id ?? '') : String(id);
};

const handleDelete = async (id: unknown) => {
  if (!window.confirm('Supprimer cet élément ?')) return;
  await apiClient.remove('role', id as string);
  load();
};
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Role</h1>
      <RouterLink class="btn" to="/role/new">+ Nouveau</RouterLink>
    </div>
    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="empty-state">{{ error }}</p>
    <p v-else-if="rows.length === 0" class="empty-state">Aucun élément pour le moment.</p>
    <div v-else class="card">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>territoryLevelId</th>
          <th>branchId</th>
          <th>isYouth</th>
          <th>label</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="String(row.id ?? i)">
          <td>{{ (row as any).id ?? '' }}</td>
          <td>{{ territoryLevelLabel((row as any).territoryLevelId) }}</td>
          <td>{{ branchLabel((row as any).branchId) }}</td>
          <td>{{ (row as any).isYouth ?? '' }}</td>
          <td>{{ (row as any).label ?? '' }}</td>
          <td>
            <RouterLink :to="`/role/${row.id}/edit`">Modifier</RouterLink>
            <button type="button" class="btn danger" @click="handleDelete(row.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
