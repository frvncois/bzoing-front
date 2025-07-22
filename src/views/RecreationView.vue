<template>
    
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
let originalBackgroundColor;

onMounted(() => {
    originalBackgroundColor = document.body.style.backgroundColor; // Save current color
    document.body.style.backgroundColor = 'var(--is-grey)';
});

onUnmounted(() => {
    document.body.style.backgroundColor = originalBackgroundColor; // Restore original color
});
</script>