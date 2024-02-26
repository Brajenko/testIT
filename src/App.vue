<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <Nav/>
  <div class="app">
    <RouterView />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  components: {
    Nav
  },
};
</script>

<style>
@import './assets/css/main.css';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  margin: 40px;
}

</style>
