<template>
  <ul ref="contactRef">
    <li>
      <h2 @click="toggleMobile">Contact</h2>
    </li>
    <li>
      <div>
        <h3>Adresse</h3>
        <p>4641 Av.Papineau<br />Montréal, QC H2H 1V4</p>
      </div>
      <div>
        <h4>Téléphone</h4>
        <a href="tel:5148307833">514 830-7833</a>
      </div>
    </li>
    <li>
      <h3>Demande d'information<br />& emploi</h3>
      <a href="mailto:info@bzoing.ca">info@bzoing.ca</a>
    </li>
    <li class="desktop">
      <h3>Social</h3>
      <div>
        <a href="https://instagram.com/bzoingmtl" target="_blank">Instagram</a>
        <a href="https://www.behance.net/bzoing" target="_blank">Behance</a>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const contactRef = ref(null)

/* only toggles visibility on mobile — never affects desktop grid */
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

/* ─────────────── MOBILE ─────────────── */
@media only screen and (max-width: 767px) {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-small);
    transition: margin-bottom 0.2s ease;
  }

  /* add margin only when open */
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

  /* collapsible: hide everything except first li when closed */
  ul:not([data-open='true']) li:not(:first-child) {
    display: none;
  }
}
</style>
