<template>
  <footer>
    <ul>
      <li>
        <div>{{ footerCopy?.copyright }}</div>
        <div>{{ footerCopy?.year }}</div>
        <div>
          <template v-for="(line, index) in footerCopy?.addressLines" :key="`address-${index}`">
            <span>{{ line }}</span>
            <br v-if="footerCopy?.addressLines && index < footerCopy.addressLines.length - 1" />
          </template>
        </div>
      </li>
      <li>
        <div>
          <a :href="footerCopy?.emailHref">
            <span v-for="(segment, index) in footerCopy?.emailParts" :key="`email-${index}`">
              {{ segment }}
            </span>
          </a>
          <a :href="footerCopy?.phoneHref">
            <span v-for="(segment, index) in footerCopy?.phoneParts" :key="`phone-${index}`">
              {{ segment }}
            </span>
          </a>
        </div>
        <div>
          <a :href="footerCopy?.socialLinks?.instagram" target="_blank" rel="noopener">
            {{ footerCopy?.social?.instagram }}
          </a>
          <a :href="footerCopy?.socialLinks?.behance" target="_blank" rel="noopener">
            {{ footerCopy?.social?.behance }}
          </a>
        </div>
      </li>
    </ul>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useTranslations } from '@/translation';

const { dictionary } = useTranslations();
const footerCopy = computed(() => dictionary.value?.global?.footer || {});
</script>
