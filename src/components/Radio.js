import React from "react";

const Radio = ({ radio, onRadioChange }) => {
	return (
		<div className="radio">
			<label>종가</label>
			<input
				type="radio"
				name="chart"
				value="close"
				checked={radio === "close"}
				onChange={(e) => {
					onRadioChange(e.target.value);
				}}
			/>
			<label>시가</label>
			<input
				type="radio"
				name="chart"
				value="open"
				checked={radio === "open"}
				onChange={(e) => {
					onRadioChange(e.target.value);
				}}
			/>
			<label>고가</label>
			<input
				type="radio"
				name="chart"
				value="high"
				checked={radio === "high"}
				onChange={(e) => {
					onRadioChange(e.target.value);
				}}
			/>
			<label>저가</label>
			<input
				type="radio"
				name="chart"
				value="low"
				checked={radio === "low"}
				onChange={(e) => {
					onRadioChange(e.target.value);
				}}
			/>
		</div>
	);
};

export default Radio;
