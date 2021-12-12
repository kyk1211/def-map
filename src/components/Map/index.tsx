/* global kakao */
import React, { useEffect } from "react";
import { defData } from "../../types/types";

interface Props {
  data: defData[];
}

function Map({ data }: Props) {
  useEffect(() => {
    let container = document.getElementById("map");

    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };

    let map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
  }, []);

  return (
    <div
      className="MapContainer"
      id="map"
      style={{ width: "500px", height: "400px" }}
    ></div>
  );
}

export default Map;
