import React from 'react';
import {
	SafeAreaView,
	Text,
} from 'react-native';
import { OpenWeatherAPI } from './API/OpenWeatherAPI';
import { APIReverseGeocode, APIWeatherResponse } from './API/OpenWeatherAPI/types';
import PositionLocationRequester from './API/utils/PositionLocationRequester';

const lat = -12.974722;
const lon = -38.476665;

const api = new OpenWeatherAPI();
const positionLocationRequester =  new PositionLocationRequester();

const App = () => {
	const [weatherData, setWeatherData] = React.useState<APIWeatherResponse>();
	const [geoData, setGeoData] = React.useState<APIReverseGeocode>();

	React.useEffect(
		() => {
			const fech = async () => {
				await positionLocationRequester.askForPermissionAndGetLocation();
				const weatherResponse = await api.getWeather(lat, lon);
				setWeatherData(weatherResponse);
				const geoResponse = await api.getGeoLocation(lat, lon);
				setGeoData(geoResponse[0]);
			};
			fech();
		},
		[],
	);

	return (
		<SafeAreaView>
			<Text>Testando chamadas da API</Text>
			<Text>Weather</Text>
			<Text>{JSON.stringify(weatherData)}</Text>
			<Text>-------------------------</Text>
			<Text>GEO</Text>
			<Text>{JSON.stringify(geoData)}</Text>
		</SafeAreaView>
	);
};

export default App;
