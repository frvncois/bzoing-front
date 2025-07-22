<template>
  <ul services>
    <li v-for="service in store.state.infoData?.infoList" :key="service.id" ref="serviceItems">
      <div ref="serviceDivs" :data-index="service.serviceIndex">
        <span>{{ service.serviceIndex }}</span>
      </div>
      <h2>{{ service.serviceTitle }}</h2>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const serviceItems = ref([]);
const serviceDivs = ref([]);
const activeDiv = ref(null);

const setupScrollAnimation = () => {
  checkClosestDiv();
  window.addEventListener('scroll', checkClosestDiv);
};

const checkClosestDiv = () => {
  if (!serviceDivs.value.length) return;
  
  const offset = 100;
  let closest = null;
  let closestDistance = Infinity;
  
  serviceDivs.value.forEach(div => {
    if (!div) return;
    const rect = div.getBoundingClientRect();
    const distance = Math.abs(rect.top - offset);
    
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = div;
    }
  });
  
  if (closest && activeDiv.value !== closest) {
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

// Watch for infoData changes and setup animation
watch(() => store.state.infoData, async (newData) => {
  if (newData && newData.infoList) {
    await nextTick();
    setupScrollAnimation();
  }
}, { immediate: true });

onMounted(async () => {
  if (store.state.infoData && store.state.infoData.infoList) {
    await nextTick();
    setupScrollAnimation();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkClosestDiv);
});
</script>