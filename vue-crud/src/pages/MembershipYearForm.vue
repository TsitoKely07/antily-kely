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
  label: '' as unknown,
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('membership-year', id)
    .then((data) => {
    values.label = (data as any).label ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    label: values.label,
  };
  try {
    if (isEdit && id) await apiClient.update('membership-year', id, payload);
    else await apiClient.create('membership-year', payload);
    router.push('/membership-year');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : MembershipYear</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'label'">
        label
        <input type="text" id="label" name="label" v-model="values.label"  />
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/membership-year')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
