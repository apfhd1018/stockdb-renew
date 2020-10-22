import React from "react";
import "./App.css";

import { Route, Link, Switch } from "react-router-dom";
import ComparePage from "./pages/ComparePage";
import SearchPage from "./pages/SearchPage";

const App = () => {
	return (
		<div>
			<div className="header">
				<h1>종목검색페이지(나스닥)</h1>
			</div>
			<div className="nav">
				<Link
					style={{
						margin: "0 20px",
						textDecoration: "none",
						color: "#000",
						padding: "10px",
						border: "1px solid grey",
						borderRadius: "10px",
					}}
					to="/search"
				>
					1개 종목 검색
				</Link>
				<Link
					style={{
						margin: "0 20px",
						textDecoration: "none",
						color: "#000",
						padding: "10px",
						border: "1px solid grey",
						borderRadius: "10px",
					}}
					to="/compare"
				>
					2개 종목 검색
				</Link>
			</div>
			<Switch>
				<Route exact path="/search" component={SearchPage} />
				<Route path="/compare" component={ComparePage} />
			</Switch>
		</div>
	);
};

export default App;
