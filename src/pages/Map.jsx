import Icon from "../assets/images/bus.png";
import "../assets/css/Map.css";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Map({ setID }) {
	const [cookies, setCookie] = useCookies(["busID"]);
	let location = useLocation();
	window.addEventListener("load", initialize);
	var marker_size = 25;

	if (window.innerWidth < 1000) {
		marker_size = 35;
	}
	useEffect(() => {
		initialize();
	}, [location]);
	function initialize() {
		var map_options = {
			center: new google.maps.LatLng(50.041124423263156, 21.999090892052912),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};
		var map_div = document.getElementById("map_canvas");
		var google_map = new google.maps.Map(map_div, map_options);

		var info_window = new google.maps.InfoWindow({
			content: "loading",
		});
		//

		fetch("https://api.ztm.kacpep.dev/api/tabels")
			.then((res) => res.json())
			.then((json) => {
				var allBusStpos = json.data;
				allBusStpos.forEach((stop) => {
					var t = [];
					var x = [];
					var y = [];
					var h = [];

					t.push(stop.name);
					x.push(stop.y);
					y.push(stop.x);
					h.push(`<p><strong>${stop.name}</strong><br/><br /> <a id='${stop.id}' class="view" href="/tabel">Zobacz!</a > </p>`);

					var i = 0;

					var icon = {
						url: Icon, // url
						scaledSize: new google.maps.Size(marker_size, marker_size), // size
					};

					var m = new google.maps.Marker({
						map: google_map,
						animation: google.maps.Animation.DROP,
						title: t[i],
						position: new google.maps.LatLng(x[i], y[i]),
						html: h[i],
						icon: icon,
					});

					google.maps.event.addListener(m, "click", function (e) {
						info_window.setContent(this.html);
						info_window.open(google_map, this);
						setCookie("busID", stop.id, { path: "/" });

						setID(stop.id);
					});

					i++;
				});
			});
	}

	return (
		<div
			id="map_canvas"
			style={{ width: "100%", height: "100vh" }}></div>
	);
}
export default Map;
