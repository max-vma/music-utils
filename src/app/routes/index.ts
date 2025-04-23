import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { FretboardScales, HomePage } from '@/pages';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomePage },
  { path: '/fretboard-scales', component: FretboardScales },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
