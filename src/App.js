import { NavLink, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";

import Tabel from "./pages/Tabel";
import Tabels from "./pages/Tabels";
import Map from "./pages/Map";
import { useState } from "react";

function App() {
	const [busID, setBusID] = useState("");
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
						<NavLink to="/tabels">Table</NavLink>
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
					path="/tabel"
					element={<Tabel busID={busID} />}
				/>
				<Route
					path="/tabels"
					element={<Tabels setID={setBusID} />}
				/>
			</Routes>
		</>
	);
}

export default App;
