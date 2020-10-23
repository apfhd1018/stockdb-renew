import React, { useState, useMemo, useCallback } from "react";
import Date from "../components/Date";
import TitleSearch from "../components/TitleSearch";
import { fetchStockInfo } from "../Util";
import Chart from "../components/Chart";
import Radio from "../components/Radio";
import { API_KEY } from "../Config";

const ComparePage = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	// 종목 이름값 저장 변수
	const [stockName, setStockName] = useState({
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
		setStockName({ ...stockName, first: target });
	};
	const handleSecondInputChange = (e) => {
		const target = e.target.value;
		setStockName({ ...stockName, second: target });
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
	const handleYAxisMinVal = useCallback(() => {
		return +stockInfoFirst.minPrice > +stockInfoSecond.minPrice
			? stockInfoSecond.minPrice
			: stockInfoFirst.minPrice;
	}, [stockInfoFirst, stockInfoSecond, radio]);

	// Line그래프 x축 데이터
	const lineSeries = useMemo(
		() => [
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
		],
		[stockInfoFirst, stockInfoSecond, radio]
	);
	// Bar그래프 x축 데이터
	const barSeries = useMemo(
		() => [
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
		],
		[stockInfoFirst, stockInfoSecond]
	);
	// 그래프 종목 이름
	const title = useMemo(
		() =>
			`${stockInfoFirst.title.toUpperCase()}, ${stockInfoSecond.title.toUpperCase()}`,
		[stockInfoFirst, stockInfoSecond]
	);
	// 그래프에 나타나는 종목 Toggle 버튼
	const legend = useMemo(
		() => [`${stockInfoFirst.title}`, `${stockInfoSecond.title}`],
		[stockInfoFirst, stockInfoSecond]
	);

	// 버튼 클릭시 API 호출 함수 실행
	const handleSubmit = () => {
		let firstApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.first}&outputsize=full&apikey=${API_KEY}`;
		let secondApiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName.second}&outputsize=full&apikey=${API_KEY}`;
		fetchStockInfo(firstApiUrl, startDate, endDate, setStockInfoFirst);
		fetchStockInfo(secondApiUrl, startDate, endDate, setStockInfoSecond);
	};

	// #### 렌더링
	return (
		<div className="searchWrap">
			<h2 style={{ color: "red" }}>2개 종목 검색</h2>
			<Date
				startDate={startDate}
				onStartDateChange={setStartDate}
				endDate={endDate}
				onEndDateChange={setEndDate}
			/>
			<div className="searchName">
				<h3>종목 이름 : </h3>
				<TitleSearch
					stockName={stockName.first}
					inputTarget={handleFirstInputChange}
					onSubmit={handleSubmit}
				/>
				<TitleSearch
					stockName={stockName.second}
					inputTarget={handleSecondInputChange}
					onSubmit={handleSubmit}
				/>

				<button onClick={handleSubmit}>search</button>
			</div>
			<Radio radio={radio} onRadioChange={setRadio} />
			<div>
				<Chart
					stockInfo={stockInfoFirst}
					onYAxisMinVal={handleYAxisMinVal}
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
