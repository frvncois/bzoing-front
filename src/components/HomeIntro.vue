<template>
  <ul home>
    <li></li>
    <li v-if="store.state.homeData"><p>{{ store.state.homeData.homeIntro }}</p></li>
    <li v-if="store.state.homeData"><p>{{ store.state.homeData.homeAbout }}</p></li>
  </ul>
</template>

<script setup>
import { useStore } from '@/store';
const store = useStore();
</script>