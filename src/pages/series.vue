<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useSerieStore } from '../stores/seriesStore';
import { onMounted } from 'vue';
import NavComponent from '../components/NavComponent.vue';
import CardComponent from '../components/CardComponent.vue';

const serieStore = useSerieStore();

const router = useRouter();

const goSeriesPage = () => {
    router.push({ name: 'Series' });
};

const goHomePage = () => {
    router.push({ name: 'Home' });
};

const goFilmesPage = () => {
    router.push({ name: 'Filmes' });
};

const goFavoritosPage = () => {
    router.push({ name: 'Favoritos' });
};

const goDetalhesSerie = (id: number) => {
    router.push({ name: 'Detalhes-Serie', params: { id }});
};

onMounted(() => {
    serieStore.fetchSeries();
});

</script>

<template>
    <NavComponent
        @home-click="goHomePage()"
        @filmes-click="goFilmesPage()"
        @series-click="goSeriesPage()"
        @fav-click="goFavoritosPage()"
    />
    <main class="container mt-5">
        <h2 class="h2 display-6">
            Séries:
        </h2>
        <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3">
            <div v-for="serie in serieStore.series" :key="serie.id" class="col">
                <CardComponent :card="serie" @click-button="goDetalhesSerie(serie.id)"/>    
            </div>
        </div>
    </main>
</template>