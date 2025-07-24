<script setup>
import { RouterView } from 'vue-router'
import GlobalHeader from './components/GlobalHeader.vue';
import GlobalPause from './components/GlobalPause.vue';
import { onMounted, ref, nextTick } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const dataLoaded = ref(false);

onMounted(async () => {
  await store.fetchAllData();
  dataLoaded.value = true;
  
  await nextTick();
  if (window.lenisResize) {
    window.lenisResize();
  }
});
</script>

<template>
  <template v-if="dataLoaded">
    <GlobalHeader />
    <RouterView />
    <GlobalPause />
  </template>
</template>