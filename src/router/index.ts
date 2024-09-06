import { createRouter, createWebHistory } from "vue-router";
import Filmes from "../pages/filmes.vue";
import Home from "../pages/home.vue";
import Series from "../pages/series.vue";
import Detalhes from "../pages/detalhes/[id].vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/filmes',
        name: 'Filmes',
        component: Filmes
    },
    {
        path: '/series',
        name: 'Series',
        component: Series
    },
    {
        path: '/detalhes/:id/:tipo',
        name: 'Detalhes',
        component: Detalhes
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;