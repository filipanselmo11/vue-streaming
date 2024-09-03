<script lang="ts" setup>
import { onMounted } from 'vue';
import { useFilmeStore } from '../stores/filmesStore';


const filmeStore = useFilmeStore();

onMounted(() => {
    filmeStore.fetchFilmes();
});

</script>

<template>
    <div class="text-center bg-primary">
        <h1 class="h1">
            Olá eu sou o Filmes page
        </h1>
    </div>
</template>