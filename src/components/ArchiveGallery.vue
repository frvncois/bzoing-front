<template>
  <ul masonery>
    <li v-for="image in store.state.archiveData?.archiveGallery" :key="image.id">
      <img :src="image.url" :alt="image.name" />
    </li>
  </ul>
</template>

<script setup>
import { useStore } from '@/store';

const store = useStore();
</script>