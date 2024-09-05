<script lang="ts" setup>

defineEmits([
    'homeClick',
    'filmesClick',
    'seriesClick',
    'favClick',
]);

</script>

<template>
    <nav class="nav navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarVueStreaming"
                aria-controls="navbarVueStreaming"
                aria-label="Abrir menu de opções">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarVueStreaming">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active text-white" aria-current="page" @click="$emit('homeClick', $event)">
                            Início
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="$emit('filmesClick', $event)">
                            Filmes
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" @click="$emit('seriesClick', $event)">
                            Séries
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white">
                            Favoritos
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
.navbar-nav .nav-item .nav-link {
    margin-left: 15px !important;
}

.navbar-brand {
    margin-right: 20px !important;
}

a {
    cursor: pointer !important;
}
</style>