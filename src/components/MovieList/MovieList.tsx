import React from 'react';
import { Movie } from '../../types/Movie';
import MovieItem from '../MovieItem/MovieItem';
import './MovieList.scss';

type MovieListProps = {
  movies: Movie[];
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className="movies-list">
      {movies.map((movie) => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  );
};

export default MovieList;
