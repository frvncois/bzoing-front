<script setup>
import { RouterLink, RouterView } from 'vue-router'
import GlobalHeader from './components/GlobalHeader.vue';
import GlobalPause from './components/GlobalPause.vue';
import { ref, provide, onMounted } from 'vue';
import api from '@/api';

// Projects data
const projects = ref([]);
const projectsLoading = ref(true);
const projectsError = ref(null);

// Archive data
const archiveData = ref({});
const archiveLoading = ref(true);
const archiveError = ref(null);

// Fetch projects
const fetchProjects = async () => {
  projectsLoading.value = true;
  try {
    const response = await api.getProjects();
    projects.value = response.data;
    projectsLoading.value = false;
  } catch (err) {
    projectsError.value = err.message || 'Failed to load projects';
    projectsLoading.value = false;
  }
};

// Fetch archive data
const fetchArchiveData = async () => {
  archiveLoading.value = true;
  try {
    const response = await api.getAll('archive');
    archiveData.value = response.data;
    archiveLoading.value = false;
  } catch (err) {
    archiveError.value = err.message || 'Failed to load archive content';
    archiveLoading.value = false;
  }
};

// Provide data to components
provide('projects', projects);
provide('projectsLoading', projectsLoading);
provide('projectsError', projectsError);

provide('archiveData', archiveData);
provide('archiveLoading', archiveLoading);
provide('archiveError', archiveError);

// Fetch all data on mount
onMounted(() => {
  fetchProjects();
  fetchArchiveData();
});
</script>

<template>
  <GlobalHeader />
  <RouterView />
  <GlobalPause />
</template>