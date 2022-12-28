import { OpenWeatherAPI } from '../src/API/OpenWeatherAPI';
import { faker } from '@faker-js/faker';
import { APIWeatherResponse } from '../src/API/OpenWeatherAPI/types';
describe('Testing OpenAPI requests', () => {
	const api = new OpenWeatherAPI();

	it('should able to get reverse geoLocation', async () => {
		await expect(api.getGeoLocation(
			+faker.address.latitude(),
			+faker.address.longitude(),
		))
			.resolves
			.toBeDefined();
	});

	it('should dont able to get reverse geoLocation', async () => {
		await expect(api.getGeoLocation(
			999999999999,
			999999999999,
		))
			.rejects
			.toBeDefined();
	});

	it('should able to get weather', async () => {
		const coord: Position = {
			lat: +faker.address.latitude(),
			lon: +faker.address.longitude(),
		};

		await expect(api.getWeather(
			coord.lat,
			coord.lon,
		))
			.resolves
			.toMatchObject<Pick<APIWeatherResponse, "coord">>({ coord });
	});

	it('should dont able to get weather', async () => {
		await expect(api.getWeather(
			999999999999,
			999999999999,
		))
			.rejects
			.toBeDefined();
	});
});
