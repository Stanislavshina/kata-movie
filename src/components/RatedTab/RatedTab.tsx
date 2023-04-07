
import MovieList from '../MovieList/MovieList';
import { Movie } from '../../types/Movie';

type RatedTabProps = {
  ratedMovies: Movie[],
}

const RatedTab: React.FC<RatedTabProps> = ({ ratedMovies}) => {
  return (
    <div className="container">
        <MovieList movies={ratedMovies} />
    </div>
  );
};

export default RatedTab;