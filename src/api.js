import axios from 'axios'

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://active-horse-14e6153647.strapiapp.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const PROJECT_POPULATE_QUERY = [
  'populate[projectCover]=true',
  'populate[projectThumbnail]=true',
  'populate[projectGallery][populate][galleryItem]=true',
].join('&')

const documentFilter = (documentId) =>
  `filters[documentId][$eq]=${encodeURIComponent(documentId)}`

const doRequest = async (url) => {
  const { data } = await api.get(url)
  return data
}

const normalizeMedia = (input) => {
  if (!input) return null

  if (Array.isArray(input)) {
    return input.map((item) => normalizeMedia(item)).filter(Boolean)
  }

  const dataNode = input?.data ?? input

  if (!dataNode) return null

  if (Array.isArray(dataNode)) {
    return dataNode.map((item) => normalizeMedia(item)).filter(Boolean)
  }

  const attrs = dataNode.attributes || dataNode

  const url = attrs.url || attrs.formats?.url
  const mime = attrs.mime || attrs.mimeType

  if (!url && !mime && !attrs.documentId) {
    return null
  }

  return {
    id: dataNode.id ?? attrs.id ?? null,
    documentId: attrs.documentId ?? null,
    url: url || '',
    mime: mime || '',
    name: attrs.alternativeText || attrs.name || '',
    caption: attrs.caption || null,
    width: attrs.width,
    height: attrs.height,
    size: attrs.size,
    formats: attrs.formats || null,
    provider: attrs.provider,
  }
}

const normalizeGallery = (gallery) => {
  const collection = Array.isArray(gallery?.data)
    ? gallery.data
    : Array.isArray(gallery)
      ? gallery
      : []

  return collection
    .map((item) => {
      const source = item.attributes || item

      const media =
        normalizeMedia(source.galleryItem) ||
        normalizeMedia(source.media) ||
        normalizeMedia(source)

      if (!media?.url) return null

      return {
        id: item.id ?? source.id ?? media.id,
        ...media,
      }
    })
    .filter(Boolean)
}

const normalizeProject = (entry) => {
  if (!entry) return null

  const node = entry.data || entry
  const attrs = node.attributes || node

  const project = {
    id: node.id ?? attrs.id ?? null,
    documentId: attrs.documentId ?? node.documentId ?? null,
    ...attrs,
  }

  project.projectCover = normalizeMedia(attrs.projectCover)
  project.projectThumbnail = normalizeMedia(attrs.projectThumbnail)
  project.projectGallery = normalizeGallery(attrs.projectGallery)

  return project
}

const extractCollection = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data) return [payload.data]
  return []
}

const requestProjectWithFallbacks = async (identifier) => {
  const attempts = []

  attempts.push(`/projects/${identifier}?${PROJECT_POPULATE_QUERY}`)
  attempts.push(`/projects/${identifier}?populate=*`)

  if (typeof identifier === 'string' && Number.isNaN(Number(identifier))) {
    const filter = documentFilter(identifier)
    attempts.push(`/projects?${filter}&${PROJECT_POPULATE_QUERY}`)
    attempts.push(`/projects?${filter}&populate=*`)
  }

  attempts.push(`/projects/${identifier}`)

  for (const url of attempts) {
    try {
      const data = await doRequest(url)
      const records = extractCollection(data)
      if (!records.length) continue
      if (records.length === 1) return normalizeProject(records[0])
      return records.map((record) => normalizeProject(record)).filter(Boolean)
    } catch (error) {
      if (error?.response?.status !== 404) {
        console.warn('Project request failed', {
          url,
          status: error?.response?.status,
          data: error?.response?.data,
        })
      }
    }
  }

  return null
}

const requestProjectsCollection = async () => {
  try {
    const data = await doRequest(`/projects?${PROJECT_POPULATE_QUERY}`)
    return extractCollection(data).map((entry) => normalizeProject(entry)).filter(Boolean)
  } catch (error) {
    console.warn('Project collection populate fetch failed', {
      status: error?.response?.status,
      data: error?.response?.data,
    })
  }

  try {
    const data = await doRequest('/projects?populate=*')
    return extractCollection(data).map((entry) => normalizeProject(entry)).filter(Boolean)
  } catch (error) {
    console.warn('Project collection fallback populate=* failed', {
      status: error?.response?.status,
      data: error?.response?.data,
    })
  }

  const data = await doRequest('/projects')
  const baseCollection = extractCollection(data)

  const hydrated = await Promise.all(
    baseCollection.map(async (entry) => {
      const project = normalizeProject(entry)
      if (!project) return null

      const detailed = await requestProjectWithFallbacks(project.documentId || project.id)
      return detailed || project
    })
  )

  return hydrated.filter(Boolean)
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      url: error?.config?.url,
      data: error?.response?.data,
    })
    return Promise.reject(error)
  }
)

const getProjects = async () => requestProjectsCollection()

const getProject = async (idOrDocumentId) => {
  const result = await requestProjectWithFallbacks(idOrDocumentId)
  if (Array.isArray(result)) return result[0] || null
  return result
}

const getProjectGallery = async (idOrDocumentId) => {
  const result = await requestProjectWithFallbacks(idOrDocumentId)
  if (Array.isArray(result)) return result
  return result ? result.projectGallery : []
}

export default {
  async getHome() {
    const data = await doRequest('/home?populate=*')
    return data
  },

  async getInfo() {
    const data = await doRequest('/info?populate=*')
    return data
  },

  async getArchive() {
    const data = await doRequest('/archive?populate=*')
    return data
  },

  async getProjects() {
    return getProjects()
  },

  async getProject(id) {
    return getProject(id)
  },

  async getProjectGallery(id) {
    return getProjectGallery(id)
  },

  async getFile(id) {
    const data = await doRequest(`/upload/files/${id}`)
    return data
  },

  async getUploads() {
    const data = await doRequest('/upload/files')
    return data
  },
}
