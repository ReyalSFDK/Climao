export interface APIWeatherResponse {
	name: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
	},
	wind: {
		speed: number;
		deg: number;
	},
	weather: Array<{
		id: string;
		main: string;
		description: string;
		icon: string;
	}>;
}

export interface APIReverseGeocode {
	name: string;
	country: string;
	state: string;
	local_names: {
		pt: string;
	};
}
