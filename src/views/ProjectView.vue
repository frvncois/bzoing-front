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
        <li v-if="currentProject.projectCover">
          <img :src="currentProject.projectCover.url" :alt="currentProject.projectTitle">
        </li>
        <li v-for="(mediaItem, index) in galleryMedia" :key="index">
          <img
            v-if="isImage(mediaItem.mime)"
            :src="mediaItem.url"
            :alt="mediaItem.name || `Gallery item ${index + 1}`"
          />
          <video
            v-else-if="isVideo(mediaItem.mime)"
            muted
            autoplay
            loop
            :src="mediaItem.url"
            :alt="mediaItem.name || `Gallery item ${index + 1}`"
          ></video>
          <p v-else>Unsupported media: {{ mediaItem.name }}</p>
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
        <button @click="goToNextProject">Projet suivant</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading project...</p>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';

const route = useRoute();
const router = useRouter();
const store = useStore();
const galleryMedia = ref([]);

// Find the current project based on the route parameter
const currentProject = computed(() => {
  if (!store.state.projects || store.state.projects.length === 0) return null;
  
  const titleParam = route.params.title;
  return store.state.projects.find(project => {
    const normalizedTitle = project.projectTitle
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
    return normalizedTitle === titleParam;
  });
});

function fetchGalleryItems() {
  galleryMedia.value = [];
  
  if (currentProject.value?.projectGallery) {
    galleryMedia.value = currentProject.value.projectGallery.map(item => {
      return item.galleryItem || item;
    });
  }
}

function isImage(mime) {
  return mime?.startsWith('image/');
}

function isVideo(mime, url) {
  return mime?.startsWith('video/') || (url && /\.(mp4|mov)$/i.test(url));
}

function goHome() {
  router.push({ name: 'Projets' });
}

function goToNextProject() {
  const currentIndex = store.state.projects.findIndex(p => p.id === currentProject.value.id);
  
  if (currentIndex !== -1 && store.state.projects.length > 1) {
    const nextIndex = (currentIndex + 1) % store.state.projects.length;
    const nextProject = store.state.projects[nextIndex];
    
    const nextTitleSlug = nextProject.projectTitle
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
      
    router.push({ name: 'Project', params: { title: nextTitleSlug } });
  }
}

// Update gallery when current project changes
watch(currentProject, (newProject) => {
  if (newProject) {
    fetchGalleryItems();
  }
}, { immediate: true });

onMounted(() => {
  if (currentProject.value) {
    fetchGalleryItems();
  }
});
</script>