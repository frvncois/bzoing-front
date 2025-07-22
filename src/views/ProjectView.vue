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
          <img :src="getBaseUrl() + currentProject.projectCover.url" :alt="currentProject.projectTitle">
        </li>
        <li v-for="(mediaItem, index) in galleryMedia" :key="index">
          <img
            v-if="isImage(mediaItem.mime)"
            :src="getBaseUrl() + mediaItem.url"
            :alt="mediaItem.name || `Gallery item ${index + 1}`"
          />
          <video
            v-else-if="isVideo(mediaItem.mime)"
            muted
            autoplay
            loop
            :src="getBaseUrl() + mediaItem.url"
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
import { ref, onMounted, inject, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const projects = inject('projects');
const galleryMedia = ref([]);

// Find the current project based on the route parameter
const currentProject = computed(() => {
  if (!projects.value) return null;
  
  const titleParam = route.params.title;
  return projects.value.find(project => {
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
    // Make sure we're getting the correct gallery items
    console.log('Project gallery:', currentProject.value.projectGallery);
    
    galleryMedia.value = currentProject.value.projectGallery.map(item => {
      // Handle possible different data structures
      return item.galleryItem || item;
    });

    console.log('Gallery media:', galleryMedia.value);
  }
}

function getBaseUrl() {
  return 'http://localhost:1337'; // Simplified to ensure correct URL
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
  // Find the index of the current project
  const currentIndex = projects.value.findIndex(p => p.id === currentProject.value.id);
  
  if (currentIndex !== -1 && projects.value.length > 1) {
    // Get the next project (with wrap-around)
    const nextIndex = (currentIndex + 1) % projects.value.length;
    const nextProject = projects.value[nextIndex];
    
    // Navigate to the next project
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