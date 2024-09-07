<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useFilmeStore } from '../stores/filmesStore';
import { useSerieStore } from '../stores/seriesStore';
import NavComponent from '../components/NavComponent.vue';
import CardComponent from '../components/CardComponent.vue';

const router = useRouter();
const filmeStore = useFilmeStore();
const serieStore = useSerieStore();

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

const goDetalhesFilme = (id: number) => {
    router.push({ name: 'Detalhes-Filme', params: { id }});
};

const goDetalhesSerie = (id: number) => {
    router.push({ name: 'Detalhes-Serie', params: { id }});
};

</script>

<template>
    <NavComponent
        @home-click="goHomePage()"
        @filmes-click="goFilmesPage()"
        @series-click="goSeriesPage()"
        @fav-click="goFavoritosPage()"/>
    <main class="container mt-5">
        <h2 class="h2 display-6">
            Minha lista de favoritos
        </h2>
        <div v-if="filmeStore.favoritos.length > 0">
            <h2 class="h2 display-6 mt-md-4 mt-sm-3">
                Filmes:
            </h2>
            <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3">
                <div v-for="filme in filmeStore.favoritos" :key="filme.id" class="col">
                    <CardComponent :card="filme" @click-button="goDetalhesFilme(filme.id)"/>
                </div>
            </div>
        </div>
        <div v-else>
            <span class="display-6 text-center d-block mt-md-3 mt-sm-2">
                Nenhum filme favorito
            </span>
        </div>
        <div v-if="serieStore.favoritos.length > 0" class="mt-5">
            <h2 class="h2 display-6 mt-md-4 mt-sm-3">
                Séries:
            </h2>
            <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3">
                <div v-for="serie in serieStore.favoritos" :key="serie.id" class="col">
                    <CardComponent :card="serie" @click-button="goDetalhesSerie(serie.id)"/>
                </div>
            </div>
        </div>
        <div v-else>
            <span class="display-6 text-center d-block mt-md-3 mt-sm-2">
                Nenhuma série favorita
            </span>
        </div>
        <div v-if="filmeStore.favoritos.length === 0 && serieStore.favoritos.length === 0" class="mt-4">
            <span class="display-6 text-center d-block mt-md-3 mt-sm-2">
                Nenhum filme ou série foi favoritada.
            </span>
        </div>
    </main>
</template>