<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFilmeStore } from '../../stores/filmesStore';
import { useSerieStore } from '../../stores/seriesStore';
import LoadComponent from '../../components/LoadComponent.vue';
import NavComponent from '../../components/NavComponent.vue';

const route = useRoute();
const router = useRouter();
const filmeStore = useFilmeStore();
const serieStore = useSerieStore();

const goHomePage = () => {
    router.push({ name: 'Home' });
};

const goFilmesPage = () => {
    router.push({ name: 'Filmes' })
}

const goSeriesPage = () => {
    router.push({ name: 'Series'});
};

const assistirTrailer = () => {
    if(filmeStore.filme.trailer_link) {
        window.open(filmeStore.filme.trailer_link, '_blank');
    } else {
        console.error('Trailer não disponível');
    }
};

onMounted(() => {
    const id = route.params.id;
    const tipo = route.params.tipo;
    if (tipo === 'filme') {
        filmeStore.fetchFilmeId(Number(id));
    } else if (tipo === 'serie') {
        serieStore.fetchSerieId(Number(id));
    }
    
});


</script>

<template>
    <NavComponent @home-clik="goHomePage" @filmes-click="goFilmesPage" @series-click="goSeriesPage"/>
    <main class="container my-4">
        <h1 class="text-center mb-4">
            Detalhes do Filme ou Série
        </h1>
        <div v-if="filmeStore.loading || serieStore.loading" class="d-flex justify-content-center">
            <LoadComponent />
        </div>
        <div v-else>
            <template v-if="filmeStore.filme">
                <div class="row">
                    <img
                        :src="'https://image.tmdb.org/t/p/w500' + filmeStore.filme.backdrop_path"
                        class="img-fluid rounded shadow-sm"
                        alt="Poster do filme"
                    >
                </div>
                <div class="col-md-8">
                    <h2 class="text-primary">
                        {{ filmeStore.filme.title }}
                    </h2>
                    <p class="text-muted">
                        <strong>Data de lançamento:</strong> {{ filmeStore.filme.release_date }}
                    </p>
                    <p class="text-muted">
                        {{ filmeStore.filme.overview }}
                    </p>
                    <div class="d-flex justify-content-start mt-3">
                        <!-- @click="favoritarFilme" -->
                            <button  class="btn btn-outline-primary me-2">
                                Favoritar Filme
                            </button>

                            <button 
                                @click="assistirTrailer()"
                                class="btn btn-outline-success"
                                :disabled="!filmeStore.filme.trailer_link">
                                    Assistir Trailer
                            </button>
                    </div>
                </div>
            </template>
            <template v-else-if="serieStore.serie">
                <div class="row">
                    <div class="col-md-4 text-center mb-3">
                        <img
                            :src="'https://image.tmdb.org/t/p/w500' + serieStore.serie.poster_path"
                            class="img-fluid w-50 rounded"
                            alt="Poster da serie"
                        >
                    </div>
                </div>
                <div class="col-md-8">
                    <h2 class="text-primary">
                        {{ serieStore.serie.name }}
                    </h2>
                    <p class="text-muted">
                        <strong>Data de lançamento:</strong> {{ serieStore.serie.first_air_date }}
                    </p>
                    <p class="text-muted">
                        
                    </p>
                </div>
            </template>
            <template v-else>
                <div class="alert alert-danger text-center">
                    <h1>
                        Filme ou Série não econtrado
                    </h1>
                </div>
            </template>
        </div>
    </main>
</template>