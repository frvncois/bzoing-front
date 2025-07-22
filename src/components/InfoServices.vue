<template>
    <ul services>
      <li v-for="service in infoData?.infoList" :key="service.id" ref="serviceItems">
        <div ref="serviceDivs" :data-index="service.serviceIndex"><span>{{ service.serviceIndex }}</span></div>
        <h2>{{ service.serviceTitle }}</h2>
      </li>
    </ul>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import api from '@/api';
  
const infoData = ref({});
const loading = ref(true);
const error = ref(null);
  const serviceItems = ref([]);
  const serviceDivs = ref([]);
  const activeDiv = ref(null);
  
  const fetchInfoData = async () => {
    loading.value = true;
    try {
      const response = await api.getAll('info');
      infoData.value = response.data;
      loading.value = false;
      
      // Wait for DOM to update after data is loaded
    await nextTick();
      setupScrollAnimation();
} catch (err) {
      error.value = err.message || 'Failed to load info content';
      loading.value = false;
      console.error('Error details:', err);
}
};
  
const setupScrollAnimation = () => {
    checkClosestDiv();
    window.addEventListener('scroll', checkClosestDiv);
};
  
const checkClosestDiv = () => {
  if (!serviceDivs.value.length) return;

  const offset = 100; // Adjust this value as needed for earlier trigger
  let closest = null;
  let closestDistance = Infinity;

  serviceDivs.value.forEach(div => {
    if (!div) return;

    const rect = div.getBoundingClientRect();
    const distance = Math.abs(rect.top - offset); // Subtract offset

    if (distance < closestDistance) {
      closestDistance = distance;
      closest = div;
    }
  });

  if (closest && activeDiv.value !== closest) {
    // Fade in the active one
    if (activeDiv.value) {
      activeDiv.value.style.opacity = '1';
    }

    activeDiv.value = closest;
    activeDiv.value.style.opacity = '1';

    serviceDivs.value.forEach(div => {
      if (div && div !== closest) {
        div.style.opacity = '0';
      }
    });
  }
};

  
onMounted(() => {
fetchInfoData();
});

onUnmounted(() => {
window.removeEventListener('scroll', checkClosestDiv);
});
</script>