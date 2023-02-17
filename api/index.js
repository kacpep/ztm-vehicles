const axios = require("axios").default;

axios
	.get("http://einfo.erzeszow.pl/Home/GetTimetableReal?busStopId=134", {
		headers: {
			accept: "application/xml, text/xml, */*; q=0.01",
			"accept-language": "en-US,en;q=0.9,pl-PL;q=0.8,pl;q=0.7",
			"x-requested-with": "XMLHttpRequest",
			cookie:
				"BNES_TimetableVersionInfo=w34GJ/Ses36Xu09iiE4NYFCOAZKom5r/X+S9TzHxp9xM3Li0KRgK2qlLsB18sFOJNCtp83kPCBDjBUEEYd/j4SQoAWuDJNKIYFuz48B+If4=; cookies_rtm_consent=1; BNES_cookies_rtm_consent=NS5cGjQHGphmHI2IF3g/AIayO0UHHwifwP5aC2oHO/i6ARjSAEeERGbZxoO5zAbg8DAO+a9zIp/rlq24KmVYqw==; ASP.NET_SessionId=jvloetrrosywfxtjq53vn0eh; BNES_ASP.NET_SessionId=ObEuylicJ8DuUzZfrWTFzU3fgFMhKnOm+fBaqnx2MawWxmNbk1pln+r/VEaprKFUl3Y1YrLU+jJDN92klUZbJI6Hzk4B9fc289VJvqimj+rZf2Zz3Ot7Og==; TimetableVersionInfo=%22%5B%5D%22; latestsBusStopPoints=%5B%5B134%2C%22Powst.%20Warszawy%20Dom%20Studenta%2008%22%2C%2259A%22%2C1%5D%5D; BNES_latestsBusStopPoints=dEukcWDuYvJWTJT7kAloUWV3QUVqoUMtz6nvq2xL2UzZv4w48MhlYb8qEp/n2IE1/iUMJUuhWSngk5ldWHTdrVHNSiHY3Kks6XY0H6joUQt+j53T29P7b0M/6pqP1Nmxue7uHXLhkfn+BODiNiND280srVoCIyrX1nHSSeADCwuAXBISOkERrMcmVFmuNvZf",
			Referer: "http://einfo.erzeszow.pl/Home/TimeTableReal?busStopId=134",
			"Referrer-Policy": "strict-origin-when-cross-origin",
		},
	})
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => console.log(err));
