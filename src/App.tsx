import React from 'react';
import {
	ImageBackground,
	SafeAreaView,
} from 'react-native';
import { NativeBaseProvider, StatusBar, View } from 'native-base';

import { OpenWeatherAPI } from './API/OpenWeatherAPI';
import { APIReverseGeocode, APIWeatherResponse } from './API/OpenWeatherAPI/types';
import { DetailsSection, LoadingSection, MainSection } from './components';
import { theme } from './theme';
import PositionLocationRequester from './utils/PositionLocationRequester';

// https://www.wallpaperize.cc/2020/09/beautiful-phone-wallpapers-day-and.html
const dayImage = require('../assets/images/day.png');
const nightImage = require('../assets/images/night.png');

const App = () => {
	const api = new OpenWeatherAPI();
	const positionLocationRequester =  new PositionLocationRequester();

	const [isLoading, setIsLoading] = React.useState(true);
	const [hasErrorOnPosition, setHasErrorOnPosition] = React.useState(false);
	const [position, setPosition] = React.useState<Position | null>(null);
	const [weatherData, setWeatherData] = React.useState<APIWeatherResponse>();
	const [geoData, setGeoData] = React.useState<APIReverseGeocode>();

	const hours = new Date().getHours()
	const isDayTime = hours > 6 && hours < 19

	const image = isDayTime ? dayImage : nightImage;

	const fetchData = async () => {
		const fech = async (pos: Position) => {
			setIsLoading(true);
			const weatherResponse = await api.getWeather(pos.lat, pos.lon);
			setWeatherData(weatherResponse);
			const geoResponse = await api.getGeoLocation(pos.lat, pos.lon);
			setGeoData(geoResponse[0]);
			setIsLoading(false);
		};

		if (position) {
			fech(position);
		} else if (hasErrorOnPosition) {
			fech(PositionLocationRequester.fallbackPosition);
		}
	}

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
			fetchData();
		},
		[position, hasErrorOnPosition],
	);

	return (
			<NativeBaseProvider theme={theme}>
				<SafeAreaView>
					<StatusBar
						backgroundColor={isDayTime ? "#0256B7" : "#001D55"}
					/>
					<ImageBackground
						source={image}
						resizeMode="cover"
					>
						<View
							display="flex"
							height="full"
						>
							{
								isLoading && (
									<LoadingSection />
								)
							}
							<MainSection
								country={geoData?.country}
								state={geoData?.state}
								city={geoData?.name}
								temeperature={weatherData?.main.temp}
							/>
							<DetailsSection
								loading={isLoading}
								onRefreshPress={() => fetchData()}
								humidity={weatherData?.main.humidity}
								windSpeed={weatherData?.wind.speed}
								feelsLike={weatherData?.main.feels_like}
								tempMax={weatherData?.main.temp_max}
								tempMin={weatherData?.main.temp_min}
							/>
						</View>
					</ImageBackground>
				</SafeAreaView>
			</NativeBaseProvider>
	);
};

export default App;
