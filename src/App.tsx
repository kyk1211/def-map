import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import Map from './components/Map';
import { defData } from './types/types';
import DataTable from './components/DataTable';
import Header from './components/Header';

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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [url]);

  useEffect(() => {
    const data = [];
    for (const item of defData) {
      if (item.addr.includes(search)) {
        data.push(item);
      }
    }
    setSearchedData(data);
  }, [defData, search]);

  return (
    <div className="project">
      <Header setSearch={setSearch} />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="content">
          <Map data={searchedData || defData} />
          <DataTable data={searchedData || defData} />
        </div>
      )}
    </div>
  );
}

export default App;
