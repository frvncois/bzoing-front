import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArchiveView from '../views/ArchiveView.vue'
import RecreationView from '../views/RecreationView.vue'
import InfoView from '../views/InfoView.vue'
import ProjectView from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Projets',
      component: HomeView,
    },
    {
      path: '/archive',
      name: 'Archive',
      component: ArchiveView,
    },
    {
      path: '/recreation',
      name: 'Recreation',
      component: RecreationView,
    },
    {
      path: '/info',
      name: 'Info',
      component: InfoView,
    },
    {
      path: '/project/:title',
      name: 'Project',
      component: ProjectView,
      props: true
    }
  ],
  scrollBehavior(to, from) {
    if (window.lenis) {
      if (to.hash) {
        // First scroll to top immediately to reset position
        window.lenis.scrollTo(0, { immediate: true })

        // Wait for DOM to be ready, then scroll to hash element
        return new Promise((resolve) => {
          const scrollToElement = () => {
            const element = document.querySelector(to.hash)
            if (element) {
              // Force Lenis to update
              window.lenis.resize()

              setTimeout(() => {
                const elementTop = element.offsetTop
                const windowHeight = window.innerHeight
                const offset = windowHeight * 0.60
                const scrollTo = elementTop - offset
                window.lenis.scrollTo(scrollTo, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
                resolve()
              }, 50)
            } else {
              setTimeout(scrollToElement, 50)
            }
          }
          setTimeout(scrollToElement, 200)
        })
      } else {
        // No hash, instantly jump to top
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }
})

export default router
