import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter);

const routes = [
    {
        path: '/client',
        name: 'Client',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Client.vue'),
        meta: {requiresAuth: true},
        beforeEnter: (to, from, next) => {
            if (store.getters.getProfile.role_id === 3) {
                next()
            } else {
                store.dispatch('setClientId', 1).then(() => next({name: 'Product'}));
            }
            if (store.getters.isAuthenticated) {
                next();
                return;
            }
            next("/login");
        }
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/form',
        name: 'Form',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue'),
        meta: {requiresAuth: true},
        beforeEnter: ifAuthenticated

    },
    {
        path: '/product',
        name: 'Product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
        meta: {requiresAuth: true},
        beforeEnter: ifAuthenticated

    },
    {
        path: '/',
        name: 'Entity',
        component: () => import(/* webpackChunkName: "about" */ '../views/Entity.vue'),
        meta: {requiresAuth: true},
        beforeEnter: ifAuthenticated
    },
    {
        path: '*',
        redirect: '/error'
    }
];



const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/login");
};


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.onError(err => {
    console.error(`Error message from router : ${err}`);
});

export default router
