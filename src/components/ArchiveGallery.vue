<template>
    <ul masonery>
        <li v-for="image in gallery" :key="image.id">
           <img :src="`http://localhost:1337${image.url}`" :alt="image.name" />
        </li>
    </ul>
</template>
  
<script setup>
  defineProps({
    gallery: {
      type: Array,
      required: true
    }
  });
</script>