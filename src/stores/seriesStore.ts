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
        serie: {
            id: 0,
            backdrop_path: '',
            first_air_date: '',
            name: '',
            overview: '',
            trailer_link: null as string | null
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

        async fetchSerieId(id: number): Promise<void> {
            this.loading = true;
            try {
                const response = await api.get(`/tv/${id}`);
                this.serie = response.data;
                const trailerResponse = await api.get(`/tv/${id}/videos`);
                const trailer = trailerResponse.data.results.find((video: any) => video.type === 'Trailer' && video.site === 'Youtube');
                if (trailer) {
                    this.serie.trailer_link = `https://www.youtube.com/watch?v=${trailer.key}`;
                } else {
                    this.serie.trailer_link = null;
                }
            } catch(error) {
                console.error('Erro ao carregar série ', error);
            } finally {
                this.loading = false;
            }
        }
    }
});