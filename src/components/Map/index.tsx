/* global kakao */
import React, { useEffect, useRef } from "react";
import { defData } from "../../types/types";

interface Props {
  data: defData[];
}

function Map({ data }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    let options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    let map = new window.kakao.maps.Map(ref.current, options);
  }, []);

  return (
    <div
      className="MapContainer"
      ref={ref}
      style={{ width: "500px", height: "400px" }}
    ></div>
  );
}

export default Map;
