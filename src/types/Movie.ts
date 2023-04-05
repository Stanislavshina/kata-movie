type Genres = { id: number; name: string };

export type Movie = {
  genres: Genres[];
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  poster_path: string;
  release_date: string;
};
