import axios from 'axios';

// A chave deve ser gerada no painel do themoviedb.org
const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    Accept: 'application/json',
  },
  params: {
    api_key: TMDB_API_KEY,
    language: 'en',
  },
});
