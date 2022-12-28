import React from "react";
import "react-native";
import { faker } from "@faker-js/faker";

import {
	DetailsItemRow,
	DetailsSection,
	ErrorPositionSection,
	LoadingSection,
	MainSection,
	RefreshButton,
} from "../src/components";
import { theme } from "../src/theme";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { NativeBaseProvider } from "native-base";

describe("Testing all components", () => {
	it("renders DetailsItemRow correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<DetailsItemRow info="Info Test" title="Title Test"/>
			</NativeBaseProvider>,
		);
	});

	it("renders DetailsSection correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<DetailsSection
					onRefreshPress={() => Promise.resolve()}
					loading={faker.datatype.boolean()}
					hasFallback={faker.datatype.boolean()}
					tempMin={faker.datatype.number(40)}
					tempMax={faker.datatype.number(40)}
					feelsLike={faker.datatype.number(40)}
					windSpeed={faker.datatype.number({ precision: 0.01, min: 1, max: 30 })}
					humidity={faker.datatype.number(100)}
				/>
			</NativeBaseProvider>,
		);
	});

	it("renders ErrorPositionSection correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<ErrorPositionSection />
			</NativeBaseProvider>,
		);
	});

	it("renders LoadingSection correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<LoadingSection />
			</NativeBaseProvider>,
		);
	});

	it("renders MainSection correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<MainSection
					city={faker.address.city()}
					temeperature={faker.datatype.number(40)}
					state={faker.address.state()}
				/>
			</NativeBaseProvider>,
		);
	});


	it("renders RefreshButton correctly", () => {
		renderer.create(
			<NativeBaseProvider theme={theme}>
				<RefreshButton
					isLoading={faker.datatype.boolean()}
					onRefreshPress={() => Promise.resolve()}
				/>
			</NativeBaseProvider>,
		);
	});
});
