import { computed } from 'vue'
import { useStore } from '@/store'

const FALLBACK_LOCALE = 'fr'

const socialLinks = {
  instagram: 'https://www.instagram.com/bzoing_mtl/',
  behance: 'https://www.behance.net/bzoing',
}

const sharedFooter = {
  copyright: '© Bzoing',
  year: '2026',
  emailParts: ['info', '@', 'bzoing.ca'],
  phoneParts: ['514', '830-7833'],
  emailHref: 'mailto:info@bzoing.ca',
  phoneHref: 'tel:5148307833',
  social: {
    instagram: 'Instagram',
    behance: 'Behance',
  },
  socialLinks,
}

const sharedContactDetails = {
  phoneNumber: '514 830-7833',
  email: 'info@bzoing.ca',
  socialLinks,
}

export const translations = {
  fr: {
    global: {
      siteName: 'Bzoing',
      languageToggle: 'EN',
      menuLabel: 'menu',
      nav: {
        projects: 'Projets',
        archives: 'Archives',
        recreation: 'Récréation',
        info: 'Info',
      },
      footer: {
        ...sharedFooter,
        addressLines: ['1 Rue de Castelnau Est, bur.105', 'Montréal, QC, H2R 2W3'],
      },
    },
    home: {
      sticky: {
        lineOne: 'Studio',
        lineTwo: 'Montréalais',
      },
    },
    info: {
      contact: {
        title: 'Contact',
        addressLabel: 'Adresse',
        phoneLabel: 'Téléphone',
        inquiryTitle: "Demande d'information & emploi",
        socialTitle: 'Social',
        ...sharedContactDetails,
        addressLines: ['1 Rue de Castelnau Est, bur.105', 'Montréal, QC, H2R 2W3'],
      },
      clients: {
        title: 'Name drop',
        intro:
          'Au fil des années, nous avons eu le plaisir de collaborer avec des marques, institutions et entreprises aux profils variés. Nous privilégions les projets qui partagent cette vision et voulons créer des liens durables avec des clients qui ont envie de se démarquer.',
      },
      team: {
        title: 'Équipe',
        strategyLabel: '(A) Admin',
        creationLabel: '(B) Création',
        approachTitle: 'Approche',
        approachSteps: [
          "S'amuser",
          'Analyse de la réalité de la marque',
          'Réflexion stratégique',
          'Intention de création',
          'Création des idées',
        ],
      },
      services: {
        title: 'Services',
      },
      form: {
        title: 'Formulaire',
        fields: {
          name: 'Nom',
          company: 'Entreprise',
          phone: 'Téléphone',
          email: 'Courriel',
          subject: 'Sujet',
          message: 'Message',
        },
        submit: 'Envoyer',
      },
    },
    project: {
      buttons: {
        home: 'Accueil',
        next: 'Suivant',
      },
      loading: 'Chargement du projet...',
      galleryFallback: 'Élément de galerie',
    },
  },
  en: {
    global: {
      siteName: 'Bzoing',
      languageToggle: 'FR',
      menuLabel: 'menu',
      nav: {
        projects: 'Projects',
        archives: 'Archives',
        recreation: 'Recess',
        info: 'Info',
      },
      footer: {
        ...sharedFooter,
        addressLines: ['1 Rue de Castelnau Est, bur.105', 'Montréal, QC, H2R 2W3'],
      },
    },
    home: {
      sticky: {
        lineOne: 'Montreal',
        lineTwo: 'Studio',
      },
    },
    info: {
      contact: {
        title: 'Contact',
        addressLabel: 'Address',
        phoneLabel: 'Phone',
        inquiryTitle: 'Information & jobs',
        socialTitle: 'Social',
        ...sharedContactDetails,
        addressLines: ['1 Rue de Castelnau Est, bur.105', 'Montréal, QC, H2R 2W3'],
      },
      clients: {
        title: 'Name drop',
        intro:
          "Over the years, we've had the pleasure of collaborating with brands, institutions, and companies with diverse profiles. We focus on projects that share this vision and aim to build lasting relationships with clients who want to stand out.",
      },
      team: {
        title: 'Team',
        strategyLabel: '(A) Admin',
        creationLabel: '(B) Creation',
        approachTitle: 'Process',
        approachSteps: [
          'Have fun',
          'Analyzing brand ecosystem',
          'Strategic approach',
          'Creative intent',
          'Ideation and concept development ',
        ],
      },
      services: {
        title: 'Services',
      },
      form: {
        title: 'Form',
        fields: {
          name: 'Name',
          company: 'Company',
          phone: 'Phone',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
        },
        submit: 'Send',
      },
    },
    project: {
      buttons: {
        home: 'Home',
        next: 'Next',
      },
      loading: 'Loading project...',
      galleryFallback: 'Gallery item',
    },
  },
}

const getValueByPath = (obj, path) => {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, segment) => (acc ? acc[segment] : undefined), obj)
}

const detectLocale = state => {
  const docLocale = typeof document !== 'undefined' ? document.documentElement.lang : ''
  const navLocale = typeof navigator !== 'undefined' ? navigator.language : ''
  const localeCandidate = state?.locale || docLocale || navLocale
  if (typeof localeCandidate === 'string') {
    const normalized = localeCandidate.slice(0, 2).toLowerCase()
    if (translations[normalized]) return normalized
  }
  return FALLBACK_LOCALE
}

export const useTranslations = () => {
  const store = useStore()

  const locale = computed(() => detectLocale(store.state))
  const dictionary = computed(() => translations[locale.value] || translations[FALLBACK_LOCALE])

  const t = (path) =>
    getValueByPath(dictionary.value, path) ??
    getValueByPath(translations[FALLBACK_LOCALE], path) ??
    path

  return {
    locale,
    t,
    dictionary,
  }
}

export const translate = (path, locale = FALLBACK_LOCALE) => {
  const dictionary = translations[locale] || translations[FALLBACK_LOCALE]
  return getValueByPath(dictionary, path) ?? getValueByPath(translations[FALLBACK_LOCALE], path) ?? path
}
