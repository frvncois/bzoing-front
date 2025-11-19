<template>
  <ul>
    <li v-if="info?.infoIntro">
      <p>{{ info.infoIntro }}</p>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const info = computed(() => store.state.infoData || {})

onMounted(async () => {
  if (!store.state.infoData || Object.keys(store.state.infoData).length === 0) {
    await store.fetchInfo()
  }
})
</script>

<style scoped>
p {
  font-size: var(--font-medium);
  line-height: 0.9;
}

@media only screen and (max-width: 767px) {
  p {
  font-size: var(--font-normal);
  }
}
</style>