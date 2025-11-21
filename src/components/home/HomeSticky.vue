<template>
  <div home>
    <h2>{{ t('home.sticky.lineOne') }}</h2>
    <h2>{{ t('home.sticky.lineTwo') }}</h2>
  </div>
</template>

<script setup>
import { useTranslations } from '@/translation';

const { t } = useTranslations();
</script>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
    position: fixed;
    top: 0;
    left: var(--space-xsmall);
    right: var(--space-xsmall);
    gap: var(--space-xsmall);
    z-index: 0;
    pointer-events: none;
    
}
</style>
