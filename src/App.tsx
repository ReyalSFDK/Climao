import React from 'react';
import {
	SafeAreaView,
	Text,
} from "react-native";
import Axios from 'axios';

const API_WEATHER_KEY = '79ed18677c895ac4c34decb9d6322f59';
const lat = -12.974722;
const lon = -38.476665;


const App = () => {
	const [weatherData, setWeatherData] = React.useState();
	const [geoData, setGeoData] = React.useState();

	React.useEffect(
		() => {
			const fech = async () => {
				const weatherResponse = await Axios.get(
					"https://api.openweathermap.org/data/2.5/weather",
					{
						params: {
							lat,
							lon,
							appid: API_WEATHER_KEY,
							lang: "pt_br",
							units: "metric",
						}
					}
				);
				setWeatherData(weatherResponse.data);
				const geoResponse = await Axios.get(
					"https://api.openweathermap.org/geo/1.0/reverse",
					{
						params: {
							lat,
							lon,
							appid: API_WEATHER_KEY,
							limit: 1,
						}
					}
				);
				setGeoData(geoResponse.data);
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
