<template>
  <!-- FIRST UL: title + scrolling titles -->
  <ul services :data-open="isOpen">
    <li>
      <h2 @click="toggleMobile">Services</h2>
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

  <!-- SECOND UL: description + numbered list -->
  <ul :data-open="isOpen">
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const serviceSpans = ref([])
const isOpen = ref(false)

const isMobile = () => window.matchMedia('(max-width: 767px)').matches
function toggleMobile() {
  if (!isMobile()) return
  isOpen.value = !isOpen.value
}

/* ───────────── ONE NUMBER AT A TIME ───────────── */
function setupScrollWatcher() {
  const handleScroll = () => {
    if (!serviceSpans.value.length) return
    const scrollMid = window.innerHeight * 0.5
    let closest = null
    let closestDist = Infinity

    serviceSpans.value.forEach(span => {
      if (!span) return
      const rect = span.getBoundingClientRect()
      const spanMid = rect.top + rect.height / 2
      const dist = Math.abs(scrollMid - spanMid)
      if (dist < closestDist) {
        closestDist = dist
        closest = span
      }
    })

    serviceSpans.value.forEach(span => {
      span.classList.toggle('active', span === closest)
    })
  }

  // Fire once on load
  handleScroll()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
}

/* ───────────── INIT ───────────── */
watch(
  () => store.state.infoData,
  async (data) => {
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

/* ───────────── RICH TEXT ───────────── */
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

/* ─────────── DESKTOP ─────────── */
ul[services] {
  flex-direction: column;
  gap: 0;
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
  opacity: 1; /* no transition, instant change */
}

/* ─────────── SECOND UL (layout below) ─────────── */
ul:not([services]) {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: var(--space-normal);
  gap: var(--space-normal);
}
ul:not([services]) > li:first-child {
  grid-column: span 2;
}
ul:not([services]) > li:nth-child(2) {
  grid-column: span 4;
}
ul:not([services]) > li:nth-child(2) ul {
  gap: var(--space-normal);
  flex: 1;
  display: block;
  columns: 4;
}
ul:not([services]) > li:nth-child(2) ul > li {
  display: grid;
  grid-template-columns: 0.15fr 1fr;
}

/* ─────────── MOBILE ─────────── */
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
  }

  ul[services] li:not(:first-child) {
    margin-bottom: var(--space-xlarge);
  }

  ul[services] .service-index {
    font-size: 25em;
    opacity: 0;
  }

  ul[services] .service-index.active {
    opacity: 1;
  }

  ul:not([services]) {
    display: flex;
    flex-direction: column;
  }

  ul:not([services]) h1 {
    font-size: var(--font-medium);
    grid-column: span 6;
    margin-bottom: var(--space-xsmall);
  }

  ul[services]:not([data-open='true']) > li:not(:first-child),
  ul:not([services]):not([data-open='true']) > li {
    display: none;
  }

  ul[services]:not([data-open='true']) {
    gap: 0 !important;
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
  }

  ul:not([services]):not([data-open='true']) {
    display: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  ul:not([services]) > li:nth-child(2) > ul {
    columns: 2;
  }
}
</style>
