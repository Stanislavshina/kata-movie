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

      const token : string | null = localStorage.getItem("token");
      const tokenString = token ? token : null; 
      let ratedMovies: Movie[];

      if(tokenString) {
        ratedMovies = await getRatedMovies(tokenString);
      }
      
    
      
      setMovies(moviesWithGenres);
      setPage(response.data.page);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      setError(`${error} - error`);
    } finally {
      setLoading(false);
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
      const { genres } = response.data;
      return {
        ...el,
        genres,
      };
    })
  );

  return moviesWithGenres;
};

export const postRating = async (id: number, rate: number, token: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      value: rate,
    }),
  })
  console.log(response);
  
};

export const getRatedMovies = async (token: string) => {
  const response = await axios.get(`https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc`);
  const results = await response.data.results;
  return await getMoviesWithGenres(results);
} 

export const getGuestSessions = async () => {
  const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new', {
    params: {
      api_key: apiKey
    }
  });
  const token = await response.data.guest_session_id;
  localStorage.setItem('token', token)
} 

export default useFetchingMovies;




