<template>
  <div v-if="currentProject">
    <div single>
      <div class="is-header">
        <h1>{{ currentProject.projectTitle }}</h1>
        <span>
          <h1>{{ currentProject.projectCategory }}</h1>
          <h1>{{ currentProject.projectYear }}</h1>
        </span>
      </div>

      <ul :class="currentProject.projectLayout">
        <li v-if="coverUrl">
          <img :src="coverUrl" :alt="currentProject.projectTitle" />
        </li>

        <li v-for="(mediaItem, index) in galleryMedia" :key="index">
          <img
            v-if="isImage(mediaItem.mime)"
            :src="fullUrl(mediaItem.url)"
            :alt="mediaItem.name || `Gallery item ${index + 1}`"
          />
          <video
            v-else-if="isVideo(mediaItem.mime)"
            muted
            autoplay
            loop
            playsinline
            :src="fullUrl(mediaItem.url)"
          ></video>
        </li>
      </ul>

      <div class="is-details">
        <span>
          <h2>{{ currentProject.projectTitle }}</h2>
          <span>
            <h2>{{ currentProject.projectCategory }}</h2>
            <h2>{{ currentProject.projectYear }}</h2>
          </span>
        </span>
        <p>{{ currentProject.projectDetails }}</p>
      </div>

      <div class="is-nav">
        <button @click="goHome">Accueil</button>
        <button @click="goToNextProject">Suivant</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading project...</p>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import api from '@/api'

const route = useRoute()
const router = useRouter()
const store = useStore()

const STRAPI_URL = 'https://active-horse-14e6153647.strapiapp.com'
const galleryMedia = ref([])

const fullUrl = (path) =>
  !path ? '' : path.startsWith('http') ? path : `${STRAPI_URL}${path}`
const isImage = (mime) => mime?.startsWith('image/')
const isVideo = (mime) => mime?.startsWith('video/')
const resolveGalleryMedia = (entry, fallbackId) => {
  if (!entry) return null

  const candidate =
    entry.url || entry.mime
      ? entry
      : entry.galleryItem ||
        entry.gallery_item ||
        entry.media ||
        entry.image ||
        entry.file ||
        entry.asset ||
        null

  const dataNode = candidate?.data?.attributes || candidate?.attributes || candidate
  const url = dataNode?.url || ''
  if (!url) return null

  const mime =
    entry.mime ||
    candidate?.mime ||
    dataNode?.mime ||
    entry.mimeType ||
    candidate?.mimeType ||
    dataNode?.mimeType ||
    ''

  const name =
    entry.name ||
    candidate?.name ||
    dataNode?.alternativeText ||
    dataNode?.name ||
    ''

  return {
    id: entry.id ?? candidate?.id ?? dataNode?.id ?? fallbackId ?? null,
    url,
    mime,
    name,
  }
}

const currentProject = computed(() => {
  if (!store.state.projects?.length) return null
  const slug = route.params.title
  return store.state.projects.find((p) =>
    p.projectTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  )
})

const coverUrl = computed(() => {
  const cover = currentProject.value?.projectCover
  if (!cover) return ''
  return fullUrl(cover.url || cover.data?.attributes?.url)
})

async function fetchGalleryItems() {
  try {
    const cachedGallery = currentProject.value?.projectGallery || []
    const hasUrls = cachedGallery.some((item) => item?.url)

    let project = currentProject.value

    if (!hasUrls) {
      project = await api.getProject(
        currentProject.value.documentId || currentProject.value.id
      )
    }

    if (!project) return

    const gallerySource = hasUrls ? cachedGallery : project.projectGallery

    galleryMedia.value = Array.isArray(gallerySource)
      ? gallerySource
          .map((media, index) => resolveGalleryMedia(media, index))
          .filter((media) => media?.url)
      : []
  } catch (err) {
    console.error('Gallery fetch failed:', err)
  }
}

function goHome() {
  router.push({ name: 'Projets' })
}
function goToNextProject() {
  const idx = store.state.projects.findIndex((p) => p.id === currentProject.value.id)
  if (idx !== -1 && store.state.projects.length > 1) {
    const next = store.state.projects[(idx + 1) % store.state.projects.length]
    const slug = next.projectTitle
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
    router.push({ name: 'Project', params: { title: slug } })
  }
}

watch(
  currentProject,
  async (p) => {
    if (p) await fetchGalleryItems()
  },
  { immediate: true }
)

onMounted(() => {
  if (currentProject.value) fetchGalleryItems()
})
</script>
