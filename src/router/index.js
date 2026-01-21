import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArchiveView from '../views/ArchiveView.vue'
import RecreationView from '../views/RecreationView.vue'
import InfoView from '../views/InfoView.vue'
import ProjectView from '../views/ProjectView.vue'
import ReelView from '../views/ReelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Projets',
      component: HomeView,
      meta: {
        title: 'Bzoing - Projets',
        description: 'Studio de création graphique montréalais.'
      }
    },
    {
      path: '/archive',
      name: 'Archive',
      component: ArchiveView,
      meta: {
        title: 'Bzoing - Archive',
        description: 'Une sélection de beaux moments et de projets à travers les années.'
      }
    },
    {
      path: '/recreation',
      name: 'Recreation',
      component: RecreationView,
      meta: {
        title: 'Bzoing - Récréation',
        description: 'Expérimentations graphiques en roue libre. :)'
      }
    },
    {
      path: '/info',
      name: 'Info',
      component: InfoView,
      meta: {
        title: 'Bzoing - Info & Contact',
        description: 'Découvrez notre équipe et notre approche.'
      }
    },
    {
      path: '/project/:title',
      name: 'Project',
      component: ProjectView,
      props: true,
      meta: {
        title: 'Projet',
      }
    },
    {
      path: '/reel',
      name: 'Bzoing - Reel',
      component: ReelView,
      meta: {
        title: 'Reel',
      }
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

// Update document title and meta tags on route change
router.afterEach((to) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // Update meta description
  if (to.meta.description) {
    let metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }

    // Update OG description
    let ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', to.meta.description)
    }

    // Update Twitter description
    let twitterDescription = document.querySelector('meta[property="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', to.meta.description)
    }
  }

  // Update OG title
  if (to.meta.title) {
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', to.meta.title)
    }

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', to.meta.title)
    }
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    canonical.setAttribute('href', `https://bzoing.ca${to.path}`)
  }

  // Update OG URL
  let ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) {
    ogUrl.setAttribute('href', `https://bzoing.ca${to.path}`)
  }

  // Update Twitter URL
  let twitterUrl = document.querySelector('meta[property="twitter:url"]')
  if (twitterUrl) {
    twitterUrl.setAttribute('href', `https://bzoing.ca${to.path}`)
  }
})

export default router
