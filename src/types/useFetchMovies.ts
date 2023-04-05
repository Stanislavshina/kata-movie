import { Movie } from './Movie';

export type useFetchMovies = {
  movies: Movie[];
  error: string;
  loading: boolean;
  page: number;
  totalPage: number;
  handlePageUp: (searchParam: string, page: number) => void;
  fetchMovies: (searchParam?: string, page?: number) => void;
};
