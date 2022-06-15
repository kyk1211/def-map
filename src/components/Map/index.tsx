/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import grayMarker from '../../img/gray-marker.png';
import redMarker from '../../img/red-marker.png';
import yellowMarker from '../../img/yellow-marker.png';
import greenMarker from '../../img/green-marker.png';
import './styles.scss';
import { useSelector } from 'react-redux';
import { selectData } from '../../dataSlice';
import { useAppDispatch } from '../../hooks/useAppdispatch';
import { addMarker, setMap } from '../../mapSlice';

const { kakao } = window;

function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const defData = useSelector(selectData);
  const dispatch = useAppDispatch();

  function createMarkerColor(color: string): string {
    switch (color) {
      case 'yellow':
        return yellowMarker;
      case 'red':
        return redMarker;
      case 'gray':
        return grayMarker;
      default:
        return greenMarker;
    }
  }

  function overlayContent(item: defData, overlay: any): HTMLDivElement {
    let info = document.createElement('div');
    info.className = 'info';

    let head = document.createElement('div');
    head.className = 'head';

    let title = document.createElement('div');
    title.className = 'title';
    title.textContent = item.name;

    let closeBtn = document.createElement('button');
    closeBtn.className = 'closeBtn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => overlay.setMap(null);

    let body = document.createElement('div');
    body.className = 'body';

    let desc = document.createElement('div');
    desc.className = 'desc';

    let addr = document.createElement('div');
    addr.className = 'addr';
    addr.textContent = item.addr;

    let inven = document.createElement('div');
    inven.className = 'inven';
    inven.textContent = '재고: ' + item.inventory;

    let price = document.createElement('div');
    price.className = 'price';
    price.textContent = '가격: ' + item.price;

    let telNum = document.createElement('div');
    telNum.className = 'tel';
    telNum.textContent = '연락처: ' + item.tel;

    let regDate = document.createElement('div');
    regDate.className = 'regDt';
    regDate.textContent = '수정일자: ' + item.regDt;

    head.appendChild(title);
    head.appendChild(closeBtn);
    body.appendChild(desc);
    desc.appendChild(addr);
    desc.appendChild(inven);
    desc.appendChild(price);
    desc.appendChild(telNum);
    desc.appendChild(regDate);
    info.appendChild(head);
    info.appendChild(body);
    return info;
  }

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    const map = new kakao.maps.Map(containerRef.current, options);
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    setKakaoMap(map);
    dispatch(setMap(map));
  }, [containerRef]);

  useEffect(() => {
    if (kakaoMap === null) return;
    defData.forEach((item) => {
      const coords = new kakao.maps.LatLng(item.lat, item.lng);
      const color = item.color.toLowerCase();
      let markerImg = createMarkerColor(color);
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: coords,
        clickable: true,
        image: new kakao.maps.MarkerImage(markerImg, new kakao.maps.Size(35, 35)),
      });

      const overlay = new kakao.maps.CustomOverlay({
        clickable: true,
        position: coords,
        yAnchor: 1,
      });

      let info = overlayContent(item, overlay);
      overlay.setContent(info);

      setMarkers((prev) => [...prev, [marker, overlay]]);
      dispatch(addMarker([marker, overlay, { code: item.code, pos: coords }]));
      kakao.maps.event.addListener(marker, 'click', () => {
        setMarkers((prev) => {
          for (const i of prev) {
            i[1].setMap(null);
          }
          return [...prev];
        });
        overlay.setMap(kakaoMap);
      });
    });

    return () => {
      setMarkers((prev) => {
        for (const i of prev) {
          i[0].setMap(null);
        }
        return [];
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defData, kakaoMap]);

  return <div className="MapContainer" ref={containerRef}></div>;
}

export default Map;
