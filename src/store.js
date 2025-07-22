import { reactive } from 'vue';
import api from './api.js';

// Reactive state
const state = reactive({
  projects: [],
  archiveData: {},
  homeData: {},
  infoData: {},
  loading: false,
  error: null
});

// Actions
const actions = {
  async fetchAllData() {
    state.loading = true;
    state.error = null;
    
    try {
      const [projectsResult, archiveResult, homeResult, infoResult] = await Promise.allSettled([
        api.getProjects(),
        api.getAll('archive'),
        api.getAll('home'),
        api.getAll('info')
      ]);
      
      // Handle projects
      if (projectsResult.status === 'fulfilled') {
        state.projects = projectsResult.value.data || projectsResult.value;
      } else {
        console.error('Projects failed:', projectsResult.reason);
      }
      
      // Handle archive
      if (archiveResult.status === 'fulfilled') {
        state.archiveData = archiveResult.value.data || archiveResult.value;
      } else {
        console.warn('Archive failed:', archiveResult.reason);
        state.archiveData = {};
      }
      
      // Handle home
      if (homeResult.status === 'fulfilled') {
        state.homeData = homeResult.value.data || homeResult.value;
      } else {
        console.error('Home failed:', homeResult.reason);
      }
      
      // Handle info
      if (infoResult.status === 'fulfilled') {
        state.infoData = infoResult.value.data || infoResult.value;
      } else {
        console.warn('Info failed:', infoResult.reason);
        state.infoData = {};
      }
      
    } catch (error) {
      console.error('Store error:', error);
      state.error = error.message || 'Failed to load data';
    } finally {
      state.loading = false;
    }
  },

  async fetchProjects() {
    try {
      const response = await api.getProjects();
      state.projects = response.data;
    } catch (error) {
      state.error = error.message;
    }
  },

  async fetchHome() {
    try {
      const response = await api.getAll('home');
      state.homeData = response.data;
    } catch (error) {
      state.error = error.message;
    }
  }
};

// Export store
export const useStore = () => {
  return {
    state,
    ...actions
  };
};

export default useStore;