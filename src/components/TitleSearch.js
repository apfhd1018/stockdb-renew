import React from "react";

const TitleSearch = ({ inputValue, inputTarget, submit }) => {
	return (
		<div className="search">
			<input
				type="text"
				value={inputValue}
				onChange={inputTarget}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						submit();
					}
				}}
				placeholder="ex)qcom, tsla, wmt..."
			/>
		</div>
	);
};

export default TitleSearch;
