<template>
  <header>
    <h1>
      <RouterLink to="/">{{ t('global.siteName') }}</RouterLink>
      <button
        type="button"
        class="language-toggle"
        @click="handleLanguageToggle"
      >
        {{ t('global.languageToggle') }}
      </button>
    </h1>

    <nav>
      <RouterLink :to="{ path: '/', hash: '#projects' }">
        {{ t('global.nav.projects') }}
      </RouterLink>
      <RouterLink to="/archive">{{ t('global.nav.archives') }}</RouterLink>
      <RouterLink to="/recreation">{{ t('global.nav.recreation') }}</RouterLink>
      <RouterLink to="/info">{{ t('global.nav.info') }}</RouterLink>
    </nav>
    <button type="button" @click="handleLanguageToggle">
      {{ t('global.languageToggle') }}
    </button>
    <button type="button" @click="toggleGlobalNav">{{ t('global.menuLabel') }}</button>
    <GlobalNav v-if="showGlobalNav" @close="closeGlobalNav" />
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import GlobalNav from './GlobalNav.vue';
import { ref } from 'vue';
import { useTranslations } from '@/translation';
import { useStore } from '@/store';

const showGlobalNav = ref(false);
const { t } = useTranslations();
const store = useStore();

function toggleGlobalNav() {
  showGlobalNav.value = !showGlobalNav.value;
}

function closeGlobalNav() {
  showGlobalNav.value = false;
}

async function handleLanguageToggle() {
  await store.toggleLocale();
}
</script>

<style scroped>
header .is-mobile > nav {
    text-transform: capitalize;
}
</style>
