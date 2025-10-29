<template>
  <ul>
    <li>
      <h2>Équipe</h2>
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
    <li>
      <h2>Approche</h2>
      <div><span>(1)</span><h3>S'amuser</h3></div>
      <div><span>(2)</span><h3>Analyse de la réalité de la marque</h3></div>
      <div><span>(3)</span><h3>Réflexion stratégique</h3></div>
      <div><span>(4)</span><h3>Intention de création</h3></div>
      <div><span>(5)</span><h3>Création des idées</h3></div>
    </li>
  </ul>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

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
ul {
  display: flex;
  gap: var(--space-normal);
  margin-top: var(--space-large);
  > li {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      flex: 1;
      align-content: flex-start;
      &:first-child {
        & li:first-child {
          grid-column: span 2;
        }
      }
      > div {
        display: grid;
        grid-template-columns: 0.1fr 1fr;
        grid-column: span 3;
      }
      > ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column: span 3;
        margin-top: unset;
        > li {
          display: flex;
          flex-direction: column;
        }
      }
  }
  & h2 {
    font-size: var(--font-medium);
    grid-column: span 3;
    margin-bottom: var(--space-xxsmall);
  }

  & h3 {
    text-transform: uppercase;
  }
}

@media only screen and (max-width: 767px) {
  ul {
    display: flex;
    flex-direction: column;
    margin-top: var(--space-large);
    > li {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-content: flex-start;
        &:first-child {
          & li:first-child {
            grid-column: span 1;
          }
        }
        > div {
          display: grid;
          grid-template-columns: 0.1fr 1fr;
          grid-column: span 1;
        }
        > ul {
          grid-template-columns: 1fr 1fr;
          grid-column: span 2;
          > li {
            display: flex;
            flex-direction: column;
          }
        }
    }
    & h2 {
      font-size: var(--font-normal);
      grid-column: span 3;
    }

    & h3 {
      text-transform: uppercase;
    }
  }
}
</style>