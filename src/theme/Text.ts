import { ComponentTheme } from 'native-base';

export const Text: ComponentTheme = {
	defaultProps: {
		fontFamily: "Body",
		color: "white",
	},
	variants: {
		infoTitle: {
			width: "full",
			bgColor: "#000000FF",
			fontWeight: 100,
			fontStyle: "italic",
			fontSize: "sm",
			marginBottom: "-2"
		},
		infoText: {
			textAlign: "right",
			width: "full",
			bgColor: "#000000FF",
			fontWeight: "black",
			fontSize: "xl",
			marginBottom: 2,
		},
	},
}
