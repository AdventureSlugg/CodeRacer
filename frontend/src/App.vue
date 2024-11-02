<template>
  <div class="nav-bar">
    <div class="nav-items">
      <a href="#/practice">Practice</a>
      <a href="#/race">Race</a>
    </div>
  </div>
  
  <div class="main-body">
    <component :is="currentView"></component>
    <div class="left-menu">

    </div>

    <div class="main-content">

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import PracticeView from './pages/PracticeView.vue';
import RaceView from './pages/RaceView.vue';


const routes = {
  '/practice': PracticeView,
  '/race': RaceView
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/']
})

</script>

<style scoped>
  .nav-bar {
    width: 100%;
    height: 5rem;
  }

  .main-body {
    height: calc(100vh - 5rem);
    display: flex;
  }

  .left-menu {
    width: 30rem;
    height: 100%;
  }

  .main-content {
    height: 100%;
    width: 100vw;
  }

</style>