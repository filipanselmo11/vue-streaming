<script lang="ts" setup>

interface CardProps {
    id: number;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    title?: string;
    name?: string;
}

const card = defineProps<{ card: CardProps }>();

const imgUrl = `https://image.tmdb.org/t/p/w500${card.card.poster_path}`;

const emit = defineEmits<{
    (e: 'clickButton'): void;
}>();

const emitClickButton = () => {
    emit('clickButton');
};

</script>

<template>
    <div class="card d-flex flex-column h-100">
        <img :src="imgUrl" class="card-img-top" :alt="card.card.title || card.card.name">
        <div class="card-body bg-dark text-white d-flex flex-column justify-content-between">
            <span>
                {{ card.card.title || card.card.name }}
            </span>
            <p class="card-text">
                {{ card.card.release_date || card.card.first_air_date }}
            </p>
            <button
                class="btn btn-primary w-100 w-sm-auto"
                type="button"
                @click.prevent="emitClickButton()">
                Mais informações
            </button>
        </div>
    </div>
</template>