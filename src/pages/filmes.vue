<script lang="ts" setup>
import { onMounted } from 'vue';
import { useFilmeStore } from '../stores/filmesStore';
import CardComponent from '../components/CardComponent.vue';


const filmeStore = useFilmeStore();

onMounted(() => {
    filmeStore.fetchFilmes();
});

</script>

<template>
    <main class="container mt-5">
        <h2 class="h2 mb-4">
            Filmes:
        </h2>
        <div class="row row-cols-md-4 row-cols-sm-2 row-cols-1 g-3">
            <div v-for="filme in filmeStore.filmes" :key="filme.id" class="col">
                <CardComponent :card="filme" />
            </div>
        </div>
    </main>
</template>