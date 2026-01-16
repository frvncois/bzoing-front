<script setup>
import { RouterView, useRoute } from 'vue-router'
import GlobalHeader from './components/global/GlobalHeader.vue'
import { onMounted, ref, nextTick } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const dataLoaded = ref(false)
const route = useRoute()

onMounted(async () => {
  await store.fetchAllData()
  dataLoaded.value = true

  await nextTick()
  if (window.lenisResize) window.lenisResize()

  // Handle initial hash scroll after DOM is ready
  if (route.hash && window.lenis) {
    setTimeout(() => {
      if (route.hash === '#projects') {
        const svh = window.visualViewport?.height || window.innerHeight
        const isMobile = window.innerWidth < 768
        const scrollTo = svh * (isMobile ? 0.70 : 0.59)
        window.lenis.scrollTo(scrollTo, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
      } else {
        const element = document.querySelector(route.hash)
        if (element) {
          const elementTop = element.offsetTop
          const windowHeight = window.visualViewport?.height || window.innerHeight
          const offset = windowHeight * 0.5
          const scrollTo = elementTop - offset
          window.lenis.scrollTo(scrollTo, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
        }
      }
    }, 100)
  }
})
</script>

<template>
  <template v-if="dataLoaded">
    <GlobalHeader />
    <RouterView />
  </template>
</template>
