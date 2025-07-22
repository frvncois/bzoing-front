<script setup>
import ProjectsList from '@/components/ProjectsList.vue';
import HomeIntro from '@/components/HomeIntro.vue';
import HomeSticky from '@/components/HomeSticky.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
</script>

<template>
  <main>
    <HomeIntro />
    <HomeSticky />
    <ProjectsList />
    <GlobalFooter />
  </main>
</template>