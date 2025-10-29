import { reactive } from 'vue'
import api from '@/api.js'

const state = reactive({
  projects: [],
  archiveData: {},
  homeData: {},
  infoData: {},
  loading: false,
  error: null,
})

const actions = {
  async fetchAllData() {
    state.loading = true
    state.error = null

    try {
      const [projects, archive, home, info] = await Promise.allSettled([
        api.getProjects(),
        api.getArchive(),
        api.getHome(),
        api.getInfo(),
      ])

      // Projects
      if (projects.status === 'fulfilled') {
        state.projects = projects.value.data || projects.value
      } else console.error('Projects failed:', projects.reason)

      // Archive
      if (archive.status === 'fulfilled') {
        state.archiveData = archive.value.data || archive.value
      } else console.warn('Archive failed:', archive.reason)

      // Home
      if (home.status === 'fulfilled') {
        state.homeData = home.value.data || home.value
      } else console.warn('Home failed:', home.reason)

      // Info
      if (info.status === 'fulfilled') {
        state.infoData = info.value.data || info.value
      } else console.warn('Info failed:', info.reason)
    } catch (error) {
      console.error('Store error:', error)
      state.error = error.message || 'Failed to load data'
    } finally {
      state.loading = false
    }
  },

  async fetchProjects() {
    try {
      const res = await api.getProjects()
      state.projects = res.data || res
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchHome() {
    try {
      const res = await api.getHome()
      state.homeData = res.data || res
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchArchive() {
    try {
      const res = await api.getArchive()
      state.archiveData = res.data || res
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchInfo() {
    try {
      const res = await api.getInfo()
      state.infoData = res.data || res
    } catch (error) {
      state.error = error.message
    }
  },
}

export const useStore = () => ({ state, ...actions })
export default useStore
