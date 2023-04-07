import { useEffect} from 'react';
import { Tabs } from 'antd';
import { throttle } from 'lodash';
import type { TabsProps } from 'antd';

import SearchTab from './components/SearchTab/SearchTab';
import './App.scss';
import  useFetchingMovies, { getGuestSessions } from './api/apiServices';
import RatedTab from './components/RatedTab/RatedTab';


function App() {
  const {ratedMovies, getRatedMovies} = useFetchingMovies()
  const token: string | null = localStorage.getItem('token');
  const tokenStr = token ? token : ''
  const throttledGetRatedMovies = throttle(getRatedMovies, 1000);
  useEffect(()=>{
    if (!token) {
      getGuestSessions();
    }
  }, [])

  const onTabsChange = (active:string) => {
    if(active==="2") {
      throttledGetRatedMovies(tokenStr)   
    }
  }

  console.log(ratedMovies);
  

  useEffect(()=>{
    if (!token) {
      getGuestSessions();
    }
  }, [])
  const moviesLists: TabsProps['items'] = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedTab ratedMovies={ratedMovies}/>
    },
  ];
  return (
    <div className="App">
      <Tabs defaultActiveKey="1" items={moviesLists} centered={true} onChange={onTabsChange}/>
    </div>
  );
}

export default App;
