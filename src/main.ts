import { createApp, watch } from 'vue'
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
                path: '/aircraft/regions',
                name: 'aircraft-regions',
                component: () => import('./components/AircraftRegions.vue'),
            },{
                path: '/aircraft/calc',
                name: 'aircraft-calc',
                component: () => import('./components/AircraftCalc.vue'),
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


watch(
    pinia.state,
    (state) => {
        localStorage.setItem(
            "mission",
            JSON.stringify(state.search)
        );
    },
    { deep: true }
);

app.use(router);
app.use(pinia);
app.use(FloatingVue);
app.mount('#app');
