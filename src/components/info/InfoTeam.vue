<template>
  <ul>
    <!-- ÉQUIPE -->
    <li :data-open="isEquipeOpen">
      <h2 @click="toggleEquipe">Équipe</h2>
      <ul>
        <li>
          <h3>(A) Stratégie</h3>
          <p v-html="renderRichText(store.state.infoData?.infoStrategie)" />
        </li>
        <li>
          <h3>(B) Création</h3>
          <p v-html="renderRichText(store.state.infoData?.infoCreation)" />
        </li>
      </ul>
    </li>

    <!-- APPROCHE -->
    <li :data-open="isApprocheOpen">
      <h2 @click="toggleApproche">Approche</h2>
      <div class="spacer"></div>
      <div><span>(1)</span><h3>S'amuser</h3></div>
      <div><span>(2)</span><h3>Analyse de la réalité de la marque</h3></div>
      <div><span>(3)</span><h3>Réflexion stratégique</h3></div>
      <div><span>(4)</span><h3>Intention de création</h3></div>
      <div><span>(5)</span><h3>Création des idées</h3></div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const isEquipeOpen = ref(false)
const isApprocheOpen = ref(false)

const isMobile = () => window.matchMedia('(max-width: 767px)').matches

function toggleEquipe() {
  if (!isMobile()) return
  isEquipeOpen.value = !isEquipeOpen.value
}
function toggleApproche() {
  if (!isMobile()) return
  isApprocheOpen.value = !isApprocheOpen.value
}

onMounted(async () => {
  if (!store.state.infoData || Object.keys(store.state.infoData).length === 0) {
    await store.fetchInfo()
  }
})

function renderRichText(blocks) {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map(block => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const text = block.children.map(c => c.text).join('')
        return `<p>${text.replace(/\n/g, '<br>')}</p>`
      }
      return ''
    })
    .join('')
}
</script>

<style scoped>
/* ─────────── DESKTOP (unchanged) ─────────── */
ul {
  display: flex;
  gap: var(--space-normal);
  margin-top: var(--space-large);
}
ul > li {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex: 1;
  align-content: flex-start;
}
ul > li:first-child li:first-child {
  grid-column: span 2;
}
ul > li > div {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  grid-column: span 3;
}
ul > li > ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* desktop: 3 cols */
  grid-column: span 3;
  margin-top: unset;
  gap: var(--space-normal);
}
ul > li > ul > li {
  display: flex;
  flex-direction: column;
}
ul h2 {
  font-size: var(--font-medium);
  grid-column: span 3;
  margin-bottom: var(--space-xxsmall);
}
ul h3 {
  text-transform: uppercase;
}

/* ─────────── MOBILE (toggle only; keep 2 columns for ÉQUIPE inner UL) ─────────── */
@media only screen and (max-width: 767px) {
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    gap: 0;
  }

  /* each section wrapper; add margin only when open */
  ul > li {
    display: block;
    transition: margin-bottom 0.2s ease;
  }
  ul > li[data-open='true'] {
    margin-bottom: var(--space-normal);
    gap: var(--space-small);
  }

  /* title/toggle */
  ul h2 {
    font-size: var(--font-normal);
    cursor: pointer;
    position: relative;
    margin-bottom: 0;
  }
  /* keep APPROCHE rows grid as-is */
  ul > li > div {
    display: grid;
    grid-template-columns: 0.1fr 1fr;
    gap: var(--space-xsmall);
  }

  /* 🔥 ÉQUIPE inner UL MUST be TWO columns on mobile when visible */
  ul > li > ul {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important; /* force 2 columns */
    gap: var(--space-normal);
    margin-top: var(--space-small);
  }

  /* 🚫 Reset the desktop-span rule that was breaking the 2-col layout */
  /* (desktop had: ul > li:first-child li:first-child { grid-column: span 2; }) */
  ul > li:first-child > ul > li:first-child {
    grid-column: auto !important;
  }
  .spacer {
    height: var(--space-small);
  }

  /* hide content until section is opened (does not alter its grid when open) */
  li:not([data-open='true']) > ul,
  li:not([data-open='true']) > div {
    display: none !important;
  }
}
</style>
