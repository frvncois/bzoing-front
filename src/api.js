import axios from 'axios';

const API_TOKEN = import.meta.env?.VITE_API_TOKEN || '844d3b56203bd40cac3fdc321979e4f170eeb099316d40904655d59096f2f3614b0dd3386c1c5e9851a08a843092c03c5538557ec34c1075cb8ff0a7702e78fff2d4eba30ff423afdf1892c5d3331ffa1464883e433b0be29bf5697eaef640fdfff862ffd20b7f770a81792234dfe57348f854823fe4291ef30b35cb0de980e3';
const API_URL = import.meta.env?.VITE_API_URL || 'https://active-horse-14e6153647.strapiapp.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url
      });
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default {
  async getProjects() {
    try {
      const response = await api.get(
        '/projects?populate[projectGallery][populate]=galleryItem&populate=projectCover'
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  async getProject(id) {
    try {
      const response = await api.get(
        `/projects/${id}?populate[projectGallery][populate]=galleryItem&populate=projectCover`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with ID ${id}:`, error);
      throw error;
    }
  },

  async getAll(endpoint) {
    try {
      const response = await api.get(`/${endpoint}?populate=*`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  async getById(endpoint, id) {
    try {
      const response = await api.get(`/${endpoint}/${id}?populate=*`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint} with ID ${id}:`, error);
      throw error;
    }
  },

  async testConnection() {
    try {
      const response = await api.get('/');
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
};