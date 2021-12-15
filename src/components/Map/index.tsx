/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import { defData } from '../../types/types';
import grayMarker from '../../img/gray-marker.png';
import redMarker from '../../img/red-marker.png';
import yellowMarker from '../../img/yellow-marker.png';
import greenMarker from '../../img/green-marker.png';
import './styles.css';

interface Props {
  data: defData[];
}

function Map({ data }: Props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        image: new window.kakao.maps.MarkerImage(
          markerImg,
          new window.kakao.maps.Size(35, 35)
        ),
      });
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: item.name,
        removable: true,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker);
      });
    });
  }, [data]);

  return <div className="MapContainer" ref={ref}></div>;
}

export default Map;
