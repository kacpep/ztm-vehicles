import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Tabels.css";
function Tabels({ setID }) {
	const [busStop, setBusStop] = useState("");
	const [favoritesBusStops, setFavoritesBusStops] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setFavoritesBusStops(JSON.parse(localStorage.getItem("favoritesBusStops")));
		fetch("https://api.ztm.kacpep.dev//api/tabels")
			.then((res) => res.json())
			.then((json) => {
				setBusStop(json.data);
			});
	}, [location]);

	const handleClick = (e) => {
		setID(e.target.id);
		sessionStorage.setItem("busID", e.target.id);
		navigate("/tabel");
	};
	const handleClickStar = (e) => {
		e.target.classList.toggle("star--active");
		let newBusStop = { id: e.target.previousElementSibling.id, name: e.target.previousElementSibling.textContent };
		let arr = JSON.parse(localStorage.getItem("favoritesBusStops")) || [];
		console.log(arr.find(({ id }) => id === e.target.previousElementSibling.id));
		if (!arr.find(({ id }) => id === e.target.previousElementSibling.id)) {
			arr.push(newBusStop);
		} else {
			arr.splice(arr.indexOf(newBusStop), 1);
		}
		localStorage.setItem("favoritesBusStops", JSON.stringify(arr));
		// console.log(localStorage.getItem("favoritesBusStops"));
		setFavoritesBusStops(JSON.parse(localStorage.getItem("favoritesBusStops")));
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
				onKeyUp={() => {
					searching();
				}}
				placeholder="Search for names.."
				title="Type in a name"></input>
			{favoritesBusStops ? (
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
							id={stop.id}
							className="busStop">
							<p
								id={stop.id}
								onClick={(event) => handleClick(event)}>
								{stop.name}
							</p>
							<div
								className={favoritesBusStops.find(({ id }) => id == stop.id) ? "star star--active" : "star"}
								onClick={(event) => {
									handleClickStar(event);
								}}>
								⭐
							</div>
						</li>
					))
				) : (
					<div>pusto!!!!!!!!!!</div>
				)}
			</ul>
		</div>
	);
}
export default Tabels;
