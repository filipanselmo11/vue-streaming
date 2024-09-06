<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useSerieStore } from '../../../stores/seriesStore';
import { onMounted } from 'vue';
import NavComponent from '../../../components/NavComponent.vue';
import LoadComponent from '../../../components/LoadComponent.vue';

const route = useRoute();
const router = useRouter();
const serieStore = useSerieStore();

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
    if (serieStore.serie.trailer_link) {
        window.open(serieStore.serie.trailer_link, '_blank');
    } else {
        console.error('Trailer não disponível');
    }
};

onMounted(() => {
    const id = Number(route.params.id);
    serieStore.fetchSerieId(id);
});

</script>

<template>
    <NavComponent
        @home-click="goHomePage()"
        @filmes-click="goFilmesPage()"
        @series-click="goSeriesPage()"
        @fav-click="goFavoritosPage()"/>
    <main class="container my-4">
        <h1 class="text-center mb-4">
            Detalhes da Série
        </h1>
        <div v-if="serieStore.loading" class="d-flex justify-content-center">
            <LoadComponent/>
        </div>
        <div v-else>
            <div class="row">
                <img
                    :src="'https://image.tmdb.org/t/p/w500' + serieStore.serie.backdrop_path"
                    class="img-fluid rounded shadow-sm"
                    alt="Poster da Serie"
                />
            </div>
            <div class="col-md-8">
                <h2 class="text-primary">
                    {{  serieStore.serie.name }}
                </h2>
                <p class="text-muted">
                    <strong>
                        Data de lançamento: {{ serieStore.serie?.first_air_date }}
                    </strong>
                </p>
                <p class="text-muted">
                    {{ serieStore.serie.overview }}
                </p>
                <div class="d-flex justify-content-start mt-3">
                    <button
                        class="btn btn-outline-primary me-2"
                        type="button">
                        Favoritar Série
                    </button>
                    <button
                        @click="assistirTrailer()"
                        class="btn btn-outline-success"
                        :disabled="!serieStore.serie.trailer_link"
                        type="button">
                            Assitir Trailer
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>