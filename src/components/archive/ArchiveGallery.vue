<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const shuffleGallery = (items) => {
  const shuffled = items.slice()
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const galleryItems = computed(() => {
  const gallery = store.state.archiveData?.archiveGallery
  if (!Array.isArray(gallery)) return []
  return shuffleGallery(gallery)
})
</script>

<template>
  <ul masonery>
    <li v-for="image in galleryItems" :key="image.id">
      <img :src="image.url" :alt="image.name" />
    </li>
  </ul>
</template>
