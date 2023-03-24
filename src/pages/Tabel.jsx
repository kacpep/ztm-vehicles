import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Tabel.css";
function Tabel({ busID }) {
	const [screen, setScreen] = useState({ busses: [0, 1] });
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		fetch(`http://127.0.0.1:4000/api/tabel?id=${busID}`)
			.then((res) => res.json())
			.then((josn) => {
				setScreen(josn.data);
			});

		const interval = setInterval(() => {
			fetch(`http://127.0.0.1:4000/api/tabel?id=${busID}`)
				.then((res) => res.json())
				.then((josn) => {
					setScreen(josn.data);
				});
		}, 5000);
		return () => clearInterval(interval);
	}, [navigate]);

	return (
		<div>
			<div className="table">
				<h3>{screen.busStopName}</h3>
				<div className="screen">
					{screen.busses.length ? (
						screen.busses.map((bus, index) => (
							<p key={index}>
								{bus.nr} {bus.dir}{" "}
								<span className={bus.timeTo < 60 ? "blinking" : null}>
									{Math.floor(bus.timeTo / 60) > 60
										? Math.floor(Math.floor(bus.timeTo / 60) / 60) + "h " + (Math.floor(bus.timeTo / 60) % 60) + "min"
										: bus.timeTo > 60
										? Math.floor(bus.timeTo / 60) + "min"
										: "<1min"}
								</span>
							</p>
						))
					) : (
						<div>pusto!!!!!!!!!!</div>
					)}

					<p className="time">GODZINA: {screen.time}</p>
				</div>
			</div>
			<div className="pipe"></div>
		</div>
	);
}
export default Tabel;
