import { createApp } from 'vue'
import * as VueRouter from 'vue-router'
import { createPinia } from 'pinia'

import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'

import App from './App.vue'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./components/Home.vue'),
            children: [{
                name: 'home-default',
                path: '/',
                redirect: '/aircraft'
            },{
                path: '/aircraft',
                name: 'aircraft',
                component: () => import('./components/Aircraft.vue'),
            },{
                path: '/ground',
                name: 'ground',
                component: () => import('./components/Ground.vue'),
            }]
        },

        { path: '/:catchAll(.*)', name: 'lost', component: () => import('./components/Lost.vue') },
    ]
});

const app = createApp(App);
const pinia = createPinia()
app.use(router);
app.use(pinia);
app.use(FloatingVue);
app.mount('#app');
