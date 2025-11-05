<template>
    <ul pause>
        <li>
            <img src="@/assets/1-a.svg" :style="{ opacity: opacities['1-a'] }"/>
            <img src="@/assets/1-b.svg" :style="{ opacity: opacities['1-b'] }"/>
            <img src="@/assets/1-c.svg" :style="{ opacity: opacities['1-c'] }"/>
        </li>
        <li>
            <img src="@/assets/2-a.svg" :style="{ opacity: opacities['2-a'] }"/>
            <img src="@/assets/2-b.svg" :style="{ opacity: opacities['2-b'] }"/>
            <img src="@/assets/2-c.svg" :style="{ opacity: opacities['2-c'] }"/>
            <img src="@/assets/2-d.svg" :style="{ opacity: opacities['2-d'] }"/>
        </li>
        <li>
            <img src="@/assets/3-a.svg" :style="{ opacity: opacities['3-a'] }"/>
            <img src="@/assets/3-b.svg" :style="{ opacity: opacities['3-b'] }"/>
            <img src="@/assets/3-c.svg" :style="{ opacity: opacities['3-c'] }"/>
        </li>
        <li>
            <img src="@/assets/4-a.svg" :style="{ opacity: opacities['4-a'] }"/>
            <img src="@/assets/4-b.svg" :style="{ opacity: opacities['4-b'] }"/>
            <img src="@/assets/4-c.svg" :style="{ opacity: opacities['4-c'] }"/>
        </li>
        <li>
            <img src="@/assets/5-a.svg" :style="{ opacity: opacities['5-a'] }"/>
            <img src="@/assets/5-b.svg" :style="{ opacity: opacities['5-b'] }"/>
            <img src="@/assets/5-c.svg" :style="{ opacity: opacities['5-c'] }"/>
            <img src="@/assets/5-d.svg" :style="{ opacity: opacities['5-d'] }"/>
        </li>
        <li>
            <img src="@/assets/6-a.svg" :style="{ opacity: opacities['6-a'] }"/>
            <img src="@/assets/6-b.svg" :style="{ opacity: opacities['6-b'] }"/>
            <img src="@/assets/6-c.svg" :style="{ opacity: opacities['6-c'] }"/>
        </li>
    </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const opacities = ref({
    '1-a': 0, '1-b': 0, '1-c': 0,
    '2-a': 0, '2-b': 0, '2-c': 0, '2-d': 0,
    '3-a': 0, '3-b': 0, '3-c': 0,
    '4-a': 0, '4-b': 0, '4-c': 0,
    '5-a': 0, '5-b': 0, '5-c': 0, '5-d': 0,
    '6-a': 0, '6-b': 0, '6-c': 0
});

const allImageKeys = Object.keys(opacities.value);

let inactivityTimer = null;
let revealInterval = null;

const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    clearInterval(revealInterval);
    
    // Reset all opacities to 0
    allImageKeys.forEach(key => {
        opacities.value[key] = 0;
    });
    
    // Start new inactivity timer
    inactivityTimer = setTimeout(() => {
        startRevealingImages();
    }, 5000); // 5 seconds of inactivity
};

// Function to show images randomly
const startRevealingImages = () => {
    // Create a copy of allImageKeys that we can modify
    const remainingKeys = [...allImageKeys];
    
    // Calculate interval time to distribute all reveals within 10 seconds
    const intervalTime = 10000 / remainingKeys.length;
    
    // Show an image randomly at calculated intervals
    revealInterval = setInterval(() => {
        if (remainingKeys.length === 0) {
            clearInterval(revealInterval);
            return;
        }
        
        // Select random image from remaining images
        const randomIndex = Math.floor(Math.random() * remainingKeys.length);
        const selectedKey = remainingKeys.splice(randomIndex, 1)[0];
        
        // Set opacity to 1
        opacities.value[selectedKey] = 1;
        
        // If all images shown, clear interval
        if (remainingKeys.length === 0) {
            clearInterval(revealInterval);
        }
    }, intervalTime);
};

// Set up mouse movement and scroll listeners
onMounted(() => {
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
    resetInactivityTimer(); // Start the initial timer
});

// Clean up listeners when component unmounts
onUnmounted(() => {
    window.removeEventListener('mousemove', resetInactivityTimer);
    window.removeEventListener('scroll', resetInactivityTimer);
    clearTimeout(inactivityTimer);
    clearInterval(revealInterval);
});
</script>