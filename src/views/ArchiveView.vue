<template>
  <ArchiveGallery />
  <GlobalFooter />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import ArchiveGallery from '@/components/ArchiveGallery.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';

let originalBackgroundColor;

onMounted(() => {
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = 'var(--is-yellow)';
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
});
</script>