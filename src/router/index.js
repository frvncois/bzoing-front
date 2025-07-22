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
})

export default router