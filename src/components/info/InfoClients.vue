<template>
  <ul services>
    <li>
      <h2>Name drop</h2>
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
import { onMounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

onMounted(async () => {
  if (!store.state.infoData || Object.keys(store.state.infoData).length === 0) {
    await store.fetchInfo()
  }
})

function renderRichText(blocks) {
  if (!blocks) return ''

  // Handle Vue proxy
  if (blocks.__v_isReactive || blocks.__v_isReadonly) {
    blocks = Array.from(blocks)
  }

  // Handle if Strapi returns JSON string
  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks)
    } catch {
      return blocks
    }
  }

  if (!Array.isArray(blocks)) return ''

  // Parse each block type
  return blocks
    .map((block) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const text = block.children.map((c) => c.text).join('')
        return `<p>${text.replace(/\n/g, '<br>')}</p>`
      }

      // 👇 Handle unordered list
      if (block.type === 'list' && Array.isArray(block.children)) {
        const items = block.children
          .map((item) => {
            const text = item.children
              .map((child) => child.text)
              .join('')
              .trim()
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
  ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: var(--space-normal);
    li {
      grid-column: span 2;
    }
  }
}
li {
  display: flex;
  flex-direction: column;
  flex: 1;
  &:nth-child(2) {
    grid-column: span 4;
    gap: var(--space-normal);
    flex: 1;
    display: block;
    columns: 4;
  }
}

@media only screen and (max-width: 767px) {
  ul
    li {
    display: flex;
    flex-direction: column;
    ul {
      display: flex;
      flex-direction: column;
      gap: var(--space-normal);
      li {
        grid-column: span 2;
      }
    }
    & h2 {
    margin-top: var(--space-small);
      font-size: var(--font-normal);
    }
  }
  
  li {
    display: flex;
    flex-direction: column;
    flex: 1;
    &:nth-child(2) {
      gap: var(--space-normal);
      columns: 2;
    }
  }
}
</style>
