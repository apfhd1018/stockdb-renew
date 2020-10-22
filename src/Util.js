import axios from "axios";

// ### Date 폼
const getFormatDate = (date) => {
	let year = date.getFullYear();
	let month = 1 + date.getMonth();
	month = month >= 10 ? month : "0" + month;
	let day = date.getDate();
	day = day >= 10 ? day : "0" + day;
	return year + "-" + month + "-" + day;
};

//  ### API 호출
const eventAxios = (API, startDate, endDate, setStockInfo) => {
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
				yValuesClosePrice.unshift(data["Time Series (Daily)"][key]["4. close"]);
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
			// 전체 배열을 시작~종료 사이의 날짜로 나누기
			const searchDate = xValuesFunction.slice(startIndex, endIndex + 1); // 날짜
			const searchClosePrice = yValuesClosePrice.slice(
				startIndex,
				endIndex + 1
			); // 종가 나누기
			const searchHighPrice = yValuesHighPrice.slice(startIndex, endIndex + 1); // 고가 나누기
			const searchOpenPrice = yValuesOpenPrice.slice(startIndex, endIndex + 1); // 시가 나누기
			const searchLowPrice = yValuesLowPrice.slice(startIndex, endIndex + 1); // 저가 나누기
			const searchVolume = yValuesVolume.slice(startIndex, endIndex + 1); // 거래량 나누기
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
				minPrice: minArrClosePrice,
			};
			setStockInfo(newStockInfo);
		})
		.catch((err) => {
			alert("종목을 다시 확인해 주세요");
			console.log(err);
		});
};
export { getFormatDate, eventAxios };
