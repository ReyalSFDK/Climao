import React from "react";
import { Box, Text } from "native-base";

export const ErrorPositionSection: React.FC = () => (
	<Box
		padding={2}
		backgroundColor="#00000050"
	>
		<Text
			fontSize={14}
			textAlign="center"
		>
			Infelizmente não conseguimos obter sua localização, verifique as permissões do aplicativo e tente reinicia-lo.
		</Text>
		<Text
			fontSize={12}
			paddingY={2}
			fontWeight="bold"
			textAlign="center"
		>
			Enquanto isso veja como está o tempo na nossa querida Salvador.
		</Text>
	</Box>
);
