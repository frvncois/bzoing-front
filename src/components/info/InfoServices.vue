<template>
  <ul services :data-open="isOpen">
    <li>
      <h2 @click="toggleMobile">{{ t('info.services.title') }}</h2>
    </li>

    <li
      v-for="(service, i) in store.state.infoData?.infoList"
      :key="service.id"
      ref="serviceItems"
    >
      <span
        :ref="el => (serviceSpans[i] = el)"
        :data-index="service.serviceIndex"
        class="service-index"
      >
        {{ service.serviceIndex }}
      </span>
      <h1>{{ service.serviceTitle }}</h1>
    </li>
  </ul>

  <ul services :data-open="isOpen" class="services-details">
    <li>
      <p v-html="renderRichText(store.state.infoData?.infoServices)" />
    </li>
    <li>
      <ul details>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useStore } from '@/store'
import { useTranslations } from '@/translation'

const store = useStore()
const serviceSpans = ref([])
const isOpen = ref(false)
const { t } = useTranslations()

const isMobile = () => window.matchMedia('(max-width: 767px)').matches
function toggleMobile() {
  if (!isMobile()) return
  isOpen.value = !isOpen.value
}

function setupScrollWatcher() {
  const handleScroll = () => {
    if (!serviceSpans.value.length) return
    const triggerLine = window.innerHeight * 0.8

    let active = null
    serviceSpans.value.forEach(span => {
      if (!span) return
      const rect = span.getBoundingClientRect()
      const inView = rect.top < triggerLine && rect.bottom > triggerLine
      if (inView && !active) active = span
    })

    serviceSpans.value.forEach(span => {
      span.classList.toggle('active', span === active)
    })
  }

  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
}

watch(
  () => store.state.infoData,
  async data => {
    if (data?.infoList) {
      await nextTick()
      setupScrollWatcher()
    }
  },
  { immediate: true }
)

onMounted(async () => {
  if (store.state.infoData?.infoList) {
    await nextTick()
    setupScrollWatcher()
  }
})

function renderRichText(blocks) {
  if (!blocks) return ''
  if (typeof blocks === 'string') {
    try { blocks = JSON.parse(blocks) } catch { return blocks }
  }
  if (Array.isArray(blocks)) {
    return blocks.map(block => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        return block.children.map(c => c.text).join('').replace(/\n/g, '<br>')
      }
      return ''
    }).join('')
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
}

ul[services] > li {
  display: flex;
  position: relative;
}

ul[services] > li:first-child {
  text-align: left;
  justify-content: flex-start;
}

ul[services] > li:not(:first-child):nth-child(odd) {
  text-align: right;
  justify-content: flex-end;
}
ul[services] > li:nth-child(n+3) span {
  margin-top: -0.33em;
}


.service-index {
  color: var(--is-yellow);
  font-size: var(--font-xlarge);
  margin-top: -0.15em;
  position: absolute;
  pointer-events: none;
  writing-mode: vertical-lr;
  opacity: 0;
}

.service-index.active {
  opacity: 1;
}

ul[services].services-details {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-normal);
  margin-top: 2em;
  margin-bottom: var(--space-normal);
}
ul[services].services-details > li:first-child {
  grid-column: span 2;
}
ul[services].services-details > li:nth-child(2) {
  grid-column: span 4;
}
ul[services].services-details > li:nth-child(2) ul {
  gap: var(--space-normal);
  flex: 1;
  display: block;
  columns: 4;
}
ul[services].services-details > li:nth-child(2) ul > li {
  display: grid;
  grid-template-columns: 0.15fr 1fr;
}

@media only screen and (max-width: 767px) {
  [services] > li > h1 {
    font-size: var(--font-medium);
  }

  [services] > li > h2 {
    font-size: var(--font-normal);
    cursor: pointer;
    position: relative;
  }

  ul[services] {
    flex-direction: column;
    gap: var(--space-small);
    > li:not(:first-child) {
      margin-bottom: var(--space-normal);
    }
  }



  ul[services] .service-index {
    font-size: 18em;
  }

  ul[services]:not([data-open='true']) > li:not(:first-child) {
    display: none;
  }

  ul[services].services-details:not([data-open='true']) {
    display: none;
  }

  ul[services].services-details {
    display: flex;
    flex-direction: column;
  }

ul[details] li:last-child {
  margin-bottom: 0;
}

  ul[services].services-details h1 {
    font-size: var(--font-medium);
    grid-column: span 6;
    margin-bottom: var(--space-xsmall);
  }

  ul[services].services-details > li:nth-child(2) > ul {
    display: flex;
    flex-direction: column;
    gap:0;
    li {
      margin-bottom: 0;
    }
  }
}
</style>
