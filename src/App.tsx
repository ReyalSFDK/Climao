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

const fallbackLocation: Position  = {
	lat: -12.974722,
	lon: -38.476665,
};

const App = () => {
	const [loading, setLoading] = React.useState(true);
	const [hasErrorOnPosition, setHasErrorOnPosition] = React.useState(false);
	const [position, setPosition] = React.useState<Position | null>(null);
	const [weatherData, setWeatherData] = React.useState<APIWeatherResponse>();
	const [geoData, setGeoData] = React.useState<APIReverseGeocode>();

	React.useEffect(
		() => {
			positionLocationRequester.askForPermissionAndGetLocation(
				(pos) => {
					setPosition(pos);
				},
				() => {
					setHasErrorOnPosition(true);
				}
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
			} else if (hasErrorOnPosition) {
				fech(fallbackLocation);
			}
		},
		[position, hasErrorOnPosition],
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
					? <Text>Erro ao pegar a localização, vamos carregar por padrão os dados da querida salvador, eo eor</Text>
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
