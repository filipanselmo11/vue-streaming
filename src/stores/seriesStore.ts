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
        favoritos: [] as Array<{
            id: number,
            poster_path: string,
            first_air_date: string,
            name: string
        }>,
        currentPage: 1,
        totalPages: 1,
        loading: true,
        favoritado: true,
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
                console.log('SERIE:', this.serie);
                
                const trailerResponse = await api.get(`/tv/${id}/videos`);
                console.log('Trailer Response:', trailerResponse.data);
                
                const trailer = trailerResponse.data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    this.serie.trailer_link = `https://www.youtube.com/watch?v=${trailer.key}`;
                } else {
                    this.serie.trailer_link = null;
                }
            } catch (error) {
                console.error('Erro ao carregar série', error);
            } finally {
                this.loading = false;
            }
        },

        favoritarSerie(serie: any) {
            const index = this.favoritos.findIndex(s => s.id === serie.id);
            if (index === -1) {
                this.favoritos.push(serie);
                this.favoritado = true;
                console.log('Serie adicionada aos favoritos ', serie);
            }
        },

        desfavoritarSerie(serie: any) {
            const index = this.favoritos.findIndex(s => s.id === serie.id);
            if (index > -1) {
                this.favoritos.splice(index, 1);
                this.favoritado = false;
                console.log('Serie removida dos favoritos ', serie);
            }
        },

        isFavorito(serie: any) {
            return this.favoritos.some(s => s.id === serie.id);
        }
    }
});