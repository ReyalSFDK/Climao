import React from "react";
import { Text } from "native-base";

interface IProps {
	title?: string;
	info?: string;
}

export const DetailsItemRow: React.FC<IProps> = (props) => {
	const { info, title } = props;

	return (
		<>
			<Text variant="infoTitle">
				{title}
			</Text>
			<Text variant="infoText">
				{info}
			</Text>
		</>
	);
};
