import Icon from "../assets/images/bus.png";
import "../assets/css/Map.css";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const url = "http://127.0.0.1:4000";

function Map({ setID }) {
	const [busStop, setBusStop] = useState([]);
	const location = useLocation();
	const [mapRef, setMapRef] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [infoWindowData, setInfoWindowData] = useState();
	const navigate = useNavigate();

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: null,
	});
	const center = useMemo(() => ({ lat: 50.041124423263156, lng: 21.999090892052912 }), []);
	useEffect(() => {
		fetch(`${url}/api/tabels`)
			.then((res) => res.json())
			.then((json) => {
				setBusStop(json.data);
			});
	}, [location]);

	const onLoad = useCallback(function callback(map) {
		setMapRef(map);
	}, []);

	const handleMarkerClick = (id, lat, lng, name) => {
		mapRef?.panTo({ lat, lng });
		setInfoWindowData({ id, name });
		setIsOpen(true);
	};
	const OpenTabel = (e) => {
		setID(e.target.id);
		navigate("/tabel");
	};

	return (
		<>
			{!isLoaded ? (
				<div className="content">
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
				</div>
			) : (
				<GoogleMap
					mapContainerClassName="map-container"
					center={center}
					zoom={10}
					clickableIcons={false}
					mapContainerStyle={{ height: "100vh", position: "relative" }}
					onClick={() => setIsOpen(false)}
					onLoad={onLoad}
					options={{ streetViewControl: false, disableDefaultUI: true }}
					ptions={{
						gestureHandling: "greedy",
					}}>
					{busStop
						? busStop.map((stop, i) => (
								<Marker
									key={i}
									position={{ lat: stop.y, lng: stop.x }}
									icon={{ url: Icon, scaledSize: new window.google.maps.Size(30, 30) }}
									styles={{ imageSizes: "10px" }}
									onClick={() => {
										handleMarkerClick(i, stop.y, stop.x, stop.name);
									}}>
									{isOpen && infoWindowData?.id === i && (
										<InfoWindow
											onCloseClick={() => {
												setIsOpen(false);
											}}>
											<>
												<h3>{infoWindowData.name}</h3>
												<button
													onClick={(e) => {
														OpenTabel(e);
													}}
													className="button-9"
													id={stop.id}>
													Pokaż tablice
												</button>
											</>
										</InfoWindow>
									)}
								</Marker>
						  ))
						: null}
				</GoogleMap>
			)}
		</>
	);
}
export default Map;
