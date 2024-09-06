import { createRouter, createWebHistory } from "vue-router";
import Filmes from "../pages/filmes.vue";
import Home from "../pages/home.vue";
import Series from "../pages/series.vue";
import Filme from "../pages/detalhes/filme/[id].vue";
import Serie from "../pages/detalhes/serie/[id].vue";

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
        path: '/filme/:id',
        name: 'Detalhes-Filme',
        component: Filme
    },
    {
        path: '/serie/:id',
        name: 'Detalhes-Serie',
        component: Serie
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;