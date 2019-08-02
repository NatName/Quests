import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

import MainComponent from './components/ListQuests.vue';
import InfoComponent from './components/InfoComponent.vue';

const routes = [
  {
      name: 'main',
      path: '/main',
      component: MainComponent
  },
  {
      name: 'info',
      path: '/info',
      component: InfoComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
