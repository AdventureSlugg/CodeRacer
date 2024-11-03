<template>
  <div class="nav-bar">
    <div class="nav-items">
      <a class="nav-item" 
        :class="{ 'selected': selectedPage == '/practice' }" 
        href="#/practice"
        @click="selectNav('/practice')">
        PRACTICE
      </a>
      <a class="nav-item" 
        :class="{ 'selected': selectedPage == '/race' }" 
        href="#/race"
        @click="selectNav('/race')">
        RACE
      </a>
    </div>
    <div class="left-nav">
      <img alt="preferences" class="left-nav-item" width="60rem" height="60rem" src="./assets/Settings.png">
      <a href="#/profile"><img alt="profile picture" width="70rem" height="70rem" class="profile-pic" src="./assets/metal_snail.webp" @click="selectNav('/profile')"></a>
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
import ProfileView from './pages/ProfileView.vue';

const selectedPage = ref('/practice');
const selectNav = (selectedNav) => {
  selectedPage.value = selectedNav;
}

const routes = {
  '/practice': PracticeView, // TODO: Implement
  '/race': RaceView, // TODO: Implement
  '/profile': ProfileView // TODO: Implement
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
  display: flex;
  flex-direction: row;
  margin: 1rem
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

.left-nav {
  color: aliceblue;
  text-align: right;
  flex-grow: 1;
  margin-right: 3rem;
}

.left-nav-item {
  margin: 0rem 2rem;
}

.selected {
  color: #00D0F4;
}

.main-body {
  height: calc(100vh - 5rem);
  display: flex;
}

.profile-pic {
  border-radius: 20rem;
  margin-right: 2rem;
}
</style>