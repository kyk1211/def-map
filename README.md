# 요소수 정보 제공 웹 어플리케이션

## 설명
공공데이터 api와 kakao map api를 활용한 요소수 재고 정보 지도 서비스입니다.

## 배포 주소

https://kyk1211.github.io/def-map/

## 사용 기술
* CRA
* typescript
* scss
* redux toolkit

## 기능 소개

### Header

* logo를 클릭하여 첫 화면으로 이동할 수 있습니다.
* github icon을 클릭하여 github repository로 이동할 수 있습니다.
* input 창에서 주소를 검색할 수 있습니다.
* 초기화 버튼으로 검색결과를 초기화할 수 있습니다.

### Map

* kakao map api를 이용하여 요소수 재고 데이터를 바탕으로 지도와 마커를 보여줍니다.
* 마커를 클릭시 정보를 보여줍니다.
* 요소수 재고량에 따라 마커의 색이 다릅니다.

### Table

* 공공데이터 api에서 가져온 요소수 재고 데이터를 보여줍니다.
* 재고량, 가격, 수정일자를 클릭하여 정렬할 수 있습니다.
* pagination을 구현하여 page 이동이 가능합니다.
