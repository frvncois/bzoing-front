<template>
    <ul about>
        <li>
            <h3>Services</h3>
        </li>
        <li>
            <p>{{ infoData?.infoServices }}</p>
        </li>
        
        <li>
            <ul>
                <li v-for="service in infoData?.infoList" :key="service.id">
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
            <p>{{ infoData?.infoAbout }}</p>
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
                <span>
                    <h2>Nous joindre</h2>
                </span>
            </li>
    </ul>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api';

const infoData = ref({});
const loading = ref(true);
const error = ref(null);

const fetchInfoData = async () => {
  loading.value = true;
  try {
    const response = await api.getAll('info');
    infoData.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = err.message || 'Failed to load info content';
    loading.value = false;
    console.error('Error details:', err);
  }
};

const getServicesByIndexRange = (start, end) => {
  if (!infoData.value || !infoData.value.infoList) return [];

  return infoData.value.infoList.filter(service => {
    const index = stripIndex(service.serviceIndex);
    return index >= start && index <= end;
  });
};


const stripIndex = (indexString) => {
  return parseInt(indexString.replace(/[^\d]/g, ''));
};


const getClientNames = () => {
  const listBlock = infoData.value?.infoClients?.find(item => item.type === 'list');
  const items = listBlock?.children || [];

  return items
    .filter(child => child.type === 'list-item')
    .map(listItem => listItem.children?.[0]?.text?.trim()) // grab the inner text
    .filter(Boolean); // remove empty/null
};


onMounted(() => {
  fetchInfoData();
});
</script>