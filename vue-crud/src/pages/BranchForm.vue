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
const values = reactive<Record<string, unknown>>({
  name: '' as unknown,
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('branch', id)
    .then((data) => {
    values.name = (data as any).name ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    name: values.name,
  };
  try {
    if (isEdit && id) await apiClient.update('branch', id, payload);
    else await apiClient.create('branch', payload);
    router.push('/branch');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : Branch</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'name'">
        name
        <input type="text" id="name" name="name" v-model="values.name"  />
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/branch')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
