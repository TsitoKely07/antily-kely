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
  date: '' as unknown,
  amount: '' as unknown,
  status: '' as unknown,
});

onMounted(() => {
  if (!isEdit || !id) return;
  apiClient
    .get('membership-payment', id)
    .then((data) => {
    values.date = ((data as any).date ? String((data as any).date).slice(0, 10) : '');
    values.amount = (data as any).amount ?? '';
    values.status = (data as any).status ?? '';
    })
    .catch((e) => { error.value = e instanceof Error ? e.message : 'Erreur de chargement'; })
    .finally(() => { loading.value = false; });
});

const handleSubmit = async () => {
  error.value = null;
  const payload = {
    date: values.date,
    amount: values.amount === '' ? undefined : Number(values.amount),
    status: values.status === '' ? undefined : Number(values.status),
  };
  try {
    if (isEdit && id) await apiClient.update('membership-payment', id, payload);
    else await apiClient.create('membership-payment', payload);
    router.push('/membership-payment');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
  }
};
</script>

<template>
  <div>
    <p v-if="loading">Chargement...</p>
    <div v-else>
      <h1>{{ isEdit ? 'Modifier' : 'Nouveau' }} : MembershipPayment</h1>
      <p v-if="error" class="empty-state">{{ error }}</p>
      <form @submit.prevent="handleSubmit">
      <label :for="'date'">
        date
        <input type="date" id="date" name="date" v-model="values.date"  />
      </label>
      <label :for="'amount'">
        amount
        <input type="number" step="any" id="amount" name="amount" v-model="values.amount"  />
      </label>
      <label :for="'status'">
        status
        <input type="number" step="any" id="status" name="status" v-model="values.status"  />
      </label>
        <div class="form-actions">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn secondary" @click="router.push('/membership-payment')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
