export const getMoonIcon = (moonPhase) => {
	if (moonPhase === "First Quarter") return "π";
	if (moonPhase === "Waxing Crescent") return "π";
	if (moonPhase === "New Moon") return "π";
	if (moonPhase === "Waning Crescent") return "π";
	if (moonPhase === "Third Quarter") return "π";
	if (moonPhase === "Waning Gibbous") return "π";
	if (moonPhase === "Full Moon") return "π";
	if (moonPhase === "Wazing Gibbous") return "π";
};

export const weatherIcon = (weather: number) => {
	const icons = [
		{
			code: 1000,
			day: "Sunny",
			night: "Clear",
			icon: "βοΈ",
		},
		{
			code: 1003,
			day: "Partly cloudy",
			night: "Partly cloudy",
			icon: "π€",
		},
		{
			code: 1006,
			day: "Cloudy",
			night: "Cloudy",
			icon: "π₯",
		},
		{
			code: 1009,
			day: "Overcast",
			night: "Overcast",
			icon: "βοΈ",
		},
		{
			code: 1030,
			day: "Mist",
			night: "Mist",
			icon: "π§",
		},
		{
			code: 1063,
			day: "Patchy rain possible",
			night: "Patchy rain possible",
			icon: "π¦",
		},
		{
			code: 1066,
			day: "Patchy snow possible",
			night: "Patchy snow possible",
			icon: "π¨",
		},
		{
			code: 1069,
			day: "Patchy sleet possible",
			night: "Patchy sleet possible",
			icon: "π¨",
		},
		{
			code: 1072,
			day: "Patchy freezing drizzle possible",
			night: "Patchy freezing drizzle possible",
			icon: "π¨",
		},
		{
			code: 1087,
			day: "Thundery outbreaks possible",
			night: "Thundery outbreaks possible",
			icon: "π©",
		},
		{
			code: 1114,
			day: "Blowing snow",
			night: "Blowing snow",
			icon: "π¨",
		},
		{
			code: 1117,
			day: "Blizzard",
			night: "Blizzard",
			icon: "π¨",
		},
		{
			code: 1135,
			day: "Fog",
			night: "Fog",
			icon: "πΆβπ«οΈ",
		},
		{
			code: 1147,
			day: "Freezing fog",
			night: "Freezing fog",
			icon: "βοΈ",
		},
		{
			code: 1150,
			day: "Patchy light drizzle",
			night: "Patchy light drizzle",
			icon: "βοΈ",
		},
		{
			code: 1153,
			day: "Liht drizzle",
			night: "Light drizzle",
			icon: "βοΈ",
		},
		{
			code: 1168,
			day: "Freezing drizzle",
			night: "Freezing drizzle",
			icon: "βοΈβοΈ",
		},
		{
			code: 1171,
			day: "Heavy freezing drizzle",
			night: "Heavy freezing drizzle",
			icon: "βοΈβοΈ",
		},
		{
			code: 1180,
			day: "Patchy light rain",
			night: "Patchy light rain",
			icon: "βοΈ",
		},
		{
			code: 1183,
			day: "Light rain",
			night: "Light rain",
			icon: "βοΈ",
		},
		{
			code: 1186,
			day: "Moderate rain at times",
			night: "Moderate rain at times",
			icon: "π§",
		},
		{
			code: 1189,
			day: "Moderate rain",
			night: "Moderate rain",
			icon: "π§",
		},
		{
			code: 1192,
			day: "Heavy rain at times",
			night: "Heavy rain at times",
			icon: "π§",
		},
		{
			code: 1195,
			day: "Heavy rain",
			night: "Heavy rain",
			icon: "π§",
		},
		{
			code: 1198,
			day: "Light freezing rain",
			night: "Light freezing rain",
			icon: "π§βοΈ",
		},
		{
			code: 1201,
			day: "Moderate or heavy freezing rain",
			night: "Moderate or heavy freezing rain",
			icon: "π§βοΈ",
		},
		{
			code: 1204,
			day: "Light sleet",
			night: "Light sleet",
			icon: "π¨",
		},
		{
			code: 1207,
			day: "Moderate or heavy sleet",
			night: "Moderate or heavy sleet",
			icon: "π¨",
		},
		{
			code: 1210,
			day: "Patchy light snow",
			night: "Patchy light snow",
			icon: "π¨",
		},
		{
			code: 1213,
			day: "Light snow",
			night: "Light snow",
			icon: "π¨",
		},
		{
			code: 1216,
			day: "Patchy moderate snow",
			night: "Patchy moderate snow",
			icon: "π¨",
		},
		{
			code: 1219,
			day: "Moderate snow",
			night: "Moderate snow",
			icon: "π¨",
		},
		{
			code: 1222,
			day: "Patchy heavy snow",
			night: "Patchy heavy snow",
			icon: "π¨",
		},
		{
			code: 1225,
			day: "Heavy snow",
			night: "Heavy snow",
			icon: "π¨",
		},
		{
			code: 1237,
			day: "Ice pellets",
			night: "Ice pellets",
			icon: "π¨",
		},
		{
			code: 1240,
			day: "Light rain shower",
			night: "Light rain shower",
			icon: "π§",
		},
		{
			code: 1243,
			day: "Moderate or heavy rain shower",
			night: "Moderate or heavy rain shower",
			icon: "π§",
		},
		{
			code: 1246,
			day: "Torrential rain shower",
			night: "Torrential rain shower",
			icon: "π§",
		},
		{
			code: 1249,
			day: "Light sleet showers",
			night: "Light sleet showers",
			icon: "π¨π§",
		},
		{
			code: 1252,
			day: "Moderate or heavy sleet showers",
			night: "Moderate or heavy sleet showers",
			icon: "π¨π§",
		},
		{
			code: 1255,
			day: "Light snow showers",
			night: "Light snow showers",
			icon: "π¨π§",
		},
		{
			code: 1258,
			day: "Moderate or heavy snow showers",
			night: "Moderate or heavy snow showers",
			icon: "π¨π§",
		},
		{
			code: 1261,
			day: "Light showers of ice pellets",
			night: "Light showers of ice pellets",
			icon: "π¨βοΈ",
		},
		{
			code: 1264,
			day: "Moderate or heavy showers of ice pellets",
			night: "Moderate or heavy showers of ice pellets",
			icon: "π§βοΈ",
		},
		{
			code: 1273,
			day: "Patchy light rain with thunder",
			night: "Patchy light rain with thunder",
			icon: "β",
		},
		{
			code: 1276,
			day: "Moderate or heavy rain with thunder",
			night: "Moderate or heavy rain with thunder",
			icon: "β",
		},
		{
			code: 1279,
			day: "Patchy light snow with thunder",
			night: "Patchy light snow with thunder",
			icon: "π¨β‘οΈ",
		},
		{
			code: 1282,
			day: "Moderate or heavy snow with thunder",
			night: "Moderate or heavy snow with thunder",
			icon: "π¨β‘οΈ",
		},
	];
	return icons.find((icon) => icon.code === weather);
};

