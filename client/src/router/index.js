import Vue from 'vue';
import VueRouter from 'vue-router';
import ActivitiesList from '@/views/ActivitiesList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'activitiesList',
    component: ActivitiesList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
