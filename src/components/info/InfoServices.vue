<template>
  <ul services>
    <li><h2>Services</h2></li>
    <li
      v-for="service in store.state.infoData?.infoList"
      :key="service.id"
      ref="serviceItems"
    >
      <div ref="serviceDivs" :data-index="service.serviceIndex">
        <span>{{ service.serviceIndex }}</span>
      </div>
      <h1>{{ service.serviceTitle }}</h1>
    </li>
  </ul>

  <ul>
    <li>
      <p v-html="renderRichText(store.state.infoData?.infoServices)" />
    </li>

    <li>
      <ul>
        <li
          v-for="(service, index) in store.state.infoData?.infoList"
          :key="'desc-' + service.id"
        >
          <span>({{ index + 1 }})</span>
          <h3>{{ service.serviceTitle }}</h3>
        </li>
      </ul>
    </li>
  </ul>

  <ul services>
    <li>
      <h1>Ça part!</h1>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const serviceItems = ref([])
const serviceDivs = ref([])
const activeDiv = ref(null)

const setupScrollAnimation = () => {
  checkClosestDiv()
  window.addEventListener('scroll', checkClosestDiv)
}

const checkClosestDiv = () => {
  if (!serviceDivs.value.length) return

  const offset = 100
  let closest = null
  let closestDistance = Infinity

  serviceDivs.value.forEach((div) => {
    if (!div) return
    const rect = div.getBoundingClientRect()
    const distance = Math.abs(rect.top - offset)

    if (distance < closestDistance) {
      closestDistance = distance
      closest = div
    }
  })

  if (closest && activeDiv.value !== closest) {
    if (activeDiv.value) {
      activeDiv.value.style.opacity = '1'
    }

    activeDiv.value = closest
    activeDiv.value.style.opacity = '1'

    serviceDivs.value.forEach((div) => {
      if (div && div !== closest) {
        div.style.opacity = '0'
      }
    })
  }
}

watch(
  () => store.state.infoData,
  async (newData) => {
    if (newData && newData.infoList) {
      await nextTick()
      setupScrollAnimation()
    }
  },
  { immediate: true }
)

onMounted(async () => {
  if (store.state.infoData && store.state.infoData.infoList) {
    await nextTick()
    setupScrollAnimation()
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkClosestDiv)
})


function renderRichText(blocks) {
  if (!blocks) return ''

  if (typeof blocks === 'string') {
    try {
      blocks = JSON.parse(blocks)
    } catch {
      return blocks
    }
  }

  if (Array.isArray(blocks)) {
    return blocks
      .map((block) => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          const text = block.children.map((c) => c.text).join('')
          return text.replace(/\n/g, '<br>')
        }

        if (block.type === 'list' && Array.isArray(block.children)) {
          const items = block.children
            .map((item) => {
              const text = item.children.map((child) => child.text).join('')
              return `<li>${text}</li>`
            })
            .join('')
          return `<ul>${items}</ul>`
        }

        return ''
      })
      .join('')
  }

  return ''
}
</script>

<style scoped>
h1 {
  line-height: 0.9;
}

ul[services] {
  flex-direction: column;
  gap: 0;
  > li {
    display: flex;

    &:first-child {
      text-align: left;
      justify-content: flex-start;
    }

    &:not(:first-child):nth-child(odd) {
      text-align: right;
      justify-content: flex-end;
    }
  }
  & span {
    color: var(--is-yellow);
    font-size: var(--font-xlarge);
    position: absolute;
    writing-mode: vertical-lr;
  }
}

ul:not([services]) {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-bottom: var(--space-normal);
  gap: var(--space-normal);
  > li:first-child {
    grid-column: span 2;
  }
  > li:nth-child(2) {
    grid-column: span 4;
    ul {
      gap: var(--space-normal);
      flex: 1;
      display: block;
      columns: 4;
      > li {
        display: grid;
        grid-template-columns: 0.15fr 1fr;
      }
    }
  }
  > li ul {
    grid-column: span 4;
  }
}


@media only screen and (max-width: 767px) {
  [services] {
    & > li {
      & > h1 {
        font-size: var(--font-medium);
      }
      & > h2 {
        font-size: var(--font-normal);
      }
    }
  }
  ul[services] {
    flex-direction: column;
    gap: var(--space-xlarge);
  }

ul:not([services]) {
    display: flex;
    flex-direction: column;
    > li:nth-child(2) {
      grid-column: span 2;
      > ul {
        columns: 2;
      }
    }
}
}

</style>
