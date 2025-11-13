<template>
  <header>
    <h1><RouterLink to="/">Bzoing</RouterLink></h1>
    <nav>
      <RouterLink
        :to="{ path: '/', hash: '#projects' }"
      >Projets</RouterLink>
      <RouterLink
        to="/archive"
      >Archives</RouterLink>
      <RouterLink
        to="/recreation"
      >Récréation</RouterLink>
      <RouterLink
        to="/info"
      >Infos</RouterLink>
      <RouterLink
        to="/info"
      >EN</RouterLink>
    </nav>
    <button @click="toggleGlobalNav">menu</button>
    <GlobalNav v-if="showGlobalNav" @close="closeGlobalNav" />
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import GlobalNav from './GlobalNav.vue';
import { ref } from 'vue';

const showGlobalNav = ref(false);

function toggleGlobalNav() {
  showGlobalNav.value = !showGlobalNav.value;
}

function closeGlobalNav() {
  showGlobalNav.value = false;
}
</script>

<style scroped>
header .is-mobile > nav {
    text-transform: capitalize;
}
</style>
