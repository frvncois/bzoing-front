<template>
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

    <ul>
      <li>
        <label>Service(s)</label>
        <ul>
          <li
            v-for="(service, index) in services"
            :key="index"
            :class="{ active: selectedServices.includes(index) }"
            @click="toggleService(index)"
          >
            <span>({{ index + 1 }})</span>
          </li>
        </ul>
      </li>

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
</template>

<script setup>
import { ref } from "vue"

const services = [
  "Identité visuelle",
  "Direction créative",
  "Direction artistique",
  "Design graphique",
  "Stratégie de marque",
  "Dév. web",
  "Motion",
  "Packaging",
]

const selectedServices = ref([])

function toggleService(index) {
  const i = selectedServices.value.indexOf(index)
  if (i === -1) {
    selectedServices.value.push(index)
  } else {
    selectedServices.value.splice(i, 1)
  }
}
</script>

<style scoped>
form {
  display: flex;
  gap: 2rem;
  margin-bottom: var(--space-small);
}

form > ul {
    &:first-child {
        flex: 0.5;
    }
    &:last-child {
        flex: 1;
    }
    li {
        display: flex;
        justify-content: space-between;
    }
}

input,
textarea,
span {
  border: none;
  width: 100%;
  padding: 0;
  height: 1em;
  line-height: 0.9;
  outline: none;
  font-size: var(--font-medium);
  font-family: "body";
  resize: none;
}


label {
    font-size: var(--font-medium);
    font-family: "body";
    white-space: nowrap;
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

ul ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.25rem;
    position: absolute;
    right: var(--space-small);
}

ul ul li {
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
}

ul ul li.active {
  color: var(--is-yellow, #ffd100);
}

@media only screen and (max-width: 767px) {
  form {
    display: flex;
    flex-direction: column;
    > ul {
      & li {
        flex-direction: column;
        }
      }
    }
    ul ul {
      display: flex;
      flex-wrap: nowrap;
      gap: 0.5rem;
      margin-top: 0.25rem;
      position: relative;
      right: unset;
  }
  label, input, button, textarea, span {
    font-size: var(--font-normal);
  }
}

</style>
