/* eslint-disable no-undef */
//Weather Types
interface Location {
	country: string;
	lat: number;
	localtime: string;
	localtime_epoch: number;
	lon: number;
	name: string;
	region: string;
	tz_id: string;
}

interface ForecastDay {
	date: string;
	date_epoch: number;
	astro: {
		moon_illumination: string;
		moonrise: string;
		moonset: string;
		sunrise: string;
		sunset: string;
		moon_phase: string;
	};
	day: {
		avghumidity: number;
		avgtemp_c: number;
		avgtemp_f: number;
		condition: {
			code: number;
			icon: string;
			text: string;
		};
		avgvis_km: number;
		avgvis_miles: number;
		daily_chance_of_rain: number;
		daily_chance_of_snow: number;
		daily_will_it_rain: number;
		daily_will_it_snow: number;
		maxtemp_c: number;
		maxtemp_f: number;
		maxwind_kph: number;
		maxwind_mph: number;
		mintemp_c: number;
		mintemp_f: number;
		totalprecip_in: number;
		totalprecip_mm: number;
		uv: number;
	};
	hour: ({
		chance_of_rain: number;
		chance_of_snow: number;
		time: string;
		time_epoch: number;
		windchill_c: number;
		windchill_f: number;
	} & Omit<
		WeatherData,
		"air_quality" | "last_updated" | "last_updated_epoch"
	>)[];
}

interface AirQuality {
	co: number;
	"gb-defra-index": number;
	no2: number;
	o3: number;
	pm10: number;
	pm2_5: number;
	so2: number;
	"us-epa-index": number;
}

interface WeatherData {
	air_quality: AirQuality;
	cloud: number;
	condition: {
		code: number;
		icon: string;
		text: string;
	};
	feelslike_c: number;
	feelslike_f: number;
	gust_kph: number;
	gust_mph: number;
	humidity: number;
	is_day: number;
	last_updated: string;
	last_updated_epoch: number;
	precip_in: number;
	precip_mm: number;
	pressure_in: number;
	pressure_mb: number;
	temp_c: number;
	temp_f: number;
	uv: number;
	vis_km: number;
	vis_miles: number;
	wind_degree: number;
	wind_dir: string;
	wind_kph: number;
	wind_mph: number;
}

interface Forecast {
	forecastday: ForecastDay[];
}

export interface Weather {
	location: Location;
	forecast: Forecast;
	current: WeatherData;
}

// Point Types

export interface Point extends GeoJSON.Point {
	geometry: {
		type: string;
		coordinates: number[];
	};
	properties: {
		description: string;
		station_id: string;
		station_name: string;
		timezone: string;
		elevation: number;
		insolation: number;
		insolation_predicted: number;
		insolation_predicted_units: string;
		insolation_units: string;
		observation_time: string;
		pressure: number;
		pressure_units: string;
		pressure_trend: string;
		rain: number;
		rain_units: string;
		rain_rate: number;
		rain_rate_units: string;
		station_long_name: string;
		temperature: number;
		temperature_units: string;
		uv_index: number;
		uv_index_units: string;
		wind_speed_direction: number;
		wind_speed: number;
	};
	type: "Point";
}

export interface PointsData {
	points: GeoJSON.FeatureCollection<Point>;
	min_point: Point;
	max_point: Point;
	average_temp: number;
}

//Map Types

interface Isoband extends GeoJSON.Feature<GeoJSON.Polygon> {
	properties: {
		fill: string;
		temperature: string;
	};
}

export interface MapData {
	intersection: {
		intersection: GeoJSON.FeatureCollection<null, Isoband>;
	};
	island: {
		island: GeoJSON.Feature<GeoJSON.Polygon>;
	};
}

export interface RainData {
	average_rain: number | null;
	number_reporting: number | null;
	max_rain: Partial<Point> | null;
}

export interface DashProp {
	dash?: boolean;
}
