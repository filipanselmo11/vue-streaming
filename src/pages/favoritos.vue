<script lang="ts" setup>
import { useRouter } from 'vue-router';
import NavComponent from '../components/NavComponent.vue';

const router = useRouter();

const goFavoritosPage = () => {
    router.push({ name: 'Favoritos' });
};

const goHomePage = () => {
    router.push({ name: 'Home' });
};

const goFilmesPage = () => {
    router.push({ name: 'Filmes' });
};

const goSeriesPage = () => {
    router.push({ name: 'Series' });
};

</script>

<template>
    <NavComponent
        @home-click="goHomePage()"
        @filmes-click="goFilmesPage()"
        @series-click="goSeriesPage()"
        @fav-click="goFavoritosPage()"/>
    <main class="container mt-5">
        <h1>Olá eu sou a página de favoritos</h1>
    </main>
</template>