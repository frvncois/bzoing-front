import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Lenis from 'lenis';

const lenis = new Lenis({
  autoRaf: true,
  syncTouch: true,
  touchMultiplier: 1.2,
});

const resizeLenis = () => {
  lenis.resize();
  [100, 300, 600].forEach((delay) => setTimeout(() => lenis.resize(), delay));
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const htmlElement = document.documentElement;

const applyMotionPreference = () => {
  if (prefersReducedMotion.matches) {
    lenis.stop();
    htmlElement.classList.add('lenis-disabled');
  } else {
    lenis.start();
    htmlElement.classList.remove('lenis-disabled');
    resizeLenis();
  }
};

prefersReducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();

const app = createApp(App);
app.use(router);

window.lenis = lenis;
window.lenisResize = resizeLenis;

app.mount('#app');

window.addEventListener('resize', resizeLenis);

document.addEventListener(
  'load',
  (event) => {
    if (event.target.tagName === 'IMG') {
      setTimeout(() => lenis.resize(), 50);
    }
  },
  true,
);
