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
      if (to.hash === '#projects') {
        const svh = window.visualViewport?.height || window.innerHeight
        const isMobile = window.innerWidth < 768
        const scrollTo = svh * (isMobile ? 0.70 : 0.59)
        window.lenis.scrollTo(scrollTo, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
        return
      }

      if (to.hash) {
        window.lenis.scrollTo(0, { immediate: true })

        return new Promise((resolve) => {
          const scrollToElement = () => {
            const element = document.querySelector(to.hash)
            if (element) {
              window.lenis.resize()

              setTimeout(() => {
                const elementTop = element.offsetTop
                const windowHeight = window.visualViewport?.height || window.innerHeight
                const offset = windowHeight * 0.5

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
      }

      window.lenis.scrollTo(0, {
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

export default router
