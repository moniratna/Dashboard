import { merge } from "lodash";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box, TextField } from "@mui/material";
//
import BaseOptionChart from "./BaseOptionChart";

// ----------------------------------------------------------------------

const CHART_DATA = [
	{
		year: 2019,
		data: [
			{ name: "Asia", data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
			{ name: "America", data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
		],
	},
	{
		year: 2020,
		data: [
			{ name: "Asia", data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
			{ name: "America", data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
		],
	},
];

export default function AppAreaInstalled() {
	const [seriesData, setSeriesData] = useState(2019);

	const handleChangeSeriesData = (event) => {
		setSeriesData(Number(event.target.value));
	};

	const chartOptions = merge(BaseOptionChart(), {
		xaxis: {
			categories: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
			],
		},
	});

	return (
		<Card
			style={{
				borderRadius: "16px",
				boxShadow: "9px 9px 20px rgba(0, 0, 0, 0.1)",
			}}
		>
			<CardHeader title="Current Market" subheader="(+43%) than last year" />

			{CHART_DATA.map((item) => (
				<Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
					{item.year === seriesData && (
						<ReactApexChart
							type="line"
							series={item.data}
							options={chartOptions}
							height={345}
						/>
					)}
				</Box>
			))}
		</Card>
	);
}
