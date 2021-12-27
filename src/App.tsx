import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import Map from './components/Map';
import DataTable from './components/DataTable';
import Header from './components/Header';
import { useAppDispatch } from './hooks/useAppdispatch';
import { dataSet } from './dataSlice';
import ReactLoading from 'react-loading';

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const page = 0;
  const perPage = 100000;
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
        dispatch(dataSet(res.data.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [url]);

  return (
    <>
      <Header />
      <div className="content">
        {isLoading ? (
          <div className="loading">
            <ReactLoading type="spin" color="blue" />
          </div>
        ) : (
          <>
            <Map />
            <DataTable />
          </>
        )}
      </div>
    </>
  );
}

export default App;
