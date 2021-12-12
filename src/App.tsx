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
  const [perPage, setPerPage] = useState<number>(10);
  const apiKey = process.env.REACT_APP_PUBINFO_API_KEY;
  const apiAddr = "https://api.odcloud.kr/api/uws/v1/inventory";
  const query = `?page=${page}&perPage=${perPage}&returnType=JSON&serviceKey=${apiKey}`;
  const url = apiAddr + query;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setDefData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <div className="App">
      <Map data={defData} />
      <DataTable
        data={defData}
        page={page}
        setPage={setPage}
        perPage={perPage}
      />
    </div>
  );
}

export default App;
