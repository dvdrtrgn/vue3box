import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Calc from '../views/Calc.vue';
import Wip from '../views/Wip.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/calc',
    name: 'Calc',
    component: Calc,
    meta: {
      title: 'The Calc stuff',
    },
    children: [
      {
        path: 'tomato',
        name: 'Tomato',
        meta: {
          title: 'The Counter Intuitive Tomato',
        },
        component: () =>
          import(/* webpackChunkName: "tomato" */ '../views/calc/Tomato.vue'),
      },
      {
        path: 'cars',
        name: 'Cars',
        meta: {
          title: 'The Counter Intuitive Cars',
        },
        component: () =>
          import(/* webpackChunkName: "cars" */ '../views/calc/Cars.vue'),
      },
      {
        path: 'range',
        name: 'Range',
        component: () =>
          import(/* webpackChunkName: "range" */ '../views/calc/Range.vue'),
      },
    ],
  },
  {
    path: '/wip',
    name: 'Wip',
    component: Wip,
    meta: {
      title: 'The WIP stuff',
    },
    children: [
      {
        path: 'matrix',
        name: 'Matrix',
        meta: {
          title: 'The Freaky Matrix',
        },
        component: () =>
          import(/* webpackChunkName: "matrix" */ '../views/calc/Matrix.vue'),
      },
      {
        path: 'vmail',
        name: 'Vmail',
        meta: {
          title: 'Forge Vmail',
        },
        component: () =>
          import(/* webpackChunkName: "vmail" */ '../views/mail/Vmail.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = document.title;
router.afterEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
