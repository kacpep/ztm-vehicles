import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../assets/css/Tabel.css";
import { useCookies } from "react-cookie";

const url = "https://api.ztm.kacpep.dev";

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
				for(var x = josn.data.busses.length; x  > 6; x--){
					delete josn.data.busses[x]
				}
				setScreen(josn.data);
			});

		const interval = setInterval(() => {
			fetch(`${url}/api/tabel?id=${busID}`)
				.then((res) => res.json())
				.then((josn) => {
					for(var x = josn.data.busses.length; x  > 6; x--){
						delete josn.data.busses[x]
					}
					setScreen(josn.data);
				});
		}, 5000);
		return () => clearInterval(interval);
	}, [location, busID]);

	return (
		<>
		<div class="back"></div>
		<div class="parent">
			<div class="box">
				<h3 class="bus_stop">{screen.busStopName}</h3>
				<div class="legend"><p>| linia </p><p>| Przystanek Docelowy</p><p>Odjazd |</p></div>
				<div class="box_bus">


				{screen.busses.length ? (
					screen.busses.map((bus, index) => (
						<div className="inside_box" key={index}>
							<div className="bus stop">{bus.nr} {bus.dir}{" "}</div>
							
							<span className={ [bus.timeTo < 60 ? "blinking" : null,"bus time"].join(' ')  }>
								{Math.floor(bus.timeTo / 60) > 60
									? Math.floor(Math.floor(bus.timeTo / 60) / 60) + "h " + (Math.floor(bus.timeTo / 60) % 60) + "min"
									: bus.timeTo > 60
									? Math.floor(bus.timeTo / 60) + "min"
									: "<1min"}
							</span>
						</div>
					))
				) : (
					<div>
						Brak danych! :(
						<p className="error__text">
							{/* contact: &nbsp; <a href="https://kacpep.dev">kacpep</a>,&nbsp; <a href="https://github.com/DrFrezze71">DrFrezze71</a> */}
						</p>{" "}
					</div>
				)}



				</div>
        	</div>
      </div>
	  </>
	);
}
export default Tabel;
