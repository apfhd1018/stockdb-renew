import React, {useState} from "react";

import { Route, Link, Switch } from "react-router-dom";
// import ReactEcharts from "echarts-for-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// 컴포넌트 자체에서 파라미터를 받아서 사용할 수 있는지?
// 컴포넌트에서 선언한 변수를 Search와 Compare에서 각각 받아서 사용할수 있는지?
//  조회 데이터 컴포넌트

function getFormatDate() {
  return '';
}


const DataSearch = ({mode}) => {
  console.log(mode);

  // API 호출 통한 종목 정보 저장 초기 변수
  const initialStockState = {
    date: [],
    closePrice: [],
    highPrice: [],
    openPrice: [],
    lowPrice: [],
    volume: [],
    title: "",
  }
  const [stockInfo, setStockInfo] = useState(initialStockState);
  // 종목 검색 인풋 변수
  const [inputValue, setInputValue] = useState({
    startDate: "",
    endDate: "",
    searchTitle: "",
  });
  const [minPrice, setMinPrice] = useState(0);

  const API_KEY = "HYMUUQAJ14PK7WTL";

  // API 호출 함수
  const eventAxios = (API, startDate, endDate, setStockInfo, setMinPrice) => {
    const xValuesFunction = []; // 날짜
    const yValuesClosePrice = []; // 종가
    const yValuesHighPrice = []; // 고가
    const yValuesOpenPrice = []; // 시가
    const yValuesLowPrice = []; // 저가
    const yValuesVolume = []; // 거래량

    axios
      .get(API)
      .then(({ data }) => {
        for (var key in data["Time Series (Daily)"]) {
          xValuesFunction.unshift(key);
          yValuesClosePrice.unshift(
            data["Time Series (Daily)"][key]["4. close"]
          );
          yValuesHighPrice.unshift(data["Time Series (Daily)"][key]["2. high"]);
          yValuesOpenPrice.unshift(data["Time Series (Daily)"][key]["1. open"]);
          yValuesLowPrice.unshift(data["Time Series (Daily)"][key]["3. low"]);
          yValuesVolume.unshift(data["Time Series (Daily)"][key]["6. volume"]);
        }
        // startDate 변수를 스트링으로 변환하여 인덱스 위치값 반환
        const startDateString = getFormatDate(startDate);
        const startIndex = xValuesFunction.indexOf(startDateString);
        // endDate 변수를 스트링으로 변환하여 인덱스 위치값 반환
        const endDateString = getFormatDate(endDate);
        const endIndex = xValuesFunction.indexOf(endDateString);
        // 전체 배열을 시작~종료 사이의 날짜로 쪼개기
        const searchDate = xValuesFunction.slice(startIndex, endIndex + 1); // 날짜
        const searchClosePrice = yValuesClosePrice.slice(
          startIndex,
          endIndex + 1
        ); // 종가 쪼개기
        const searchHighPrice = yValuesHighPrice.slice(
          startIndex,
          endIndex + 1
        ); // 고가 쪼개기
        const searchOpenPrice = yValuesOpenPrice.slice(
          startIndex,
          endIndex + 1
        ); // 시가 쪼개기
        const searchLowPrice = yValuesLowPrice.slice(startIndex, endIndex + 1); // 저가 쪼개기
        const searchVolume = yValuesVolume.slice(startIndex, endIndex + 1); // 거래량 쪼개기
        // 종가 중 최소값 찾기
        const minArr = Math.min.apply(Math, searchClosePrice);
        const minArrClosePrice = (minArr * 0.95).toFixed(0); //최소값의 95%를 차트 yAxis 최소값에 반영
        // 검색 해당되는 정보를 newStockInfo에 저장 => stockInfo state에 최종 저장
        const newStockInfo = {
          date: searchDate,
          closePrice: searchClosePrice,
          highPrice: searchHighPrice,
          openPrice: searchOpenPrice,
          lowPrice: searchLowPrice,
          volume: searchVolume,
          title: data["Meta Data"]["2. Symbol"],
        };
        setStockInfo(newStockInfo);
        setMinPrice(minArrClosePrice);
      })
      .catch((err) => {
        alert("종목을 다시 확인해 주세요");
        console.log(err);
      });
  }

  return (
    <div className="dataSearch">
      <div className="pickDate">
        <h3>조회 날짜 : </h3>
        <DatePicker
            selected={inputValue.startDate}
            // onChange={(date) => setStartDate(date)}
            // dateFormat="yyyy-MM-dd"
            // maxDate={new Date()}
            // filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            placeholderText="시작날짜"
          />
          ~
          <DatePicker
            selected={inputValue.endDate}
            // onChange={(date) => setEndDate(date)}
            // dateFormat="yyyy-MM-dd"
            // maxDate={new Date()}
            // filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            placeholderText="종료날짜"
          />
      </div>
      <div className="search">
          <h3>종목 이름 : </h3>
          <input/>
          <button>search</button>
        </div>
    </div>
  )
}

export default DataSearch;