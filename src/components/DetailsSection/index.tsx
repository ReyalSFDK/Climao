import React from "react";
import { Box } from "native-base";

import { ErrorPositionSection } from "../ErrorPositionSection";
import { RefreshButton } from "../RefreshButton";
import { DetailsItemRow } from "../DetailsItemRow";

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
				<DetailsItemRow
					title="Temperatura Miníma"
					info={`${tempMin?.toFixed(0) || 0}º`}
				/>
				<DetailsItemRow
					title="Temperatura Máxima"
					info={`${tempMax?.toFixed(0) || 0}º`}
				/>
				<DetailsItemRow
					title="Sensação Térmica"
					info={`${feelsLike?.toFixed(0) || 0}º`}
				/>
				<DetailsItemRow
					title="Velocidade do Vento"
					info={`${windSpeed || 0}º`}
				/>
				<DetailsItemRow
					title="Umidade"
					info={`${humidity || 0}º`}
				/>
			</Box>
			<RefreshButton onRefreshPress={onRefreshPress} isLoading={loading} />
		</Box>
	);
};
