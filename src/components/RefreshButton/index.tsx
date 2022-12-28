import React from "react";
import { Button } from "native-base";

interface IProps {
	onRefreshPress: () => Promise<void>;
	isLoading?: boolean;
}

export const RefreshButton: React.FC<IProps> = (props) => {
	const { isLoading, onRefreshPress } = props;

	return (
		<Button
			onPress={() => onRefreshPress()}
			disabled={isLoading}
			color="white"
			size="lg"
			fontWeight="bold"
			bgColor={!isLoading ? "#0155B7" : "#0155B730"}
		>
			{isLoading ? "Atualizando..." : "Atualizar"}
		</Button>
	);
};
