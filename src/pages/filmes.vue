<script lang="ts" setup>
import { onMounted } from 'vue';
import { useFilmeStore } from '../stores/filmesStore';
import { useRouter } from 'vue-router';
import CardComponent from '../components/CardComponent.vue';
import NavComponent from '../components/NavComponent.vue';

const filmeStore = useFilmeStore();

const router = useRouter();

const goFilmesPage = () => {
    router.push({ name: 'Filmes' });
};
const goHomePage = () => {
    router.push({ name: 'Home' });
};
const goSeriesPage = () => {
    router.push({ name: 'Series' });
};

const goFavoritosPage = () => {
    router.push({ name: 'Favoritos' });
};

const goDetalhesFilme = (id: number) => {
    router.push({ name: 'Detalhes-Filme', params: { id }});
};


onMounted(() => {
    filmeStore.fetchFilmes();
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
            Filmes:
        </h2>
        <div class="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3">
            <div v-for="filme in filmeStore.filmes" :key="filme.id" class="col">
                <CardComponent :card="filme" @click-button="goDetalhesFilme(filme.id)"/>
            </div>
        </div>
    </main>
</template>