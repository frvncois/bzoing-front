<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

onMounted(async () => {
  if (!store.state.homeData || Object.keys(store.state.homeData).length === 0) {
    await store.fetchHome()
  }
})
</script>

<template>
  <ul home>
    <li></li>
    <li v-if="store.state.homeData?.homeIntro">
      <p>{{ store.state.homeData.homeIntro }}</p>
    </li>
    <li v-if="store.state.homeData?.homeAbout">
      <p>{{ store.state.homeData.homeAbout }}</p>
    </li>
  </ul>
</template>

<style>
@media only screen and (max-width: 767px) {
    li:empty {
    display: none !important;
  }
}
</style>