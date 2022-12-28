export interface APIWeatherResponse {
	name: string;
	coord: Position;
	main: MainWeatherData;
	wind: Wind;
	weather: Weather[];
}

export interface  Weather {
	id: string;
	main: string;
	description: string;
	icon: string;
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface MainWeatherData {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
}

export interface APIReverseGeocode {
	name: string;
	country: string;
	state: string;
	local_names: {
		pt: string;
	};
}
