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
        filme: {
            id: 0,
            backdrop_path: '',
            release_date: '',
            title: '',
            overview: '',
            trailer_link: null as string | null
        },
        favoritos: [] as Array<{
            id: number,
            poster_path: string,
            release_date: string,
            title: string
        }>,
        currentPage: 1,
        totalPages: 1,
        loading: true,
        favoritado: true,
    }),
    actions: {
        async fetchFilmes(): Promise<void> {
            this.loading = true;
            try {
                const response = await api.get('/movie/popular');
                this.filmes = response.data.results;
            } catch(error) {
                console.error('Erro ao carregar os filmes ', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchFilmeId(id: number): Promise<void> {
            this.loading = true;
            try {
                const response = await api.get(`/movie/${id}`);
                this.filme = response.data;
                const trailerResponse = await api.get(`/movie/${id}/videos`);
                const trailer = trailerResponse.data.results.find((video: any) => video.type === 'Trailer' && video.site === 'Youtube');
                if (trailer) {
                    this.filme.trailer_link = `https://www.youtube.com/watch?v=${trailer.key}`;
                } else {
                    this.filme.trailer_link = null;
                }
            } catch(error) {
                console.error('Erro ao carregar filme por id', error);
            } finally {
                this.loading = false;
            }
        },

        favoritarFilme(filme: any) {
            const index = this.favoritos.findIndex(f => f.id === filme.id);
            if (index === -1) {
                this.favoritos.push(filme);
                this.favoritado = true;
                console.log('Filme adicionado aos favoritos ', filme);
            }
        },

        desfavoritarFilme(filme: any) {
            const index = this.favoritos.findIndex(f => f.id === filme.id);
            if (index > -1) {
                this.favoritos.splice(index, 1);
                this.favoritado = false;
                console.log('Filme removido dos favoritos ', filme);
            }
        },

        isFavorito(filme: any) {
            return this.favoritos.some(f => f.id === filme.id);
        }
    }
});