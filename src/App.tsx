import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Map from "./components/Map";
import { defData } from "./types/types";
import DataTable from "./components/DataTable";

declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const [defData, setDefData] = useState<defData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(800);
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
        <div className="App">
          <Map data={defData} />
          <DataTable data={defData} />
        </div>
      )}
    </>
  );
}

export default App;
