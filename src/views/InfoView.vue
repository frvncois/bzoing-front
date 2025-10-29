<script setup>
import InfoClients from '@/components/info/InfoClients.vue';
import InfoContact from '@/components/info/InfoContact.vue';
import InfoIntro from '@/components/info/InfoIntro.vue';
import InfoTeam from '@/components/info/InfoTeam.vue';
import InfoServices from '@/components/info/InfoServices.vue';
import InfoForm from '@/components/info/InfoForm.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
</script>

<template>
  <main>
    <InfoIntro />
    <InfoContact />
    <InfoTeam />
    <InfoClients />
    <InfoServices />
    <InfoForm />
    <GlobalFooter />
  </main>
</template>