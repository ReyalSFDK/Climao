import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

export default class PositionLocationRequester {
	public static fallbackPosition: Position = {
		lat: -12.974722,
		lon: -38.476665,
	}

	public getCurrentLocation = async (onSuccessCallback: (pos: Position) => void, onErrorCallback: () => void) => {
		await Geolocation.getCurrentPosition(
			(position) => {
				onSuccessCallback({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				})
			},
			(error) => {
				onErrorCallback();
				console.log("Err", error)
			},
			{
				showLocationDialog: true,
				forceRequestLocation: true,
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 10000,
			}
		)
	}

	public askForPermissionAndGetLocation = async (onSuccessCallback: (pos: Position) => void, onErrorCallback: () => void) => {
		try {
			const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

			if (!hasPermission) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Precisamos da sua localização",
						message: "Para podermos retornar o clima atual do seu local, precisamos da permissão para pegar sua localização.",
						buttonPositive: "Beleza!",
						buttonNegative: "Não, obrigado...",
						buttonNeutral: "Talvez uma outra hora.",
					},
				);

				if (granted !== "granted") {
					onErrorCallback();
					return;
				}
			}

			await this.getCurrentLocation(onSuccessCallback, onErrorCallback);
		} catch (e) {
			console.log(e);
		}
	}
}
