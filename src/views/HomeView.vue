<script setup>
  import HomeIntro from '@/components/home/HomeIntro.vue';
  import HomeSticky from '@/components/home/HomeSticky.vue';
  import HomeProjects from '@/components/home/HomeProjects.vue';
  import GlobalFooter from '@/components/global/GlobalFooter.vue';
</script>

<template>
  <main>
    <HomeIntro />
    <HomeSticky />
    <section id="projects"><HomeProjects /></section>
    <GlobalFooter />
  </main>
</template>