<template>
<ul home>
    <li></li>
    <li><p>{{ homeData.homeIntro }}</p></li>
    <li><p>{{ homeData.homeAbout }}</p></li>
</ul>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue';
    import api from '@/api';

    const homeData = ref({});
    const loading = ref(true);
    const error = ref(null);
    
    const fetchHomeData = async () => {
        loading.value = true;
        try {
            const response = await api.getAll('home');
            homeData.value = response.data;
            loading.value = false;
        } catch (err) {
            error.value = err.message || 'Failed to load home content';
            loading.value = false;
            console.error('Error details:', err);
        }
    };
    
    onMounted(() => {
        fetchHomeData();
    });
</script>