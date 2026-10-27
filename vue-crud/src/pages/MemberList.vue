<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiClient } from '../api/client';

type Row = Record<string, unknown>;

const rows = ref<Row[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const load = () => {
  loading.value = true;
  error.value = null;
  apiClient
    .list<Row>('member')
    .then((data) => { rows.value = data; })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
};

onMounted(load);

const handleDelete = async (id: unknown) => {
  if (!window.confirm('Supprimer cet élément ?')) return;
  await apiClient.remove('member', id as string);
  load();
};
</script>

<template>
  <div>
    <div class="page-header">
      <h1>Member</h1>
      <RouterLink class="btn" to="/member/new">+ Nouveau</RouterLink>
    </div>
    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="empty-state">{{ error }}</p>
    <p v-else-if="rows.length === 0" class="empty-state">Aucun élément pour le moment.</p>
    <div v-else class="card">
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>firstname</th>
          <th>dateOfBirth</th>
          <th>email</th>
          <th>phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="String(row.id ?? i)">
          <td>{{ (row as any).id ?? '' }}</td>
          <td>{{ (row as any).name ?? '' }}</td>
          <td>{{ (row as any).firstname ?? '' }}</td>
          <td>{{ (row as any).dateOfBirth ?? '' }}</td>
          <td>{{ (row as any).email ?? '' }}</td>
          <td>{{ (row as any).phone ?? '' }}</td>
          <td>
            <RouterLink :to="`/member/${row.id}/edit`">Modifier</RouterLink>
            <button type="button" class="btn danger" @click="handleDelete(row.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
