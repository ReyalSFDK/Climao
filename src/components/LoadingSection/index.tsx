import React from "react";
import { Spinner } from 'native-base';

export const LoadingSection: React.FC = () => (
	<Spinner
		position="absolute"
		top="2"
		alignSelf="center"
		size="lg"
		color="white"
	/>
)
