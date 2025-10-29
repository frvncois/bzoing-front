<template>
  <ul>
    <li>
      <h2>Contact</h2>
    </li>
    <li>
      <h3>Adresse</h3>
      <p>4641 Av.Papineau<br>Montréal, QC H2H 1V4</p>
      <h4>Téléphone</h4>
      <a href="tel:5148307833">514 830-7833</a>
    </li>
    <li>
      <h3>Demande d'information<br>& emploi</h3>
      <a href="mailto:info@bzoing.ca">info@bzoing.ca</a>
    </li>
    <li>
      <h3>Social</h3>
      <div>
        <a href="https://instagram.com/bzoingmtl" target="_blank">Instagram</a>
        <a href="https://www.behance.net/bzoing" target="_blank">Behance</a>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: var(--space-large);
  column-gap: var(--space-normal);
  > li div {
    display: flex;
    gap: var(--space-normal);
  }
  > li:has(> h2) {
    grid-column: span 6;
  }
  & h2 {
    font-size: var(--font-medium);
  }

  & h3 {
    text-transform: uppercase;
  }
}

@media only screen and (max-width: 767px) {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: var(--space-large);
    > li:has(> h2) {
      grid-column: span 2;
    }
    & h2 {
      font-size: var(--font-normal);
    }
  }
}
</style>