<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />

  <div class="max-w-screen-xl mx-auto w-full p-6">
    <RouterView />
  </div>
</template>