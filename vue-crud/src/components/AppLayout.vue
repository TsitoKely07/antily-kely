<script setup lang="ts">
import '../App.css';
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div>
        <div class="sidebar-brand">Gestion de données</div>
        <nav class="sidebar-nav">
        <RouterLink to="/member" active-class="active">Member</RouterLink>
        <RouterLink to="/membership" active-class="active">Membership</RouterLink>
        <RouterLink to="/membership-year" active-class="active">MembershipYear</RouterLink>
        <RouterLink to="/territory" active-class="active">Territory</RouterLink>
        <RouterLink to="/branch" active-class="active">Branch</RouterLink>
        <RouterLink to="/membership-fee" active-class="active">MembershipFee</RouterLink>
        <RouterLink to="/territory-level" active-class="active">TerritoryLevel</RouterLink>
        <RouterLink to="/role" active-class="active">Role</RouterLink>
        <RouterLink to="/membership-payment" active-class="active">MembershipPayment</RouterLink>
        </nav>
      </div>
      <div class="sidebar-footer">
        <p>Généré avec MCD Creator. Merci de l'utiliser !</p>
        <p>Ce projet est entièrement personnalisable.</p>
        <a href="https://www.linkedin.com/in/yoanh-mantele-594a0527a" target="_blank" rel="noopener noreferrer">Suivre le créateur sur LinkedIn</a>
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        <RouterLink to="/login" class="topbar-action">Déconnexion</RouterLink>
      </header>
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
