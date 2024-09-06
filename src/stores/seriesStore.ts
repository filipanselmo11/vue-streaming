import { defineStore } from "pinia";
import { api } from "../services/api";

export const useSerieStore = defineStore('series', {
    state:() => ({
        series: [] as Array<{
            id: number,
            poster_path: string,
            first_air_date: string,
            name: string
        }>,
        serie: null as null | {
            id: number,
            poster_path: string,
            first_air_date: string,
            name: string
        },
        currentPage: 1,
        totalPages: 1,
        loading: true,
    }),
    actions: {
        async fetchSeries(): Promise<void> {
            this.loading = true;
            try {
                const response = await api.get('/tv/popular');
                this.series = response.data.results;
            } catch(error) {
                console.error('Falha ao carregar as séries ', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchSerieId(id: number) {
            this.loading = true;
            try {
                const response = await api.get(`/tv/${id}`);
                console.log('SERIE ', response.data);
                this.serie = response.data;
            } catch(error) {
                console.error('Erro ao carregar série ', error);
            } finally {
                this.loading = false;
            }
        }
    }
});