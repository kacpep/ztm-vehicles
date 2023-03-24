let allBusStpos = "";
fetch("http://einfo.erzeszow.pl/Home/GetBusStopList?q=&ttId=0")
	.then((res) => res.json())
	.then((json) => {
		allBusStpos = json;
	});

module.exports = (req, res) => {
	let data = [];
	allBusStpos.forEach((street) => {
		street[2].forEach((busStop) => {
			data.push({ id: busStop[0], name: busStop[1] });
		});
	});
	return res.send({
		code: 200,
		message: "correct",
		data: data,
	});
};
