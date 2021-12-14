/* global kakao */
import React, { useEffect, useRef } from 'react';
import { defData } from '../../types/types';

interface Props {
  data: defData[];
  searchedData: defData[];
}

function Map({ data, searchedData }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    const map = new window.kakao.maps.Map(ref.current, options);
    if (searchedData) {
      searchedData.forEach((item) => {
        const coords = new window.kakao.maps.LatLng(item.lat, item.lng);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
          clickable: true,
        });
      });
    } else {
      data.forEach((item) => {
        const coords = new window.kakao.maps.LatLng(item.lat, item.lng);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
          clickable: true,
        });
      });
    }
  }, []);

  return (
    <div
      className="MapContainer"
      ref={ref}
      style={{ width: '700px', height: '500px' }}
    ></div>
  );
}

export default Map;
