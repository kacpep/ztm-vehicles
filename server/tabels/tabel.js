var parseString = require("xml2js").parseString;

module.exports = (req, res) => {
	let id = req.query.id;
	!id ? (id = 1) : null;

	fetch(`http://einfo.erzeszow.pl/Home/GetTimetableReal?busStopId=${id}`)
		.then((res) => res.text())
		.then((text) => {
			parseString(text, function (err, results) {
				// console.log(results.Schedules.Stop[0].Day[0].R);
				let buses = results.Schedules.Stop[0].Day[0].R;
				let tableBuses = [];
				buses
					? buses.forEach((bus) => {
							// console.log(bus.S[0].$);
							tableBuses.push({
								nr: bus.$.nr,
								dir: bus.$.dir,
								timeTo: bus.S[0].$.s,
								timeAt: bus.S[0].$.t,
							});
					  })
					: null;
				let data = {
					time: results.Schedules.$.time,
					busStopName: results.Schedules.Stop[0].$.name,
					busStopID: results.Schedules.Stop[0].$.id,
					busses: tableBuses,
				};

				return res.send({
					code: 200,
					message: "correct",
					data: data,
				});
			});
		});
};
