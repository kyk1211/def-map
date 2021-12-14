import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Map from './components/Map';
import { defData } from './types/types';
import DataTable from './components/DataTable';
import SearchBar from './components/SearchBar';

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const [defData, setDefData] = useState<defData[]>([]);
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState<defData[]>([]);
  const page = 0;
  const perPage = 800;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiKey = process.env.REACT_APP_PUBINFO_API_KEY;
  const apiAddr = 'https://api.odcloud.kr/api/uws/v1/inventory';
  const query = `?page=${page}&perPage=${perPage}&returnType=JSON&serviceKey=${apiKey}`;
  const url = apiAddr + query;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setDefData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    const data = [];
    for (const item of defData) {
      if (item.addr.includes(search)) {
        data.push(item);
      }
    }
    setSearchedData(data);
  }, [search]);

  return (
    <>
      {isLoading ? null : (
        <>
          <header>hi</header>
          <div className="App">
            <Map data={defData} searchedData={searchedData} />
            <div>
              <SearchBar setSearch={setSearch} />
              <DataTable data={defData} searchedData={searchedData} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
