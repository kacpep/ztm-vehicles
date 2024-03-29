import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import "../assets/css/Tabels.css";

const url = "http://127.0.0.1:4000";

function Tabels({ setID }) {
	const [cookies, setCookie] = useCookies(["busID", "favoritesBusStops"]);
	const [busStop, setBusStop] = useState("");
	const [favoritesBusStops, setFavoritesBusStops] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (cookies.favoritesBusStops) setFavoritesBusStops(cookies.favoritesBusStops);
		fetch(`${url}/api/tabels`)
			.then((res) => res.json())
			.then((json) => {
				setBusStop(json.data);
			});
	}, [location]);

	const handleClick = (e) => {
		setID(e.target.id);
		setBusStop(e.target.id);
		setCookie("busID", e.target.id, { path: "/", maxAge: 34550000 });

		navigate("/tabel");
	};
	const handleClickStar = (e) => {
		let newBusStop = { id: e.target.previousElementSibling.id, name: e.target.previousElementSibling.textContent };
		let arr = cookies.favoritesBusStops || [];
		if (!arr.find(({ id }) => id === e.target.previousElementSibling.id)) {
			arr.push(newBusStop);
		} else {
			arr = arr.filter((el) => el.id !== e.target.previousElementSibling.id);
		}
		setFavoritesBusStops(arr);
		setCookie("favoritesBusStops", arr, { path: "/", maxAge: 34550000 });
	};

	const searching = () => {
		var input, filter, ul, li, a, i, txtValue;
		input = document.querySelector("#searchBusStop");
		filter = input.value.toUpperCase();
		ul = document.getElementById("allBusStops");
		li = ul.querySelectorAll("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("p")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	};

	return (
		<div className="allTabels__box content">
			<h2>Wszyskie tablice przystankowe 🚏</h2>
			<input
				id="searchBusStop"
				type="text"
				onInput={() => {
					searching();
				}}
				placeholder="🔎 Wpisz nazwe przystanku.."
				title="Wpisz nazwe przystanku"
			/>
			{favoritesBusStops && favoritesBusStops.length ? (
				<>
					<h3>Ulubione ⭐</h3>
					<ul className="favoritBusStops">
						{favoritesBusStops.map((stop, index) => (
							<li
								className="busStop"
								key={index}>
								<p
									id={stop.id}
									onClick={(event) => handleClick(event)}>
									{stop.name}
								</p>
								<div
									className="star star--active"
									onClick={(event) => {
										handleClickStar(event);
									}}>
									⭐
								</div>
							</li>
						))}
					</ul>
					<hr />
				</>
			) : null}
			<ul id="allBusStops">
				{busStop.length ? (
					busStop.map((stop, index) => (
						<li
							key={index}
							className="busStop">
							<p
								id={stop.id}
								onClick={(event) => handleClick(event)}>
								{stop.name}
							</p>
							<div
								className={
									favoritesBusStops
										? favoritesBusStops.find(({ id }) => parseInt(id) === parseInt(stop.id))
											? "star star--active"
											: "star"
										: "star"
								}
								onClick={(event) => {
									handleClickStar(event);
								}}>
								⭐
							</div>
						</li>
					))
				) : (
					<>
						<h1>Loading...</h1>

						<div className="loading--center">
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
							<div className="loading__wave"></div>
						</div>
					</>
				)}
			</ul>
		</div>
	);
}
export default Tabels;
