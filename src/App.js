import { NavLink, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";

import Table from "./pages/Table";
import Map from "./pages/Map";

function App() {
	return (
		<>
			<nav>
				<ul
					id="slideNav"
					onClick={(e) => {
						if (e.target.tagName === "A") {
							const SlideNav = document.querySelector("#slideNav");
							SlideNav.classList.remove("active");
						}
					}}>
					<li>
						<NavLink to="/table">Table</NavLink>
					</li>
					<li>
						<NavLink to="/">Map</NavLink>
					</li>
					<li>Transfers</li>
					<li>Help</li>
				</ul>
				<div
					className="arrow--down arrow"
					onClick={() => {
						const SlideNav = document.querySelector("#slideNav");
						SlideNav.classList.toggle("active");
					}}></div>
			</nav>

			<Routes>
				<Route
					path="/"
					element={<Map />}
				/>
				<Route
					path="/table"
					element={<Table />}
				/>
			</Routes>
		</>
	);
}

export default App;
