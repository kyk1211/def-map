import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Map from "./components/Map";
import { defData } from "./types/types";
import DataTable from "./components/DataTable";
import SearchBar from './components/SearchBar';

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const [defData, setDefData] = useState<defData[]>([]);
  const [seach, setSearch] = useState('');
  const page = 0;
  const perPage = 800;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiKey = process.env.REACT_APP_PUBINFO_API_KEY;
  const apiAddr = "https://api.odcloud.kr/api/uws/v1/inventory";
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
      });
  }, [url]);

  return (
    <>
      {isLoading ? null : (
        <>
          <header>hi</header>
          <div className="App">
            <Map data={defData} />
            <div>
              <SearchBar setSearch={setSearch} />
              <DataTable data={defData} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
