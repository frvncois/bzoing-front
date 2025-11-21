<template>
  <ul ref="contactRef">
    <li>
      <h2 @click="toggleMobile">{{ contactText.title }}</h2>
    </li>
    <li>
      <div>
        <h3>{{ contactText.addressLabel }}</h3>
        <p>
          <template v-for="(line, index) in contactText.addressLines" :key="`address-${index}`">
            <span>{{ line }}</span>
            <br v-if="index < contactText.addressLines.length - 1" />
          </template>
        </p>
      </div>
      <div>
        <h4>{{ contactText.phoneLabel }}</h4>
        <a :href="footerCopy.phoneHref">{{ contactText.phoneNumber }}</a>
      </div>
    </li>
    <li>
      <h3>{{ contactText.inquiryTitle }}</h3>
      <a :href="footerCopy.emailHref">{{ contactText.email }}</a>
    </li>
    <li class="desktop">
      <h3>{{ contactText.socialTitle }}</h3>
      <div>
        <a :href="contactText.socialLinks.instagram" target="_blank" rel="noopener">
          {{ footerCopy.social?.instagram }}
        </a>
        <a :href="contactText.socialLinks.behance" target="_blank" rel="noopener">
          {{ footerCopy.social?.behance }}
        </a>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTranslations } from '@/translation'

const contactRef = ref(null)

const { dictionary } = useTranslations()
const contactText = computed(
  () => dictionary.value?.info?.contact || { addressLines: [], socialLinks: {}, phoneNumber: '', email: '' }
)
const footerCopy = computed(() => dictionary.value?.global?.footer || {})

function toggleMobile() {
  if (window.matchMedia('(max-width: 767px)').matches && contactRef.value) {
    const el = contactRef.value
    el.dataset.open = el.dataset.open === 'true' ? 'false' : 'true'
  }
}
</script>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: var(--space-large);
  column-gap: var(--space-normal);
}
ul > li:nth-child(2) div {
  display: flex;
  flex-direction: column;
  gap: 0;
}
ul > li:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
}
ul > li div {
  display: flex;
  gap: var(--space-normal);
}
ul > li:has(> h2) {
  grid-column: span 6;
}
ul h2 {
  font-size: var(--font-medium);
}
ul h3 {
  text-transform: uppercase;
}

@media only screen and (max-width: 767px) {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-small);
    transition: margin-bottom 0.2s ease;
  }

  ul[data-open='true'] {
    margin-bottom: var(--space-normal);
  }

  ul > li:has(> h2) {
    grid-column: span 2;
  }

  li:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-row: span 2;
  }

  li:nth-child(2) > div {
    gap: 0;
    flex-direction: column;
  }

  ul h2 {
    font-size: var(--font-normal);
    cursor: pointer;
  }

  ul h4 {
    margin-top: var(--space-small);
  }

  ul:not([data-open='true']) li:not(:first-child) {
    display: none;
  }
}
</style>
