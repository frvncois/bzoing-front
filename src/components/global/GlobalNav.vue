<template>
    <div class="is-mobile">
        <button @click="$emit('close')">X</button>
        <nav>
            <RouterLink
              @click="$emit('close')"
              :to="{ path: '/', hash: '#projects' }"
            >Projets</RouterLink>
            <RouterLink @click="$emit('close')" to="/archive">Archive</RouterLink>
            <RouterLink @click="$emit('close')" to="/recreation">Récréation</RouterLink>
            <RouterLink @click="$emit('close')" to="/info">Info</RouterLink>
        </nav>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);
</script>
