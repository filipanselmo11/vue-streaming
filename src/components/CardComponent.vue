<script lang="ts" setup>

interface CardProps {
    id: number;
    poster_path: string;
    release_date: string;
    title: string;
}

const card = defineProps<{ card: CardProps}>();

const imgUrl = `https://image.tmdb.org/t/p/w500${card.card.poster_path}`;

</script>

<template>
    <div class="card">
        <img :src="imgUrl" class="card-img-top" :alt="card.card.title">
        <div class="card-body">
            <h5 class="card-title">
                {{ card.card.title }}
            </h5>
            <p class="card-text">
                {{ card.card.release_date }}
            </p>
            <button class="btn btn-primary w-100 w-sm-auto" type="button">
                Ver detalhes
            </button>
        </div>
    </div>
</template>