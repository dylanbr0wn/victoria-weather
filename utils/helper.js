export const getMoonIcon = (moonPhase) => {
    if (moonPhase === "First Quarter") return "🌓";
    if (moonPhase === "Waxing Crescent") return "🌒";
    if (moonPhase === "New Moon") return "🌑";
    if (moonPhase === "Waning Crescent") return "🌘";
    if (moonPhase === "Third Quarter") return "🌗";
    if (moonPhase === "Waning Gibbous") return "🌖";
    if (moonPhase === "Full Moon") return "🌕";
    if (moonPhase === "Wazing Gibbous") return "🌔";
};

export const weatherIcon = (weather) => {
    const icons = [{
        "code": 1000,
        "day": "Sunny",
        "night": "Clear",
        "icon": "☀️"
    },
    {
        "code": 1003,
        "day": "Partly cloudy",
        "night": "Partly cloudy",
        "icon": "🌤"
    },
    {
        "code": 1006,
        "day": "Cloudy",
        "night": "Cloudy",
        "icon": "🌥"
    },
    {
        "code": 1009,
        "day": "Overcast",
        "night": "Overcast",
        "icon": "☁️"
    },
    {
        "code": 1030,
        "day": "Mist",
        "night": "Mist",
        "icon": "🌧"
    },
    {
        "code": 1063,
        "day": "Patchy rain possible",
        "night": "Patchy rain possible",
        "icon": "🌦"
    },
    {
        "code": 1066,
        "day": "Patchy snow possible",
        "night": "Patchy snow possible",
        "icon": "🌨"
    },
    {
        "code": 1069,
        "day": "Patchy sleet possible",
        "night": "Patchy sleet possible",
        "icon": "🌨"
    },
    {
        "code": 1072,
        "day": "Patchy freezing drizzle possible",
        "night": "Patchy freezing drizzle possible",
        "icon": "🌨"
    },
    {
        "code": 1087,
        "day": "Thundery outbreaks possible",
        "night": "Thundery outbreaks possible",
        "icon": "🌩"
    },
    {
        "code": 1114,
        "day": "Blowing snow",
        "night": "Blowing snow",
        "icon": "🌨"
    },
    {
        "code": 1117,
        "day": "Blizzard",
        "night": "Blizzard",
        "icon": "🌨"
    },
    {
        "code": 1135,
        "day": "Fog",
        "night": "Fog",
        "icon": "😶‍🌫️"
    },
    {
        "code": 1147,
        "day": "Freezing fog",
        "night": "Freezing fog",
        "icon": "❄️"
    },
    {
        "code": 1150,
        "day": "Patchy light drizzle",
        "night": "Patchy light drizzle",
        "icon": "☔️"
    },
    {
        "code": 1153,
        "day": "Liht drizzle",
        "night": "Light drizzle",
        "icon": "☔️"
    },
    {
        "code": 1168,
        "day": "Freezing drizzle",
        "night": "Freezing drizzle",
        "icon": "☔️❄️"
    },
    {
        "code": 1171,
        "day": "Heavy freezing drizzle",
        "night": "Heavy freezing drizzle",
        "icon": "☔️❄️"
    },
    {
        "code": 1180,
        "day": "Patchy light rain",
        "night": "Patchy light rain",
        "icon": "☔️"
    },
    {
        "code": 1183,
        "day": "Light rain",
        "night": "Light rain",
        "icon": "☔️"
    },
    {
        "code": 1186,
        "day": "Moderate rain at times",
        "night": "Moderate rain at times",
        "icon": "🌧"
    },
    {
        "code": 1189,
        "day": "Moderate rain",
        "night": "Moderate rain",
        "icon": "🌧"
    },
    {
        "code": 1192,
        "day": "Heavy rain at times",
        "night": "Heavy rain at times",
        "icon": "🌧"
    },
    {
        "code": 1195,
        "day": "Heavy rain",
        "night": "Heavy rain",
        "icon": "🌧"
    },
    {
        "code": 1198,
        "day": "Light freezing rain",
        "night": "Light freezing rain",
        "icon": "🌧❄️"
    },
    {
        "code": 1201,
        "day": "Moderate or heavy freezing rain",
        "night": "Moderate or heavy freezing rain",
        "icon": "🌧❄️"
    },
    {
        "code": 1204,
        "day": "Light sleet",
        "night": "Light sleet",
        "icon": "🌨"
    },
    {
        "code": 1207,
        "day": "Moderate or heavy sleet",
        "night": "Moderate or heavy sleet",
        "icon": "🌨"
    },
    {
        "code": 1210,
        "day": "Patchy light snow",
        "night": "Patchy light snow",
        "icon": "🌨"
    },
    {
        "code": 1213,
        "day": "Light snow",
        "night": "Light snow",
        "icon": "🌨"
    },
    {
        "code": 1216,
        "day": "Patchy moderate snow",
        "night": "Patchy moderate snow",
        "icon": "🌨"
    },
    {
        "code": 1219,
        "day": "Moderate snow",
        "night": "Moderate snow",
        "icon": "🌨"
    },
    {
        "code": 1222,
        "day": "Patchy heavy snow",
        "night": "Patchy heavy snow",
        "icon": "🌨"
    },
    {
        "code": 1225,
        "day": "Heavy snow",
        "night": "Heavy snow",
        "icon": "🌨"
    },
    {
        "code": 1237,
        "day": "Ice pellets",
        "night": "Ice pellets",
        "icon": "🌨"
    },
    {
        "code": 1240,
        "day": "Light rain shower",
        "night": "Light rain shower",
        "icon": "🌧"
    },
    {
        "code": 1243,
        "day": "Moderate or heavy rain shower",
        "night": "Moderate or heavy rain shower",
        "icon": "🌧"
    },
    {
        "code": 1246,
        "day": "Torrential rain shower",
        "night": "Torrential rain shower",
        "icon": "🌧"
    },
    {
        "code": 1249,
        "day": "Light sleet showers",
        "night": "Light sleet showers",
        "icon": "🌨🌧"
    },
    {
        "code": 1252,
        "day": "Moderate or heavy sleet showers",
        "night": "Moderate or heavy sleet showers",
        "icon": "🌨🌧"
    },
    {
        "code": 1255,
        "day": "Light snow showers",
        "night": "Light snow showers",
        "icon": "🌨🌧"
    },
    {
        "code": 1258,
        "day": "Moderate or heavy snow showers",
        "night": "Moderate or heavy snow showers",
        "icon": "🌨🌧"
    },
    {
        "code": 1261,
        "day": "Light showers of ice pellets",
        "night": "Light showers of ice pellets",
        "icon": "🌨❄️"
    },
    {
        "code": 1264,
        "day": "Moderate or heavy showers of ice pellets",
        "night": "Moderate or heavy showers of ice pellets",
        "icon": "🌧❄️"
    },
    {
        "code": 1273,
        "day": "Patchy light rain with thunder",
        "night": "Patchy light rain with thunder",
        "icon": "⛈"
    },
    {
        "code": 1276,
        "day": "Moderate or heavy rain with thunder",
        "night": "Moderate or heavy rain with thunder",
        "icon": "⛈"
    },
    {
        "code": 1279,
        "day": "Patchy light snow with thunder",
        "night": "Patchy light snow with thunder",
        "icon": "🌨⚡️"
    },
    {
        "code": 1282,
        "day": "Moderate or heavy snow with thunder",
        "night": "Moderate or heavy snow with thunder",
        "icon": "🌨⚡️"
    }]
    return icons.find(icon => icon.code === weather)
}