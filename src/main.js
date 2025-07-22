import './assets/main.css'
import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
});

// Better scroll reset function
const resetScroll = async () => {
  lenis.scrollTo(0, { immediate: true });
  
  // Wait for Vue to finish rendering
  await nextTick();
  
  // Multiple resize calls with different delays to handle content loading
  lenis.resize();
  setTimeout(() => lenis.resize(), 100);
  setTimeout(() => lenis.resize(), 300);
  setTimeout(() => lenis.resize(), 600); // For images
};

// Reset scroll on route change
router.afterEach(resetScroll);

// Create app
const app = createApp(App);
app.use(router);

// Make lenis available globally
window.lenis = lenis;
window.lenisResize = () => {
  lenis.resize();
  setTimeout(() => lenis.resize(), 100);
};

app.mount('#app');

// Force resize on window resize
window.addEventListener('resize', () => lenis.resize());

// Listen for image loads globally and resize Lenis
document.addEventListener('load', (e) => {
  if (e.target.tagName === 'IMG') {
    setTimeout(() => lenis.resize(), 50);
  }
}, true);