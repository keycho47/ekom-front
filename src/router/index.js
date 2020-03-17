import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Entity',
    component: () => import(/* webpackChunkName: "about" */ '../views/Entity.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/client',
    name: 'Client',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Client.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      if (store.getters.userUser.role_id === 3){
        next()
      }else{
        store.dispatch('setClientId', 1).then(() => next({name: 'Product'}));
      }
    }
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/form',
    name: 'Form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/product',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '*',
    redirect: '/error'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth){
    if (localStorage.getItem('user_token') !== null){
      next();
    }else{
      next({name:'Login'})
    }
  }
  if (to.path !== '/') {
    if (to.path !== '/login') {
      if (store.getters.entity_id === '') {
        next({name: 'Entity'})
      } else {
        next();
      }
    }
    else  {
      next();
    }
  }
  next();
});
router.onError(err => {
  console.error(`Error message from router : ${err}`);
});

export default router
