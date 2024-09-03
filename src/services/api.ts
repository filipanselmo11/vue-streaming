import axios from 'axios';

const apiKey = '4a2e4d0af961347cdfbcb02e4cfef3f2';

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: apiKey,
        language: 'pt-BR'
    },
});