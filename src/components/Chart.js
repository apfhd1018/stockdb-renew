import React from "react";
import ReactEcharts from "echarts-for-react";

const Chart = ({
	stockInfo,
	onYAxisMinVal,
	lineSeries,
	barSeries,
	title,
	legend,
}) => {
	return (
		<div>
			<ReactEcharts
				option={{
					title: {
						text: title,
					},
					tooltip: {
						trigger: "axis",
					},
					xAxis: {
						type: "category",
						data: stockInfo.date,
					},
					yAxis: {
						type: "value",
						min: onYAxisMinVal,
					},
					legend: {
						data: legend,
					},
					series: lineSeries,
				}}
			/>
			<ReactEcharts
				option={{
					grid: {
						bottom: "50%",
					},
					tooltip: {
						trigger: "axis",
					},
					xAxis: {
						type: "category",
						data: stockInfo.date,
					},
					yAxis: {
						type: "value",
						// min: min,
					},
					legend: {
						data: legend,
					},
					series: barSeries,
				}}
			/>
		</div>
	);
};

export default Chart;
