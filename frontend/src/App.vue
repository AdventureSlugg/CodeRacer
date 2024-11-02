<template>
  <div class="nav-bar">
    <div class="nav-items">
      <a class="nav-item" :class="{ 'selected': selectedPage == '/practice' }" href="#/practice"
        @click="selectNav('/practice')">Practice</a>
      <a class="nav-item" :class="{ 'selected': selectedPage == '/race' }" href="#/race"
        @click="selectNav('/race')">Race</a>
    </div>
  </div>

  <div class="main-body">
    <component :is="currentView"></component>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import PracticeView from './pages/PracticeView.vue';
import RaceView from './pages/RaceView.vue';

const selectedPage = ref('/practice');
const selectNav = (selectedNav) => {
  selectedPage.value = selectedNav;
}

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

.nav-items {
  padding: 2rem 3rem;
}

.nav-item {
  color: aliceblue;
  font-size: 2rem;
  padding: 2rem;
  text-decoration: none;
}

.selected {
  color: #00D0F4;
}

.main-body {
  height: calc(100vh - 5rem);
  display: flex;
}
</style>