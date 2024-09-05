<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useSerieStore } from '../stores/seriesStore';
import { onMounted } from 'vue';
import NavComponent from '../components/NavComponent.vue';
import CardComponent from '../components/CardComponent.vue';

const serieStore = useSerieStore();

const router = useRouter();

const goSeriesPage = () => {
    router.push('/series');
};

const goHomePage = () => {
    router.push('/');
};

const goFilmesPage = () => {
    router.push('/filmes');
};

onMounted(() => {
    serieStore.fetchSeries();
});

</script>

<template>
    <NavComponent
        @home-click="goHomePage"
        @filmes-click="goFilmesPage"
        @series-click="goSeriesPage"
    />
    <main class="container mt-5">
        <h2 class="h2 mb-4">
            Séries:
        </h2>
        <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 g-3">
            <div v-for="serie in serieStore.series" :key="serie.id" class="col">
                <CardComponent :card="serie"/>    
            </div>
        </div>
    </main>
</template>