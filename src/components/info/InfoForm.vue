<template>
  <section class="formulaire-section" :data-open="isOpen">
    <!-- 🟡 MOBILE TITLE (TOGGLE) -->
    <div class="mobile-title">
      <h2 @click="toggleMobile">Formulaire</h2>
    </div>

    <form>
      <ul>
        <li>
          <input type="text" id="name" name="name" placeholder="Nom" required />
        </li>
        <li>
          <input type="text" id="entreprise" name="entreprise" placeholder="Entreprise" required />
        </li>
        <li>
          <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" required />
        </li>
        <li>
          <input type="email" id="email" name="email" placeholder="Courriel" required />
        </li>
      </ul>

      <!-- RIGHT COLUMN -->
      <ul>
        <li>
          <input type="text" id="sujet" name="sujet" placeholder="Sujet" required />
        </li>
        <li>
          <textarea id="message" name="message" placeholder="Message" required></textarea>
        </li>
        <li>
          <button type="submit">Envoyer</button>
        </li>
      </ul>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)
const isMobile = () => window.matchMedia("(max-width: 767px)").matches
function toggleMobile() {
  if (isMobile()) isOpen.value = !isOpen.value
}

</script>

<style scoped>
/* ─────────────── DESKTOP ─────────────── */
.formulaire-section {
  display: flex;
  flex-direction: column;
}

.mobile-title {
  display: none; /* only show on mobile later */
}

form {
  display: flex;
  gap: 2rem;
  margin-bottom: var(--space-small);
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
  height: 1em;
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

/* ─────────────── MOBILE ─────────────── */
@media only screen and (max-width: 767px) {
  /* Show the title */
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
  /* Collapsible form */
  .formulaire-section:not([data-open="true"]) form {
    display: none;
  }

  /* Stack inputs */
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
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
