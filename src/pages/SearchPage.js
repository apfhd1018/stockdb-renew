import React, { useState } from "react";
import Date from "../components/Date";
import TitleSearch from "../components/TitleSearch";
import { eventAxios } from "../Util";
import Chart from "../components/Chart";
import Radio from "../components/Radio";

const SearchPage = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	// 종목 이름값 저장 변수
	const [inputValue, setInputValue] = useState("");
	// API 요청 데이터 저장 변수
	const [stockInfo, setStockInfo] = useState({
		date: [],
		closePrice: [],
		highPrice: [],
		openPrice: [],
		lowPrice: [],
		volume: [],
		title: "",
		minPrice: 0,
	});

	// 라디오 버튼 Value 지정값
	const [radio, setRadio] = useState("close");

	const inputTarget = (e) => {
		const target = e.target.value;
		setInputValue(target);
	};

	// Echarts에서 사용할 데이터 변수들
	const selectPrice = () => {
		if (radio === "close") {
			return stockInfo.closePrice;
		} else if (radio === "open") {
			return stockInfo.openPrice;
		} else if (radio === "high") {
			return stockInfo.highPrice;
		} else if (radio === "low") {
			return stockInfo.lowPrice;
		}
	};
	const min = stockInfo.minPrice;

	const lineSeries = [
		{
			name: stockInfo.title,
			data: selectPrice(),
			type: "line",
		},
	];
	const barSeries = [
		{
			name: stockInfo.title,
			data: stockInfo.volume,
			type: "bar",
		},
	];
	const title = {
		text: stockInfo.title.toUpperCase(),
	};
	const legend = [`${stockInfo.title}`];

	// 버튼 클릭시 API 호출 함수 실행
	const submit = () => {
		const API_KEY = "HYMUUQAJ14PK7WTL";
		let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${inputValue}&outputsize=full&apikey=${API_KEY}`;
		eventAxios(API_Call, startDate, endDate, setStockInfo);
	};

	// #### 렌더링
	return (
		<div className="searchWrap">
			<h2 style={{ color: "blue" }}>1개 종목 검색</h2>
			<Date
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>
			<div className="searchName">
				<h3>종목 이름 : </h3>
				<TitleSearch
					inputValue={inputValue}
					inputTarget={inputTarget}
					submit={submit}
				/>
				<button onClick={submit}>search</button>
			</div>
			<Radio radio={radio} setRadio={setRadio} />
			<div>
				<Chart
					stockInfo={stockInfo}
					selectPrice={selectPrice}
					min={min}
					barSeries={barSeries}
					lineSeries={lineSeries}
					title={title}
					legend={legend}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
