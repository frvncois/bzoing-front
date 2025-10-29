<template>
  <header>
    <h1><RouterLink to="/">Bzoing</RouterLink></h1>
    <nav>
      <RouterLink
        to="/"
        @mouseenter="previewRoute = 'Projets'"
        @mouseleave="previewRoute = null"
      >Projets</RouterLink>
      <RouterLink
        to="/archive"
        @mouseenter="previewRoute = 'Archive'"
        @mouseleave="previewRoute = null"
      >Archive</RouterLink>
      <RouterLink
        to="/recreation"
        @mouseenter="previewRoute = 'Recreation'"
        @mouseleave="previewRoute = null"
      >Récréation</RouterLink>
      <RouterLink
        to="/info"
        @mouseenter="previewRoute = 'Info'"
        @mouseleave="previewRoute = null"
      >Info</RouterLink>
    </nav>
    <button @click="toggleGlobalNav">menu</button>
    <GlobalNav v-if="showGlobalNav" @close="closeGlobalNav" />
  </header>
  <div 
    v-if="previewRoute" 
    class="preview-iframe-container"
    :class="{ 
      'preview-front': previewRoute === 'Projets' || previewRoute === 'Info',
      'preview-back': previewRoute === 'Archive' || previewRoute === 'Recreation'
    }"
  >
    <iframe :src="previewUrl" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import GlobalNav from './GlobalNav.vue';
import { ref, computed } from 'vue';

const showGlobalNav = ref(false);
const previewRoute = ref(null);

// Create the preview URL based on the route
const previewUrl = computed(() => {
  if (!previewRoute.value) return '';
  switch(previewRoute.value) {
    case 'Projets': return '/';
    case 'Archive': return '/archive';
    case 'Recreation': return '/recreation';
    case 'Info': return '/info';
    default: return '';
  }
});

function toggleGlobalNav() {
  showGlobalNav.value = !showGlobalNav.value;
}

function closeGlobalNav() {
  showGlobalNav.value = false;
}
</script>

<style scoped>
.preview-iframe-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.preview-front {
  z-index: 2;
}

.preview-back {
  z-index: -2;
}

.preview-iframe-container iframe {
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
}
</style>