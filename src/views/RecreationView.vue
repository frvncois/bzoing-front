<script setup>
import { onMounted, onUnmounted } from 'vue'
import GlobalFooter from '@/components/global/GlobalFooter.vue'
import RecreationMain from '@/components/recreation/RecreationMain.vue'

let originalBackgroundColor = ''

onMounted(() => {
  originalBackgroundColor = document.body.style.backgroundColor
  document.body.style.backgroundColor = 'var(--is-grey)'
})

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor || ''
})
</script>

<template>
  <main>
    <RecreationMain />
    <GlobalFooter />
  </main>
</template>

<style scoped>
:deep(footer) {
  position: absolute;
  bottom: var(--space-xsmall);
  left: var(--space-xsmall);
  right: var(--space-xsmall);
}

@media only screen and (max-width: 767px) {
  :deep(footer) {
  position: absolute;
  bottom: var(--space-xsmall);
  left: var(--space-xsmall);
  right: var(--space-xsmall);
}
}
</style>
