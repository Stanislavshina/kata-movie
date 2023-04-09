import React from 'react';

import { Movie } from '../../types/Movie';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.scss';

type MovieListProps = {
  movies: Movie[];
  onRate: (id: number, value: number)=> void
};

const MovieList: React.FC<MovieListProps> = ({ movies, onRate }) => (
  <ul className="movies-list">
    {movies.map((movie) => (
      <MovieItem movie={movie} key={movie.id} onRate={onRate} />
    ))}
  </ul>
);

export default MovieList;
