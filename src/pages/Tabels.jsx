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
		if (cookies.favoritesBusStops) setFavoritesBusStops(cookies.favoritesBusStops );
		fetch(`${url}/api/tabels`)
			.then((res) => res.json())
			.then((json) => {
				setBusStop(json.data);
			});
	}, [location]);

	const handleClick = (e) => {
		setID(e.target.id);
		setBusStop( e.target.id);
		setCookie("busID", e.target.id, { path: "/" });

		navigate("/tabel");
	};
	const handleClickStar = (e) => {
		let newBusStop = { id: e.target.previousElementSibling.id, name: e.target.previousElementSibling.textContent };
		let arr = cookies.favoritesBusStops || [];
		if (!arr.find(({ id }) => id === e.target.previousElementSibling.id)) {
			arr.push(newBusStop);
		} else {
			arr.splice(arr.indexOf(newBusStop), 1);
		}
		setFavoritesBusStops(arr);
		setCookie("favoritesBusStops", arr, { path: "/" });
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
		<div className="allTabels__box">
			<h2>All bus stops</h2>
			<input
				id="searchBusStop"
				type="text"
				onInput={() => {
					searching();
				}}
				placeholder="Search for names.."
				title="Type in a name"
			/>
			{favoritesBusStops && favoritesBusStops.length ? (
				<>
					<h3>Favorite</h3>
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
					<div>Loading..</div>
				)}
			</ul>
		</div>
	);
}
export default Tabels;
