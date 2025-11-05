<script setup>
import { onMounted, onUnmounted } from 'vue'
import ArchiveGallery from '@/components/archive/ArchiveGallery.vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'

let originalBackgroundColor = ''

onMounted(() => {
  originalBackgroundColor =
    document.body.style.backgroundColor ||
    getComputedStyle(document.body).backgroundColor

  document.body.style.backgroundColor = 'var(--is-yellow)'
})

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor
})
</script>

<template>
  <main>
    <ArchiveGallery />
    <GlobalFooter />
  </main>
</template>
