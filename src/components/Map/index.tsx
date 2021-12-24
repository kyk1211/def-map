/* global kakao */
import React, { useEffect, useRef } from 'react';
import { defData } from '../../types/types';
import grayMarker from '../../img/gray-marker.png';
import redMarker from '../../img/red-marker.png';
import yellowMarker from '../../img/yellow-marker.png';
import greenMarker from '../../img/green-marker.png';
import './styles.scss';

interface Props {
  data: defData[];
}

const { kakao } = window;

function Map({ data }: Props) {
  const ref = useRef(null);
  const markers: any[] = [];

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(35.85133, 127.734086),
      level: 13,
    };
    const map = new kakao.maps.Map(ref.current, options);
    data.forEach((item) => {
      const coords = new kakao.maps.LatLng(item.lat, item.lng);
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
      const marker = new kakao.maps.Marker({
        map: map,
        position: coords,
        clickable: true,
        image: new kakao.maps.MarkerImage(
          markerImg,
          new kakao.maps.Size(35, 35)
        ),
      });
      // 커스텀 인포윈도우 생성
      // let content =
      //   '<div class="info">' +
      //   `    <div class='head'>` +
      //   '       <div class="title">' +
      //   `           ${item.name}` +
      //   '       </div>' +
      //   `       <button class="closeBtn">&times;</button>` +
      //   '    </div>' +
      //   '    <div class="body">' +
      //   '        <div class="desc">' +
      //   `          <div class="addr">${item.addr}</div>` +
      //   `          <div class="inven">재고: ${item.inventory}L</div>` +
      //   `          <div class="price">가격: ${item.price}원/L</div>` +
      //   `          <div>전화번호: ${item.tel}</div>` +
      //   `          <div>수정일자: ${item.regDt}</div>` +
      //   '        </div>' +
      //   '    </div>' +
      //   '</div>';

      const overlay = new kakao.maps.CustomOverlay({
        clickable: true,
        position: coords,
        yAnchor: 1.25,
      });

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
      overlay.setContent(info);
      markers.push([marker, overlay]);
      kakao.maps.event.addListener(marker, 'click', () => {
        for (const i of markers) {
          i[1].setMap(null);
        }
        overlay.setMap(map);
      });
    });
  }, [data]);

  return <div className="MapContainer" ref={ref}></div>;
}

export default Map;
