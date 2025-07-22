<template>
    <ArchiveGallery :gallery="archiveData.archiveGallery" />
    <GlobalFooter /> 
</template>
  
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { inject } from 'vue';
import ArchiveGallery from '@/components/ArchiveGallery.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';

const archiveData = inject('archiveData'); 
let originalBackgroundColor;

onMounted(() => {
    originalBackgroundColor = document.body.style.backgroundColor; // Save current color
    document.body.style.backgroundColor = 'var(--is-yellow)';
});

onUnmounted(() => {
    document.body.style.backgroundColor = originalBackgroundColor; // Restore original color
});
</script>
