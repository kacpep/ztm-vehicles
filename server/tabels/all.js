var allBusStpos = "";
var data = [];

fetch("http://einfo.erzeszow.pl/Home/GetMapBusStopList?ttId=0")
	.then((res) => res.json())
	.then((json) => {
		allBusStpos = json;

		allBusStpos.forEach((busStop) => {
			data.push({ id: busStop[0], name: busStop[1], x: busStop[5], y: busStop[4] });
		});
	});

module.exports = (req, res) => {
	return res.send({
		code: 200,
		message: "correct",
		data: data,
	});
};