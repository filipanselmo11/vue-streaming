<script lang="ts" setup>
import { useRouter } from 'vue-router';
import CardComponent from '../components/CardComponent.vue';
import { useFilmeStore } from '../stores/filmesStore';
import { useSerieStore } from '../stores/seriesStore';
import { onMounted } from 'vue';
import NavComponent from '../components/NavComponent.vue';
import LoadComponent from '../components/LoadComponent.vue';

const filmeStore = useFilmeStore();

const serieStore = useSerieStore();

const router = useRouter();

const goHomePage = () => {
    router.push({ name: 'Home' });
};

const goFilmesPage = () => {
    router.push({ name: 'Filmes' });
}

const goSeriesPage = () => {
    router.push({ name: 'Series' });
};

const goFavoritosPage = () => {
    router.push({ name: 'Favoritos' });
};

const goDetalhesFilme = (id: number) => {
    router.push({ name: 'Detalhes-Filme', params: { id }});
};

const goDetalhesSerie = (id: number) => {
    router.push({ name: 'Detalhes-Serie', params: { id }});
};

onMounted(() => {
    filmeStore.fetchFilmes();
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
        <div v-if="filmeStore.loading" class="d-flex justify-content-center">
            <LoadComponent />
        </div>
        <div v-else>
            <section id="filmes">
                <h2 class="h2">
                    Filmes
                </h2>
                <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 g-3">
                    <div v-for="filme in filmeStore.filmes" :key="filme.id" class="col">
                        <CardComponent :card="filme" @click-button="goDetalhesFilme(filme.id)"/>
                    </div>
                </div>
            </section>
        </div>
        <div v-if="serieStore.loading" class="d-flex justify-content-center">
            <LoadComponent />
        </div>
        <div v-else class="mt-4">
            <section id="series">
                <h2 class="h2">
                    Séries
                </h2>
                <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 g-3">
                    <div v-for="serie in serieStore.series" :key="serie.id" class="col">
                        <CardComponent :card="serie" @click-button="goDetalhesSerie(serie.id)"/>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>