import { useState } from "react";

function Table() {
	const [VehiclesTable, setVehiclesTable] = useState();
	fetch("http://einfo.erzeszow.pl/Home/GetTimetableReal?busStopId=1418")
		.then((res) => res.text())
		.then((text) => {
			console.log(text);
			setVehiclesTable(text);
		});

	return <div dangerouslySetInnerHTML={{ __html: VehiclesTable }} />;
}
export default Table;
