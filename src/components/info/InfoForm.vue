<template>
  <section class="formulaire-section" :data-open="isOpen">
    <div class="mobile-title">
      <h2 @click="toggleMobile">{{ formCopy.title }}</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <ul>
        <li>
          <input v-model="form.name" type="text" id="name" name="name" :placeholder="formCopy.fields.name" required :disabled="isSubmitting" />
        </li>
        <li>
          <input
            v-model="form.company"
            type="text"
            id="entreprise"
            name="entreprise"
            :placeholder="formCopy.fields.company"
            :disabled="isSubmitting"
          />
        </li>
        <li>
          <input
            v-model="form.phone"
            type="tel"
            id="telephone"
            name="telephone"
            :placeholder="formCopy.fields.phone"
            :disabled="isSubmitting"
          />
        </li>
        <li>
          <input
            v-model="form.email"
            type="email"
            id="email"
            name="email"
            :placeholder="formCopy.fields.email"
            required
            :disabled="isSubmitting"
          />
        </li>
      </ul>

      <ul>
        <li>
          <input v-model="form.subject" type="text" id="sujet" name="sujet" :placeholder="formCopy.fields.subject" required :disabled="isSubmitting" />
        </li>
        <li>
          <textarea v-model="form.message" id="message" name="message" :placeholder="formCopy.fields.message" required :disabled="isSubmitting"></textarea>
        </li>
        <li>
          <span v-if="statusMessage" :class="['status-message', statusType]">{{ statusMessage }}</span>
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? formCopy.sending || 'Envoi...' : formCopy.submit }}
          </button>
        </li>
      </ul>
    </form>
  </section>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useTranslations } from '@/translation'

const { dictionary } = useTranslations()
const formCopy = computed(() => dictionary.value?.info?.form || { fields: {} })
const isOpen = ref(false)
const isSubmitting = ref(false)
const statusMessage = ref('')
const statusType = ref('')

const form = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

const isMobile = () => window.matchMedia('(max-width: 767px)').matches
function toggleMobile() {
  if (isMobile()) isOpen.value = !isOpen.value
}

async function handleSubmit() {
  isSubmitting.value = true
  statusMessage.value = ''

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (response.ok) {
      statusMessage.value = formCopy.value.success || 'Message envoyé!'
      statusType.value = 'success'
      Object.keys(form).forEach(key => form[key] = '')
    } else {
      statusMessage.value = formCopy.value.error || 'Erreur lors de l\'envoi'
      statusType.value = 'error'
    }
  } catch {
    statusMessage.value = formCopy.value.error || 'Erreur lors de l\'envoi'
    statusType.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.formulaire-section {
  display: flex;
  flex-direction: column;
}

.mobile-title {
  display: none;
}

form {
  display: flex;
  gap: 2rem;
  margin-bottom: var(--space-small);
  margin-top: var(--space-xlarge)
}

form > ul:first-child {
  flex: 0.5;
}
form > ul:last-child {
  flex: 1;
}

form > ul li {
  display: flex;
  justify-content: space-between;
}

input,
textarea {
  border: none;
  width: 100%;
  padding: 0;
  height: 0.96em;
  line-height: 0.9;
  font-size: var(--font-medium);
  outline: none;
  font-family: "body";
  resize: none;
}

textarea {
  height: 140px;
}

button {
  font-size: var(--font-medium);
  font-family: "body";
  white-space: nowrap;
  margin-left: auto;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

input:disabled,
textarea:disabled {
  opacity: 0.6;
}

.status-message {
  font-size: var(--font-small, 0.875rem);
  margin-right: 1rem;
}

.status-message.success {
  color: #22c55e;
}

.status-message.error {
  color: #ef4444;
}

input::placeholder,
textarea::placeholder {
  color: inherit;
}

ul.services {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

ul.services li {
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
  font-size: var(--font-medium);
}

ul.services li.active {
  color: var(--is-yellow, #ffd100);
}

@media only screen and (max-width: 767px) {
  .mobile-title {
    display: block;
    margin-bottom: var(--space-small);
    cursor: pointer;
    position: relative;
  }

  .mobile-title h2 {
    font-size: var(--font-normal);
    position: relative;
    padding-right: 1.5rem;
  }
  .formulaire-section:not([data-open="true"]) form {
    display: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: var(--space-small);
    margin-top: var(--space-small);
  }

  form > ul li {
    flex-direction: column;
  }

  ul.services {
    justify-content: flex-start;
    gap: 0.5rem;
  }

  ul.services li {
    flex: 0 0 auto;
  }
  button, input, textarea {
    font-size: var(--font-normal);
  }
}
</style>
