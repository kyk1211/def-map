/* global kakao */
import React, { useEffect, useRef } from 'react';
import { defData } from '../../types/types';
import grayMarker from '../../img/gray-marker.png';
import redMarker from '../../img/red-marker.png';
import yellowMarker from '../../img/yellow-marker.png';
import greenMarker from '../../img/green-marker.png';

interface Props {
  data: defData[];
}

function Map({ data }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    const map = new window.kakao.maps.Map(ref.current, options);

    data.forEach((item) => {
      const coords = new window.kakao.maps.LatLng(item.lat, item.lng);
      const color = item.color.toLowerCase();
      let markerImg;
      switch (color) {
        case 'yellow':
          markerImg = yellowMarker;
          break;
        case 'red':
          markerImg = redMarker;
          break;
        case 'gray':
          markerImg = grayMarker;
          break;
        default:
          markerImg = greenMarker;
      }
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: coords,
        clickable: true,
        image: new window.kakao.maps.MarkerImage(
          markerImg,
          new window.kakao.maps.Size(35, 35)
        ),
      });
    });
  }, [data]);

  return (
    <div
      className="MapContainer"
      ref={ref}
      style={{ width: '700px', height: '500px' }}
    ></div>
  );
}

export default Map;
