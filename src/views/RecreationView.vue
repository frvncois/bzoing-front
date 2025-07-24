<template>
  <ul recreation>
    <li>
        <div class="lottie-item" ref="lottie1"></div>
        <div class="lottie-item" ref="lottie3"></div>
    </li>
    <li>
        <video autoplay muted loop playsinline ref="videoElement" preload="auto">
        <source :src="videoUrl" type="video/webm">
        Video not supported
        </video>
    </li>
    <li>
        <div class="lottie-item" ref="lottie4"></div>
        <div class="lottie-item" ref="lottie2"></div>
    </li>
</ul>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import lottie from 'lottie-web';
import videoFile from '@/assets/lotties/5.webm';
import lottie1Data from '@/assets/lotties/1.json';
import lottie2Data from '@/assets/lotties/2.json';
import lottie3Data from '@/assets/lotties/3.json';
import lottie4Data from '@/assets/lotties/4.json';

const lottie1 = ref(null);
const lottie2 = ref(null);
const lottie3 = ref(null);
const lottie4 = ref(null);
const videoElement = ref(null);
const videoUrl = ref(videoFile);

let originalBackgroundColor;
let animations = [];

onMounted(async () => {
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = 'var(--is-grey)';

  // Load and play Lottie animations
  try {
    const animation1 = lottie.loadAnimation({
      container: lottie1.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottie1Data
    });

    const animation2 = lottie.loadAnimation({
      container: lottie2.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottie2Data
    });

    const animation3 = lottie.loadAnimation({
      container: lottie3.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottie3Data
    });

    const animation4 = lottie.loadAnimation({
      container: lottie4.value,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottie4Data
    });

    animations = [animation1, animation2, animation3, animation4];
  } catch (error) {
    console.error('Error loading Lottie animations:', error);
  }
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
  
  // Clean up animations
  animations.forEach(animation => {
    if (animation) {
      animation.destroy();
    }
  });
});
</script>

<style scoped>
.lottie-item {
  width: 100%;
  height: 300px;
}

video {
  width: 100%;
  height: 50vh;
}
</style>