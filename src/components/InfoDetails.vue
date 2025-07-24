<template>
  <ul about>
    <li>
      <h3>Services</h3>
    </li>
    <li>
      <p>{{ store.state.infoData?.infoServices }}</p>
    </li>
    <li>
      <ul>
        <li v-for="service in store.state.infoData?.infoList" :key="service.id">
          <span>{{ service.serviceIndex }}</span> {{ service.serviceTitle }}
        </li>
      </ul>
    </li>
  </ul>
  
  <ul clients>
    <li>
      <h3>Name drop</h3>
    </li>
    <li></li>
    <li>
      <ul>
        <li v-for="(client, i) in getClientNames()" :key="i">{{ client }}</li>
      </ul>
    </li>
  </ul>
  
  <ul footer>
    <li>
      <h3>À Propos</h3>
    </li>
    <li>
      <p>{{ store.state.infoData?.infoAbout }}</p>
    </li>
    <li>
      <span>
        <h3>Social</h3>
      </span>
      <span>
        <a href="https://www.instagram.com/bzoing_mtl/" target="_blank">Instagram</a>
        <a href="https://www.behance.net/bzoing" target="_blank">Behance</a>
      </span>
    </li>
    <li>
      <span>
        <h3>Téléphone</h3>
      </span>
      <span>
        <a href="tel:5148307833">514 830-7833</a>
      </span>
    </li>
    <li>
      <span>
        <h3>Courriel</h3>
      </span>
      <span>
        <a href="mailto:info@bzoing.ca">info@bzoing.ca</a>
      </span>
    </li>
    <li>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const getServicesByIndexRange = (start, end) => {
  if (!store.state.infoData || !store.state.infoData.infoList) return [];
  return store.state.infoData.infoList.filter(service => {
    const index = stripIndex(service.serviceIndex);
    return index >= start && index <= end;
  });
};

const stripIndex = (indexString) => {
  return parseInt(indexString.replace(/[^\d]/g, ''));
};

const getClientNames = () => {
  const listBlock = store.state.infoData?.infoClients?.find(item => item.type === 'list');
  const items = listBlock?.children || [];
  return items
    .filter(child => child.type === 'list-item')
    .map(listItem => listItem.children?.[0]?.text?.trim())
    .filter(Boolean);
};
</script>