import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueDragDrop from 'vue-drag-drop';
import PriorityQueue from 'js-priority-queue'

import App from './App.vue';

import routes from './routes';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueDragDrop);
Vue.use(PriorityQueue);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history',
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
