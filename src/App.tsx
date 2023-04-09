import { getGenres, getMovies, getRatedMovies, setGuestSession, postRate, deleteRating } from "./api/apiServices";
import { useEffect, useMemo, useState } from 'react';
import { Genres } from "./types/Genres";
import {Online, Offline} from "react-detect-offline";
import { Movie } from "./types/Movie";
import { Provider } from "./context/context";
import { Tabs, Input, Alert, Spin, Pagination } from "antd";
import type { TabsProps } from 'antd';
import _ from 'lodash';
import MovieList from "./components/MovieList/MovieList";

import './App.scss';

function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalPagesRate, setTotalPagesRate] = useState<number>(0);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  

  const token:string | null = localStorage.getItem('token');
  const tokenStr = token ? token : '';


  const getMoviesBySearch = async () => {
    try {
      setLoading(true);
      const response = await getMovies(searchQuery, page);
      const resultMovies = await response.data.results;
      const currentPage = await response.data.page;
      const totalPage = await response.data.total_pages;
      setMovies(resultMovies);
      setPage(currentPage);
      setTotalPages(totalPage);
    } catch (error) {
      setError(`${error} - error`)
    } finally {
      setLoading(false)
    }
  };
  const getMoviesByRate = async (p: number) => {
    try {
      setLoading(true);
      const response = await getRatedMovies(tokenStr, p);
      const resultMovies = await response.data.results;
      const totalPage = await response.data.total_pages;
      setRatedMovies(resultMovies);
      setTotalPagesRate(totalPage);
    } catch (error) {
      setError(`${error} - error`)
    } finally {
      setLoading(false)
    }
  };
  const startApp =async () => {
    if(!token)setGuestSession();
    const getGenresList = await getGenres().then(res=>res.data.genres)
    setGenres(getGenresList)
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setSearchQuery(value);
  };
  const onTabsChange = (active: string) => {
    active === "2" ? getMoviesByRate(1)
     : getMoviesBySearch();
  };
  const onRateMovies = async (id: number, value: number) => {
    if(value > 0) {
      await postRate(id, value, tokenStr);
      localStorage.setItem(id.toString(), value.toString());
      const raitedMoviess= await getRatedMovies(tokenStr).then(res=>res.data.results);
      setRatedMovies(raitedMoviess)
      
    } else {
       await deleteRating(id, tokenStr);
      localStorage.removeItem(id.toString());
      const raitedMoviess= await getRatedMovies(tokenStr).then(res=>res.data.results);
      setRatedMovies(raitedMoviess)
    }
  }
  

  const debounsedGetMovies = useMemo(() =>  _.debounce(onInputChange, 500), []);


  useEffect(()=>{
    startApp()
    getMoviesBySearch()
  },[])
  
  useEffect(()=>{
    getMoviesBySearch();
  },[searchQuery, page])

  const displayError = error ? <Alert message='something is wrong' /> : null;
  const load = loading ? <Spin size="large"/> : null;
  const moviesList = movies.length ? <MovieList movies={movies} onRate={onRateMovies}/> : null;
  
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `search`,
      children: (
        <div className="container">
        <Input placeholder="Search" onChange={debounsedGetMovies} />
        {displayError}
        {load}
        {moviesList}
        </div>
      ),
    },
    {
      key: '2',
      label: `ratedMovies`,
      children: (
        <div className="container">
        <MovieList movies={ratedMovies} onRate={onRateMovies}/>
      </div>
      ),
    },
  ]

  return (
      <div className="App">
        <Provider value={genres}>
          <Online>
          <Tabs defaultActiveKey="1" items={items}  onChange={onTabsChange} centered/>
          </Online>
          <Offline>
            <Alert message="check ur internet-connection" type="error"/>
          </Offline>
        </Provider>
      </div>
  );
}
export default App;