export const calcAQICategory = (pm2: number) => {
	let aqiHi = 0,
		aqiLo = 0,
		bpHi = 0,
		bpLo = 0,
		aqi = 0,
		concern = "",
		message = "",
		color = "";

	if (pm2 < 12) {
		aqiHi = 50;
		bpHi = 12;
		concern = "Good";
		message =
			"Air quality is satisfactory, and air pollution poses little or no risk.";
		color = "text-green-500";
	} else if (pm2 < 35.4) {
		aqiHi = 100;
		aqiLo = 51;
		bpHi = 35.4;
		bpLo = 12;
		concern = "Moderate";
		message =
			"Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.";
		color = "text-yellow-500";
	} else if (pm2 < 55.4) {
		aqiHi = 150;
		aqiLo = 101;
		bpHi = 55.4;
		bpLo = 35.4;
		concern = "Unhealthy for Sensitive Groups";
		message =
			"Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
		color = "text-orange-500";
	} else if (pm2 < 150.4) {
		aqiHi = 200;
		aqiLo = 151;
		bpHi = 150.4;
		bpLo = 55.4;
		concern = "Unhealthy";
		message =
			"Some members of the general public may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
		color = "text-red-500";
	} else if (pm2 < 250.4) {
		aqiHi = 300;
		aqiLo = 201;
		bpHi = 250.4;
		bpLo = 150.4;
		concern = "Very Unhealthy";
		message =
			"Health alert: The risk of health effects is increased for everyone.";
		color = "text-purple-500";
	} else if (pm2 < 350.4) {
		aqiHi = 400;
		aqiLo = 301;
		bpHi = 350.4;
		bpLo = 250.4;
		concern = "Hazardous";
		message =
			"Health alert: The risk of health effects is increased for everyone.";
		color = "text-rose-700";
	} else if (pm2 < 500.4) {
		aqiHi = 500;
		aqiLo = 401;
		bpHi = 500.4;
		bpLo = 350.4;
		concern = "Hazardous";
		message =
			"Health alert: The risk of health effects is increased for everyone.";
		color = "text-rose-700";
	}

	aqi = Math.round(((aqiHi - aqiLo) / (bpHi - bpLo)) * (pm2 - bpLo) + aqiLo);

	return { aqi, color, message, concern };
};

export const getUVIndex = (uv: number) => {
	let color = "",
		status = "",
		message = "",
		messageShort = "";
	if (uv < 3) {
		color = "text-green-500";
		status = "Low Risk:";
		message = "Minimal sun protection required.";
		messageShort = "Minimal sun protection required.";
	} else if (uv < 6) {
		color = "text-yellow-500";
		status = "Moderate Risk:";
		message =
			"Take precautions. Cover up, wear a hat, UVA and UVB-protective eyewear (e.g. sunglasses), and sunscreen SPF 30 or higher.";
		messageShort = "Take precautions.";
	} else if (uv < 8) {
		color = "text-orange-500";
		status = "High Risk:";
		message = "Protection required. UV damages skin and can cause sunburn.";
		messageShort = "Protection required.";
	} else if (uv < 11) {
		color = "text-red-500";
		status = "Very High Risk:";
		message =
			"Extra protection required. Unprotected skin will be damaged and can burn quickly.";
		messageShort = "Extra protection required.";
	} else {
		color = "text-purple-500";
		status = "Extreme Risk:";
		message =
			"Maximum protection required. Avoid the sun between 11 a.m. and 3 p.m. Remain in the shade, cover up, wear a hat, sunglasses and sunscreen.";
		messageShort = "Maximum protection required.";
	}
	return { color, status, message, uv, messageShort };
};
