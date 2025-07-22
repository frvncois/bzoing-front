<template>
    <div single>
      <div class="is-header">
        <h1>{{ project.projectTitle }}</h1>
        <span>
            <h1>{{ project.projectCategory }}</h1>
            <h1>{{ project.projectYear }}</h1>
        </span>
      </div>
      
      <ul :class="project.projectLayout">
        <li v-if="project.projectCover">
          <img :src="getBaseUrl() + project.projectCover.url" :alt="project.projectTitle">
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
            <h2>{{ project.projectTitle }}</h2>
            <span>
                <h2>{{ project.projectCategory }}</h2>
                <h2>{{ project.projectYear }}</h2>
            </span>
        </span>
        <p>{{ project.projectDetails }}</p>
      </div>

      <div class="is-nav">
        <button @click="$emit('back')">Accueil</button>
        <button @click="$emit('back')">Projet suivant</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const props = defineProps({
    project: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['back']);
  
  const galleryMedia = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  async function fetchGalleryItems() {
  galleryMedia.value = props.project.projectGallery.map(item => item.galleryItem);
  }
 
  function getBaseUrl() {
    const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:1337/api';
    return apiUrl.replace(/\/api\/?$/, '');
  }

  function isImage(mime) {
  return mime?.startsWith('image/');
  }

  function isVideo(mime, url) {
  return mime?.startsWith('video/') || /\.(mp4|mov)$/i.test(url);
  }


  
  onMounted(() => {
    fetchGalleryItems();
  });
  </script>