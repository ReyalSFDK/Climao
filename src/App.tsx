import React from 'react';
import {
	SafeAreaView,
	Text,
} from 'react-native';
import { OpenWeatherAPI } from './API/OpenWeatherAPI';
import { APIReverseGeocode, APIWeatherResponse } from './API/OpenWeatherAPI/types';
import PositionLocationRequester from './API/utils/PositionLocationRequester';

const api = new OpenWeatherAPI();
const positionLocationRequester =  new PositionLocationRequester();

const App = () => {
	const [loading, setLoading] = React.useState(true);
	const [position, setPosition] = React.useState<Position | null>(null);
	const [weatherData, setWeatherData] = React.useState<APIWeatherResponse>();
	const [geoData, setGeoData] = React.useState<APIReverseGeocode>();

	React.useEffect(
		() => {
			positionLocationRequester.askForPermissionAndGetLocation(
				(pos) => {
					setPosition(pos)
				},
			);
		},
		[],
	)

	React.useEffect(
		() => {
			const fech = async (pos: Position) => {
				const weatherResponse = await api.getWeather(pos.lat, pos.lon);
				setWeatherData(weatherResponse);
				const geoResponse = await api.getGeoLocation(pos.lat, pos.lon);
				setGeoData(geoResponse[0]);
				setLoading(false);
			};

			if (position) {
				fech(position);
			}
		},
		[position],
	);

	return (
		<SafeAreaView>
			<Text>Testando chamadas da API</Text>
			{
				loading && <Text> Carregando </Text>
			}
			<Text>Weather</Text>
			{
				(!position && !loading)
					? <Text>Erro ao pegar a localização</Text>
					: (
						<>
							<Text>{JSON.stringify(weatherData)}</Text>
							<Text>-------------------------</Text>
							<Text>GEO</Text>
							<Text>{JSON.stringify(geoData)}</Text>
						</>
					)
			}
		</SafeAreaView>
	);
};

export default App;
