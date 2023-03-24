import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Table.css";
function Table() {
	const [screen, setScreen] = useState({busses:[0,1]});
	const location = useLocation();
	let busses = [1, 2, 3];

	useEffect(() => {
		fetch("http://127.0.0.1:4000/api/tabels")
			.then((res) => res.json())
			.then((josn) => {
				console.log(josn);
				setScreen(josn.data);
				busses = josn.data.busses;
			});
		setInterval(() => {
			fetch("http://127.0.0.1:4000/api/tabels")
				.then((res) => res.json())
				.then((josn) => {
					console.log(josn);
					setScreen(josn.data);
				});
		}, 5000);
	}, [location]);




	return (
		<div>
			<div className="table">
				<h3>{screen.busStopName}</h3>
				<div className="screen">
					{screen.busses.length ? (
						screen.busses.map((bus, index) => (
							<p key={index}>
								{bus.nr} {bus.dir}{" "}
								<span>
									{Math.floor(bus.timeTo / 60) > 60
										? Math.floor(Math.floor(bus.timeTo / 60) / 60) + "h " + Math.floor(bus.timeTo / 60) % 60+"min"
										: bus.timeTo >60? Math.floor(bus.timeTo / 60) + "min":"<1min"}
								</span>
							</p>
						))
					) : (
						<div>pusto!!!!!!!!!!</div>
					)}
					
					<p className="time">{screen.time}</p>
				</div>
			</div>
			<div className="pipe"></div>
		</div>
	);
}
export default Table;
