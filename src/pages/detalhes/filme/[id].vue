<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useFilmeStore } from '../../../stores/filmesStore';
import { onMounted } from 'vue';
import NavComponent from '../../../components/NavComponent.vue';
import LoadComponent from '../../../components/LoadComponent.vue';

const route = useRoute();
const router = useRouter();
const filmeStore = useFilmeStore();

const goHomePage = () => {
    router.push({ name: 'Home' });
};

const goFilmesPage = () => {
    router.push({ name: 'Filmes' });
};

const goSeriesPage = () => {
    router.push({ name: 'Series' });
};

const goFavoritosPage = () => {
    router.push({ name: 'Favoritos' });
};

const assistirTrailer = () => {
    if (filmeStore.filme.trailer_link) {
        window.open(filmeStore.filme.trailer_link, '_blank');
    } else {
        console.error('Trailer não disponível');
    }
};

const favoritarFilme = (filme: any) => {
    filmeStore.favoritarFilme(filme);
};

const desfavoritarFilme = (filme: any) => {
    filmeStore.desfavoritarFilme(filme);
};



onMounted(() => {
    const id = Number(route.params.id);
    filmeStore.fetchFilmeId(id);
});

</script>

<template>
    <NavComponent
        @home-click="goHomePage()"
        @filmes-click="goFilmesPage()"
        @series-click="goSeriesPage()"
        @fav-click="goFavoritosPage()" />
    <main class="container my-4">
        <h1 class="text-center mb-4">
            Detalhes do Filme
        </h1>
        <div v-if="filmeStore.loading" class="d-flex justify-content-center">
            <LoadComponent />
        </div>
        <div v-else>
            <div class="row">
                <img
                    :src="'https://image.tmdb.org/t/p/w500' + filmeStore.filme.backdrop_path"
                    class="img-fluid rounded shadow-sm mb-md-0"
                    alt="Poster do filme">
            </div>
            <div class="col-md-8">
                <h2 class="text-primary">
                    {{ filmeStore.filme.title }}
                </h2>
                <p class="text-muted">
                    <strong>
                        Data de lançamento: {{ filmeStore.filme.release_date }}
                    </strong>
                </p>
                <p class="text-muted">
                    {{ filmeStore.filme.overview }}
                </p>
                <div class="d-flex flex-column flex-md-row justify-content-start mt-3">
                    <button
                        v-if="!filmeStore.isFavorito(filmeStore.filme)"
                        @click="favoritarFilme(filmeStore.filme)"
                        class="btn btn-outline-primary mb-2 me-md-2 mb-md-0"
                        type="button">
                            Favoritar
                    </button>
                    <button
                        v-else
                        @click="desfavoritarFilme(filmeStore.filme)"
                        class="btn btn-outline-secondary mb-2 me-md-2 mb-2 mb-md-0"
                        type="button">
                            Desfavoritar
                    </button>
                    <button
                        @click="assistirTrailer()"
                        class="btn btn-outline-success"
                        :disabled="!filmeStore.filme.trailer_link" type="button">
                            Assistir Trailer
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>