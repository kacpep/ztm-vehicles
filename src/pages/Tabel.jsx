import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Tabel.css";
import { useCookies } from "react-cookie";

const url = "http://127.0.0.1:4000";

function Tabel({ busID }) {
	const [cookies, setCookie] = useCookies(["busID"]);
	const [screen, setScreen] = useState({ busses: [{ dir: "Loading...", timeTo: 10 }] });
	const location = useLocation();

	useEffect(() => {
		if (!busID) {
			busID = cookies.busID;
		}
		fetch(`${url}/api/tabel?id=${busID}`)
			.then((res) => res.json())
			.then((josn) => {
				setScreen(josn.data);
			});

		const interval = setInterval(() => {
			fetch(`${url}/api/tabel?id=${busID}`)
				.then((res) => res.json())
				.then((josn) => {
					setScreen(josn.data);
				});
		}, 5000);
		return () => clearInterval(interval);
	}, [location, busID]);

	return (
		<div className="content">
			<div className="tabel">
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
						<div>Brak danych! :(</div>
					)}

					<p className="time">GODZINA: {screen.time}</p>
				</div>
			</div>
			<div className="pipe"></div>
		</div>
	);
}
export default Tabel;
