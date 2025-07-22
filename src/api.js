import axios from 'axios';

const API_TOKEN = import.meta.env?.VITE_API_TOKEN || '';
const API_URL = import.meta.env?.VITE_API_URL || 'https://active-horse-14e6153647.strapiapp.com/api';

// Debug logging (remove in production)
console.log('VITE_API_URL:', import.meta.env?.VITE_API_URL);
console.log('API_URL used by Axios:', API_URL);
console.log('API_TOKEN present:', !!API_TOKEN);

// Validate required environment variables
if (!API_TOKEN) {
  console.error('Missing VITE_API_TOKEN in environment variables');
}

if (!import.meta.env?.VITE_API_URL) {
  console.warn('Using default Strapi Cloud API URL - make sure VITE_API_URL is set in your .env file');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config.url
      });
      
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          console.error('Authentication failed - check your API token');
          break;
        case 403:
          console.error('Access forbidden - check your API permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error - check Strapi backend');
          break;
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.message);
      console.error('Check if Strapi server is running and URL is correct');
    } else {
      console.error('Request setup error:', error.message);
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

  // Test connection method
  async testConnection() {
    try {
      const response = await api.get('/');
      console.log('✅ Successfully connected to Strapi:', response.data);
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Strapi:', error);
      return false;
    }
  }
};