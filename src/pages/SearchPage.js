import React, { useState, useMemo, useCallback } from "react";
import Date from "../components/Date";
import TitleSearch from "../components/TitleSearch";
import { fetchStockInfo } from "../Util";
import Chart from "../components/Chart";
import Radio from "../components/Radio";
import { API_KEY } from "../Config";

const SearchPage = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	// 종목 이름값 저장 변수
	const [stockName, setStockName] = useState("");
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

	// 종목 이름 값 onChange
	const handleInputChange = (e) => {
		const target = e.target.value;
		setStockName(target);
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

	// 그래프 y축 최소값 선정
	const handleYAxisMinVal = useMemo(() => stockInfo.minPrice, [stockInfo]);
	// Line그래프 x축 데이터
	const lineSeries = useMemo(
		() => [
			{
				name: stockInfo.title,
				data: selectPrice(),
				type: "line",
			},
		],
		[stockInfo, radio]
	);
	// Bar그래프 x축 데이터
	const barSeries = useMemo(
		() => [
			{
				name: stockInfo.title,
				data: stockInfo.volume,
				type: "bar",
			},
		],
		[stockInfo]
	);

	// 그래프 종목 이름
	const title = useMemo(() => stockInfo.title.toUpperCase(), [stockInfo]);
	// 그래프에 나타나는 종목 Toggle 버튼
	const legend = useMemo(() => [`${stockInfo.title}`], [stockInfo]);

	// 버튼 클릭시 API 호출 함수 실행
	const handleSubmit = () => {
		let apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${API_KEY}`;
		fetchStockInfo(apiUrl, startDate, endDate, setStockInfo);
	};

	// #### 렌더링
	return (
		<div className="searchWrap">
			<h2 style={{ color: "blue" }}>1개 종목 검색</h2>
			<Date
				startDate={startDate}
				onStartDateChange={setStartDate}
				endDate={endDate}
				onEndDateChange={setEndDate}
			/>
			<div className="searchName">
				<h3>종목 이름 : </h3>
				<TitleSearch
					stockName={stockName}
					onInputChange={handleInputChange}
					onSubmit={handleSubmit}
				/>
				<button onClick={handleSubmit}>search</button>
			</div>
			<Radio radio={radio} onRadioChange={setRadio} />
			<div>
				<Chart
					stockInfo={stockInfo}
					selectPrice={selectPrice}
					onYAxisMinVal={handleYAxisMinVal}
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
