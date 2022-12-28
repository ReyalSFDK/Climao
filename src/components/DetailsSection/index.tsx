import React from "react";
import { Box, Text, Button } from "native-base";
import { ErrorPositionSection } from '../ErrorPositionSection';

interface IProps {
	tempMin?: number;
	tempMax?: number;
	feelsLike?: number;
	windSpeed?: number;
	humidity?: number;
	onRefreshPress: () => Promise<void>;
	loading?: boolean;
	hasFallback?: boolean;
}

export const DetailsSection: React.FC<IProps> = (props) => {
	const {
		tempMin,
		tempMax,
		feelsLike,
		windSpeed,
		humidity,
		loading,
		onRefreshPress,
		hasFallback,
	} = props;

	return (
		<Box
			w="full"
			position="absolute"
			bottom={0}
			backgroundColor="#0155B730"
		>
			{
				hasFallback && (
					<ErrorPositionSection />
				)
			}
			<Box
				paddingX={10}
				paddingY={5}
			>
				<Text variant="infoTitle">
					Temperatura Miníma
				</Text>
				<Text variant="infoText">
					{tempMin?.toFixed(0) || 0}º
				</Text>
				<Text variant="infoTitle">
					Temperatura Máxima
				</Text>
				<Text variant="infoText">
					{tempMax?.toFixed(0) || 0}º
				</Text>
				<Text variant="infoTitle">
					Sensação Térmica
				</Text>
				<Text variant="infoText">
					{feelsLike?.toFixed(0) || 0}º
				</Text>
				<Text variant="infoTitle">
					Velocidade do Vento
				</Text>
				<Text variant="infoText">
					{windSpeed || 0} m/s
				</Text>
				<Text variant="infoTitle">
					Umidade
				</Text>
				<Text variant="infoText">
					{humidity || 0}%
				</Text>
			</Box>
			<Button
				onPress={() => onRefreshPress()}
				disabled={loading}
				color="white"
				size="lg"
				fontWeight="bold"
				bgColor={!loading ? "#0155B7" : "#0155B730"}
			>
				{loading ? "Atualizando..." : "Atualizar"}
			</Button>
		</Box>
	)
};
