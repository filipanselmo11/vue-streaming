import { createRouter, createWebHistory } from "vue-router";
import Filmes from "../pages/filmes.vue";
import Home from "../pages/home.vue";
import Series from "../pages/series.vue";



const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/filmes',
        component: Filmes
    },
    {
        path: '/series',
        component: Series
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;