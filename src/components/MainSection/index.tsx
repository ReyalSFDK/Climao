import React from "react";
import { Box, Text } from "native-base";
import moment from "moment/moment";
import "moment/locale/pt-br";

interface IProps {
	city?: string;
	state?: string;
	country?: string;
	temeperature?: number;
}

export const MainSection: React.FC<IProps> = (props) => {
	const { city, state, country, temeperature } = props;

	return (
		<Box
			alignItems="center"
			paddingY={60}
		>
			<Text
				fontSize="sm"
				fontWeight="light"
				fontStyle="italic"
			>
				{moment().format("dddd, D MMMM")}
			</Text>
			<Text
				fontSize="xl"
			>
				{city || '\u00A0'}
			</Text>
			<Text
				fontSize="md"
			>
				{`${state || ""} ${country || ""}`}
			</Text>
			<Text
				fontSize="8xl"
				fontWeight="bolder"
			>
				{temeperature?.toFixed(0) || 0}º
			</Text>
		</Box>
	)
};
