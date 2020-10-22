import React, { useState } from "react";
import Date from "../components/Date";
import TitleSearch from "../components/TitleSearch";
import { eventAxios } from "../Util";
import Chart from "../components/Chart";
import Radio from "../components/Radio";

const ComparePage = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	// 종목 이름값 저장 변수
	const [inputValue, setInputValue] = useState({
		first: "",
		second: "",
	});
	// API 요청 데이터 저장 변수
	const [stockInfoFirst, setStockInfoFirst] = useState({
		date: [],
		closePrice: [],
		highPrice: [],
		openPrice: [],
		lowPrice: [],
		volume: [],
		title: "",
		minPrice: 0,
	});
	const [stockInfoSecond, setStockInfoSecond] = useState({
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
	const handleFirstInputChange = (e) => {
		const target = e.target.value;
		setInputValue({ ...inputValue, first: target });
	};
	const handleSecondInputChange = (e) => {
		const target = e.target.value;
		setInputValue({ ...inputValue, second: target });
	};

	// Echarts에서 사용할 X축 데이터 선정함수
	const selectFirstPrice = () => {
		if (radio === "close") {
			return stockInfoFirst.closePrice;
		} else if (radio === "open") {
			return stockInfoFirst.openPrice;
		} else if (radio === "high") {
			return stockInfoFirst.highPrice;
		} else if (radio === "low") {
			return stockInfoFirst.lowPrice;
		}
	};
	const selectSecondPrice = () => {
		if (radio === "close") {
			return stockInfoSecond.closePrice;
		} else if (radio === "open") {
			return stockInfoSecond.openPrice;
		} else if (radio === "high") {
			return stockInfoSecond.highPrice;
		} else if (radio === "low") {
			return stockInfoSecond.lowPrice;
		}
	};

	// 그래프 y축 최소값 선정
	const min = () => {
		return +stockInfoFirst.minPrice > +stockInfoSecond.minPrice
			? stockInfoSecond.minPrice
			: stockInfoFirst.minPrice;
	};

	const lineSeries = [
		{
			name: stockInfoFirst.title,
			data: selectFirstPrice(),
			type: "line",
		},
		{
			name: stockInfoSecond.title,
			data: selectSecondPrice(),
			type: "line",
		},
	];
	const barSeries = [
		{
			name: stockInfoFirst.title,
			data: stockInfoFirst.volume,
			type: "bar",
		},
		{
			name: stockInfoSecond.title,
			data: stockInfoSecond.volume,
			type: "bar",
		},
	];
	const title = {
		text: `${stockInfoFirst.title.toUpperCase()}, ${stockInfoSecond.title.toUpperCase()}`,
	};
	const legend = [`${stockInfoFirst.title}`, `${stockInfoSecond.title}`];

	// 버튼 클릭시 API 호출 함수 실행
	const submit = () => {
		const API_KEY = "HYMUUQAJ14PK7WTL";
		let API_Call_First = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${inputValue.first}&outputsize=full&apikey=${API_KEY}`;
		let API_Call_Second = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${inputValue.second}&outputsize=full&apikey=${API_KEY}`;
		eventAxios(API_Call_First, startDate, endDate, setStockInfoFirst);
		eventAxios(API_Call_Second, startDate, endDate, setStockInfoSecond);
	};

	// #### 렌더링
	return (
		<div className="searchWrap">
			<h2 style={{ color: "red" }}>2개 종목 검색</h2>
			<Date
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>
			<div className="searchName">
				<h3>종목 이름 : </h3>
				<TitleSearch
					inputValue={inputValue.first}
					inputTarget={handleFirstInputChange}
					submit={submit}
				/>
				<TitleSearch
					inputValue={inputValue.second}
					inputTarget={handleSecondInputChange}
					submit={submit}
				/>

				<button onClick={submit}>search</button>
			</div>
			<Radio radio={radio} setRadio={setRadio} />
			<div>
				<Chart
					stockInfo={stockInfoFirst}
					min={min}
					lineSeries={lineSeries}
					barSeries={barSeries}
					title={title}
					legend={legend}
				/>
			</div>
		</div>
	);
};

export default ComparePage;
