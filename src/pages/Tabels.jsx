import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Tabels.css";
function Tabels({ setID }) {
	const [busStop, setBusStop] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://127.0.0.1:4000/api/tabels")
			.then((res) => res.json())
			.then((json) => {
				setBusStop(json.data);
			});
	}, [navigate]);

	const handleClick = (e) => {
		setID(e.target.id);
		navigate("/tabel");
	};

	function searching() {
		var input, filter, ul, li, a, i, txtValue;
		input = document.querySelector("input");
		filter = input.value.toUpperCase();
		ul = document.getElementById("allBusStops");
		li = ul.querySelectorAll("li");
		for (i = 0; i < li.length; i++) {
			a = li[i].getElementsByTagName("a")[0];
			txtValue = a.textContent || a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li[i].style.display = "";
			} else {
				li[i].style.display = "none";
			}
		}
	}

	return (
		<div>
			<h2>Wszykie Przystanki</h2>
			<input
				type="text"
				onKeyUp={() => {
					searching();
				}}
				placeholder="Search for names.."
				title="Type in a name"></input>
			<ul id="allBusStops">
				{busStop.length ? (
					busStop.map((stop, index) => (
						<li
							key={index}
							id={stop.id}
							className="busStop"
							onClick={(e) => handleClick(e)}>
							<a
								id={stop.id}
								href="#"
								onClick={(e) => handleClick(e)}>
								{stop.name}
							</a>
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
