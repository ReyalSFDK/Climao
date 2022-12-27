import Axios, { AxiosInstance } from 'axios';

import { APIReverseGeocode, APIWeatherResponse } from './types';

const API_WEATHER_KEY = '79ed18677c895ac4c34decb9d6322f59';
export class OpenWeatherAPI {
	public api: AxiosInstance;
	constructor() {
		this.api = Axios.create({
			baseURL: "https://api.openweathermap.org/",
		})
	}

	public getWeather = async (lat: number, lon: number): Promise<APIWeatherResponse> => {
		const response = await this.api.get<APIWeatherResponse>(
			`data/2.5/weather`,
			{
				params: {
					lat,
					lon,
					appid: API_WEATHER_KEY,
					lang: "pt_br",
					units: "metric",
				}
			}
		)

		return response.data;
	}

	public getGeoLocation = async (lat: number, lon: number): Promise<APIReverseGeocode[]> => {
		const response = await this.api.get<APIReverseGeocode[]>(
			`geo/1.0/reverse`,
			{
				params: {
					lat,
					lon,
					appid: API_WEATHER_KEY,
					limit: 1,
				}
			}
		)

		return response.data;
	}

}
