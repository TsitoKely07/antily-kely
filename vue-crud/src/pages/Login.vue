<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleSubmit = () => {
  router.push('/member');
};
</script>

<template>
  <div class="auth-shell">
    <div class="auth-form-side">
      <div class="auth-card">
        <div class="auth-brand">Gestion de données</div>
        <h1 class="auth-title">Connexion</h1>
        <p class="auth-subtitle">Connectez-vous pour accéder à votre espace.</p>
        <form @submit.prevent="handleSubmit">
          <label for="email">
            Adresse email
            <input id="email" type="email" v-model="email" required />
          </label>
          <label for="password">
            Mot de passe
            <input id="password" type="password" v-model="password" required />
          </label>
          <div class="form-actions">
            <button type="submit" class="btn">Se connecter</button>
          </div>
        </form>
        <p class="auth-switch">Pas encore de compte ? <RouterLink to="/register">Créer un compte</RouterLink></p>
      </div>
    </div>
    <div class="auth-preview-side">
      <div class="preview-card">
        <h2>Aperçu de l'espace de gestion</h2>
        <p>Un exemple de ce que vous retrouverez une fois connecté.</p>
        <div class="preview-row">
          <span class="preview-row-name">Élément un</span>
          <span class="badge badge-success">Actif</span>
        </div>
        <div class="preview-row">
          <span class="preview-row-name">Élément deux</span>
          <span class="badge badge-warning">En attente</span>
        </div>
        <div class="preview-row">
          <span class="preview-row-name">Élément trois</span>
          <span class="badge badge-neutral">Archivé</span>
        </div>
      </div>
    </div>
  </div>
</template>
