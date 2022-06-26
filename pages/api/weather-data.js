export default async function Handler(_req, res) {

    const data = await (await fetch("https://api.weatherapi.com/v1/forecast.json?key=236a08e4d6dc414092a40006211210&q=Victoria BC&days=3&aqi=yes&alerts=no")).json()

    res.json(data);
}