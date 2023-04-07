import React, { useEffect, useState } from 'react';
import useFetchingMovies from '../../api/apiServices';

import { Input, Alert, Spin, Pagination } from 'antd';
import _ from 'lodash';

import './SearchTab.scss';
import MovieList from '../MovieList/MovieList';

const SearchTab: React.FC = () => {
  const { movies, error, loading, page, totalPage, handlePageUp, fetchMovies} = useFetchingMovies();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedFetch = _.debounce(fetchMovies, 500);



  useEffect(() => {
    debouncedFetch(searchQuery);
  }, []);

  const handleFetching = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
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
      <Pagination
        current={page}
        showSizeChanger={false}
        total={Number(totalPage * 10)}
        onChange={(pageId) => handlePageUp(searchQuery, pageId)}
      />
    </div>
  );
};

export default SearchTab;
