import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = ({ startDate, setStartDate, endDate, setEndDate }) => {
	return (
		<div className="pickDate">
			<h3>조회 날짜 : </h3>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				dateFormat="yyyy-MM-dd"
				// maxDate={new Date()}
				filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
				placeholderText="시작날짜"
			/>
			~
			<DatePicker
				selected={endDate}
				onChange={(date) => setEndDate(date)}
				dateFormat="yyyy-MM-dd"
				// maxDate={new Date()}
				filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
				placeholderText="종료날짜"
			/>
		</div>
	);
};

export default Date;
