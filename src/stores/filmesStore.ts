import { defineStore } from "pinia";
import { api } from "../services/api";

export const useFilmeStore = defineStore('filmeStore', {
    state: () => ({
        filmes: [] as Array<{
            id: number,
            poster_path: string,
            release_date: string,
            title: string
        }>,
        currentPage: 1,
        totalPages: 1,
        loading: true,
    }),
    actions: {
        async fetchFilmes(): Promise<void> {
            this.loading = true;
            try {
                const response = await api.get('/movie/popular');
                console.log('RESPONSE ', response.data);
                this.filmes = response.data.results;
            } catch(error) {
                console.error('Erro ao carregar os filmes ', error);
            } finally {
                this.loading = false;
            }
        }
    }
});