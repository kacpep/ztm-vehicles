var parseString = require("xml2js").parseString;
const axios = require("axios").default;

var nowTracked = [];
setInterval(function () {
	nowTracked = [];
}, 300000);

module.exports = (req, res) => {
	let id = req.query.id;
	!id ? (id = 1) : null;
	const get = () => {
		axios(`http://einfo.erzeszow.pl/Home/GetTimetableReal?busStopId=${id}`).then((response) => {
			// console.log(response.data);
			parseString(response.data, function (err, results) {
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
					lastTime: Date.now(),
					time: results.Schedules.$.time,
					busStopName: results.Schedules.Stop[0].$.name,
					busStopID: results.Schedules.Stop[0].$.id,
					busses: tableBuses,
				};
				nowTracked.push(data);

				return res.send({
					code: 200,
					message: "correct2",
					data: data,
				});
			});
		});
	};
	if (nowTracked.find(({ busStopID }) => parseInt(busStopID) == parseInt(id))) {
		let test = nowTracked.find(({ busStopID, lastTime }) => busStopID == id && lastTime > Date.now() - 5000);
		if (test) {
			return res.send({
				code: 200,
				message: "correct1",
				data: test,
			});
		} else {
			get();
		}
	} else {
		get();
	}
};
