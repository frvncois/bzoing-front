<template>
  <ul services>
    <li :data-open="isOpen">
      <h2 @click="toggleMobile">Name drop</h2>
      <ul>
        <li>
          <p>
            Au fil des années, nous avons eu le plaisir de collaborer avec des
            marques, institutions et entreprises aux profils variés. Nous
            privilégions les projets qui partagent cette vision et voulons créer
            des liens durables avec des clients qui ont envie de se démarquer.
          </p>
        </li>
        <li>
          <p v-html="renderRichText(store.state.infoData?.infoClients)" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const isOpen = ref(false)

const isMobile = () => window.matchMedia('(max-width: 767px)').matches
function toggleMobile() {
  if (!isMobile()) return
  isOpen.value = !isOpen.value
}

onMounted(async () => {
  if (!store.state.infoData || Object.keys(store.state.infoData).length === 0) {
    await store.fetchInfo()
  }
})

function renderRichText(blocks) {
  if (!blocks) return ''
  if (blocks.__v_isReactive || blocks.__v_isReadonly) blocks = Array.from(blocks)
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks)
    } catch {
      return blocks
    }
  }
  if (!Array.isArray(blocks)) return ''

  return blocks
    .map(block => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const text = block.children.map(c => c.text).join('')
        return `<p>${text.replace(/\n/g, '<br>')}</p>`
      }
      if (block.type === 'list' && Array.isArray(block.children)) {
        const items = block.children
          .map(item => {
            const text = item.children.map(child => child.text).join('').trim()
            return `<div>${text}</div>`
          })
          .join('')
        return `<div>${items}</div>`
      }
      return ''
    })
    .join('')
}
</script>

<style scoped>
ul li {
  display: flex;
  flex-direction: column;
}
ul li ul {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-normal);
}
ul li ul li {
  grid-column: span 2;
}
li {
  display: flex;
  flex-direction: column;
  flex: 1;
}
li:nth-child(2) {
  grid-column: span 4;
  gap: var(--space-normal);
  flex: 1;
  display: block;
  columns: 4;
}

/* ─────────── MOBILE ─────────── */
@media only screen and (max-width: 767px) {
  ul {
    margin-bottom: 0;
  }
  ul li {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    transition: margin-bottom 0.2s ease;
  }

  /* margin only when open */
  ul li[data-open='true'] {
    margin-bottom: var(--space-normal);
  }

  ul li ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-normal);
  }
  ul li ul li {
    grid-column: span 2;
  }

  p {
    margin-top: var(--space-small);
    
  }
  ul h2 {
    font-size: var(--font-normal);
    cursor: pointer;
    position: relative;
  }

  /* hide content when closed */
  li:not([data-open='true']) > ul {
    display: none;
  }

  li:nth-child(2) {
    gap: var(--space-normal);
    columns: 2;
  }
}
</style>
