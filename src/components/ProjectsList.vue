<template>
  <ul projects>
    <li v-for="project in store.state.projects"
        :key="project.id"
        @mouseenter="setActiveProject(project)"
        @mouseleave="clearActiveProject()"
        @click="navigateToProject(project)">
      <h1>{{ project.projectTitle }}</h1>
      <div>
        <span>{{ project.projectCategory }}</span>
        <span>'{{ project.projectYear }}</span>
      </div>
      <img
        v-if="activeProject && activeProject.id === project.id && project.projectThumbnail && project.projectThumbnail.url"
        :src="project.projectThumbnail.url"
        :alt="project.projectTitle"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

const router = useRouter();
const store = useStore();
const activeProject = ref(null);

function setActiveProject(project) {
  activeProject.value = project;
  console.log('Project thumbnail data:', project.projectThumbnail);
}

function clearActiveProject() {
  activeProject.value = null;
}

function navigateToProject(project) {
  const titleSlug = project.projectTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
  
  router.push({
    name: 'Project',
    params: { title: titleSlug }
  });
}
</script>