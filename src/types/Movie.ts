import { Genres } from './Genres';
export type Movie = {
  genres: Genres[];
  genre_ids: string;
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  release_date: string;
};
