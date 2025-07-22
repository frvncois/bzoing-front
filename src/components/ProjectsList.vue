<template>
    <ul projects>
      <li v-for="project in projects" 
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
          v-if="activeProject && activeProject.id === project.id && project.projectCover"
          :src="getBaseUrl() + project.projectCover.url" 
          :alt="project.projectTitle" 
        />
      </li>
    </ul>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const projects = inject('projects');
const activeProject = ref(null);

function setActiveProject(project) {
  activeProject.value = project;
}

function clearActiveProject() {
  activeProject.value = null;
}

function navigateToProject(project) {
  // Convert project title to URL-friendly format
  const titleSlug = project.projectTitle
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove non-word chars
    
  router.push({ 
    name: 'Project', 
    params: { title: titleSlug }
  });
}

function getBaseUrl() {
  return 'http://localhost:1337';
}
</script>