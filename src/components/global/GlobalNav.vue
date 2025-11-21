<template>
  <div class="is-mobile">
    <button @click="$emit('close')">X</button>
    <nav>
      <RouterLink
        @click="$emit('close')"
        :to="{ path: '/', hash: '#projects' }"
      >
        {{ t('global.nav.projects') }}
      </RouterLink>
      <RouterLink @click="$emit('close')" to="/archive">
        {{ t('global.nav.archives') }}
      </RouterLink>
      <RouterLink @click="$emit('close')" to="/recreation">
        {{ t('global.nav.recreation') }}
      </RouterLink>
      <RouterLink @click="$emit('close')" to="/info">
        {{ t('global.nav.info') }}
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineEmits } from 'vue';
import { useTranslations } from '@/translation';

const emit = defineEmits(['close']);
const { t } = useTranslations();
</script>
