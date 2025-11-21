import { reactive } from 'vue'
import api from '@/api.js'

const state = reactive({
  projects: [],
  archiveData: {},
  homeData: {},
  infoData: {},
  loading: false,
  error: null,
  locale: 'fr',
})

let fetchVersion = 0

const normalizeLocale = (locale) =>
  typeof locale === 'string' && locale.length
    ? locale.slice(0, 2).toLowerCase()
    : null

const updateDocumentLanguage = (locale) => {
  if (typeof document !== 'undefined' && locale) {
    document.documentElement.lang = locale
  }
}

const setLocaleValue = (locale) => {
  const normalized = normalizeLocale(locale)
  if (!normalized || normalized === state.locale) return
  state.locale = normalized
  updateDocumentLanguage(normalized)
}

const extractLocale = (input) => {
  if (!input) return null
  if (Array.isArray(input)) {
    for (const entry of input) {
      const locale = extractLocale(entry)
      if (locale) return locale
    }
    return null
  }
  if (input.data) return extractLocale(input.data)
  if (input.attributes) return extractLocale(input.attributes)
  return input.locale || null
}

const applyLocaleFromPayload = (payload) => {
  const payloadLocale = extractLocale(payload)
  if (payloadLocale) setLocaleValue(payloadLocale)
}

updateDocumentLanguage(state.locale)

const actions = {
  setLocale(locale) {
    setLocaleValue(locale)
  },
  async fetchAllData(locale = state.locale) {
    state.loading = true
    state.error = null
    const requestId = ++fetchVersion

    try {
      const [projects, archive, home, info] = await Promise.allSettled([
        api.getProjects(locale),
        api.getArchive(locale),
        api.getHome(locale),
        api.getInfo(locale),
      ])

      if (requestId !== fetchVersion) return

      if (projects.status === 'fulfilled') {
        state.projects = projects.value.data || projects.value
        applyLocaleFromPayload(state.projects)
      } else console.error('Projects failed:', projects.reason)

      if (archive.status === 'fulfilled') {
        state.archiveData = archive.value.data || archive.value
        applyLocaleFromPayload(state.archiveData)
      } else console.warn('Archive failed:', archive.reason)

      if (home.status === 'fulfilled') {
        state.homeData = home.value.data || home.value
        applyLocaleFromPayload(state.homeData)
      } else console.warn('Home failed:', home.reason)

      if (info.status === 'fulfilled') {
        state.infoData = info.value.data || info.value
        applyLocaleFromPayload(state.infoData)
      } else console.warn('Info failed:', info.reason)
    } catch (error) {
      if (requestId !== fetchVersion) return
      console.error('Store error:', error)
      state.error = error.message || 'Failed to load data'
    } finally {
      if (requestId === fetchVersion) {
        state.loading = false
      }
    }
  },

  async fetchProjects(locale = state.locale) {
    try {
      const res = await api.getProjects(locale)
      state.projects = res.data || res
      applyLocaleFromPayload(state.projects)
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchHome(locale = state.locale) {
    try {
      const res = await api.getHome(locale)
      state.homeData = res.data || res
      applyLocaleFromPayload(state.homeData)
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchArchive(locale = state.locale) {
    try {
      const res = await api.getArchive(locale)
      state.archiveData = res.data || res
      applyLocaleFromPayload(state.archiveData)
    } catch (error) {
      state.error = error.message
    }
  },

  async fetchInfo(locale = state.locale) {
    try {
      const res = await api.getInfo(locale)
      state.infoData = res.data || res
      applyLocaleFromPayload(state.infoData)
    } catch (error) {
      state.error = error.message
    }
  },

  async changeLocale(locale) {
    const previous = state.locale
    setLocaleValue(locale)
    if (state.locale === previous) return
    try {
      await actions.fetchAllData(state.locale)
    } catch (error) {
      console.error('Locale switch failed:', error)
    }
  },

  async toggleLocale() {
    const nextLocale = state.locale === 'fr' ? 'en' : 'fr'
    await actions.changeLocale(nextLocale)
  },
}

export const useStore = () => ({ state, ...actions })
export default useStore
