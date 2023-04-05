import { useState } from 'react';
import axios from 'axios';

import { Movie } from '../types/Movie';
import { useFetchMovies } from '../types/useFetchMovies';

const apiKey = '3f4500495f42846a3bc4ece4dad1244b';

const useFetchingMovies = (): useFetchMovies => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const fetchMovies = async (searchParam?: string, page?: number) => {
    try {
      setLoading(true);

      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: apiKey,
          query: searchParam || 'return',
          page: page || 1,
        },
      });

      const result = await response.data.results;

      const moviesWithGenres = await getMoviesWithGenres(result);

      setMovies(moviesWithGenres);
      setPage(response.data.page);
      setTotalPage(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`${error} - error`);
    }
  };

  const handlePageUp = (searhParam: string, page: number) => {
    setPage(page);
    fetchMovies(searhParam, page);
  };

  return {
    movies,
    error,
    loading,
    page,
    totalPage,
    handlePageUp,
    fetchMovies,
  };
};

const getMoviesWithGenres = async (data: Movie[]): Promise<Movie[]> => {
  const moviesWithGenres = await Promise.all(
    data.map(async (el) => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${el.id}`, {
        params: {
          api_key: apiKey,
        },
      });
      const genres = response.data.genres;
      return {
        ...el,
        genres,
      };
    })
  );

  return moviesWithGenres;
};

export default useFetchingMovies;
