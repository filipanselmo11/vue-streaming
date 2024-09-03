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
        loading: true,
    }),
    actions: {
        async fetchFilmes(): Promise<void> {
            this.loading = true;
            await api.get('/movie/popular').then(res => {
                console.log('FILMES ', res.data.results);
                this.filmes = res.data.results;
            }).catch(error => console.error('Error ao carregar filmes ', error));
            this.loading = false;
        }
    }
});