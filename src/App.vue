<template>
  <div id="app">
    <Toolbar />
    <router-view />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import PriorityQueue from 'js-priority-queue';

export default {
  name: 'App',
  components: {
    Toolbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
