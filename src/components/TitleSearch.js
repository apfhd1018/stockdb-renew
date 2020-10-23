import React from "react";

const TitleSearch = ({ stockName, onInputChange, onSubmit }) => {
	return (
		<div className="search">
			<input
				type="text"
				value={stockName}
				onChange={onInputChange}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						onSubmit();
					}
				}}
				placeholder="ex)qcom, tsla, wmt..."
			/>
		</div>
	);
};

export default TitleSearch;
