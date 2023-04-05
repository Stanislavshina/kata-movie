import React, { useEffect, useState } from 'react';
import { Input, Alert, Spin } from 'antd';
import _ from 'lodash';

import useFetchingMovies from '../../hooks/useFetchMovies';
import './SearchTab.scss';
import MovieList from '../MovieList/MovieList';

const SearchTab: React.FC = () => {
  const { movies, error, loading, fetchMovies } = useFetchingMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedFetch = _.debounce(fetchMovies, 500);

  useEffect(() => {
    debouncedFetch(searchQuery);
  }, [searchQuery]);

  const handleFetching = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <div className="container">
      <Input placeholder="Search" onChange={handleFetching} value={searchQuery} />
      {loading ? (
        <div className="spin-container">
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert message={`${error} нет сети`} type="error" />
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default SearchTab;
