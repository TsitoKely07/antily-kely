<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = () => {
  router.push('/login');
};
</script>

<template>
  <div class="auth-shell">
    <div class="auth-form-side">
      <div class="auth-card">
        <div class="auth-brand">Gestion de données</div>
        <h1 class="auth-title">Créer un compte</h1>
        <p class="auth-subtitle">Page statique fournie comme modèle — à connecter à votre propre système d'authentification.</p>
        <form @submit.prevent="handleSubmit">
          <label for="name">
            Nom complet
            <input id="name" type="text" v-model="name" required />
          </label>
          <label for="email">
            Adresse email
            <input id="email" type="email" v-model="email" required />
          </label>
          <label for="password">
            Mot de passe
            <input id="password" type="password" v-model="password" required />
          </label>
          <div class="form-actions">
            <button type="submit" class="btn">Créer mon compte</button>
          </div>
        </form>
        <p class="auth-switch">Déjà un compte ? <RouterLink to="/login">Se connecter</RouterLink></p>
      </div>
    </div>
  </div>
</template>
