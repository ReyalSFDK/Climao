import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

export default class PositionLocationRequester {
	public getCurrentLocation = async () => {
		await Geolocation.getCurrentPosition(
			(position) => {
				console.log("pos", position);
			},
			(error) => {
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

	public askForPermissionAndGetLocation = async () => {
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
					return;
				}
			}

			await this.getCurrentLocation();
		} catch (e) {
			console.log(e);
		}
	}
}
