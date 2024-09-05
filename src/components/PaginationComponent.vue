<script lang="ts" setup>

interface PaginationProps {
    movies?: any[];
    series?: any[];
    currentPage: number;
    totalPages: number;

}

const pagination = defineProps<{ pagination: PaginationProps}>();

const emit = defineEmits<{
    (e: 'changePage', page: number): void;
}>();

const emitChangePage = (page: number) => {
    if (page >= 1 && page <= pagination.pagination.totalPages) {
        emit('changePage', page);
    }
}


</script>

<template>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.pagination.currentPage === 1}">
                <a class="page-link" href="#" @click.prevent="emitChangePage(pagination.pagination.currentPage - 1)">
                    Anterior
                </a>
            </li>
            <li class="page-item" :class="{ active: page === pagination.pagination.currentPage}" v-for="page in pagination.pagination.totalPages" :key="page">
                <a class="page-link" href="#" @click.prevent="emitChangePage(page)">
                    {{ page }}
                </a>
            </li>
            <li class="page-item" :class="{ disabled: pagination.pagination.currentPage === pagination.pagination.totalPages }">
                <a class="page-link" href="#" @click.prevent="emitChangePage(pagination.pagination.currentPage + 1)">
                    Próximo
                </a>
            </li>
        </ul>
    </nav>
</template>