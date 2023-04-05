import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import SearchTab from './components/SearchTab/SearchTab';
import './App.scss';

function App() {
  const moviesLists: TabsProps['items'] = [
    {
      key: '1',
      label: 'Search',
      children: <SearchTab />
    },
    {
      key: '2',
      label: 'Rated',
      children: 'Rated movies will here'
    }
  ]
  return (
    <div className="App">
      <Tabs defaultActiveKey='1' items={moviesLists} centered={true}/>
    </div>
  );
}

export default App;
