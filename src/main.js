import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
});

// Simple function to reset Lenis
const resetScroll = () => {
  lenis.scrollTo(0);
  // Force recalculation
  setTimeout(() => lenis.resize(), 200);
};

// Reset scroll on route change
router.afterEach(resetScroll);

// Create app
const app = createApp(App);
app.use(router);

// Make lenis available globally if needed
window.lenis = lenis;

app.mount('#app');

// Force resize on window resize
window.addEventListener('resize', () => lenis.resize());