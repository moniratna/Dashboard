import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
// import { fNumber } from '../../../utils/formatNumber';
//
import BaseOptionChart from "./BaseOptionChart";
import { useEffect } from "react";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled("div")(({ theme }) => ({
	height: CHART_HEIGHT,
	marginTop: theme.spacing(5),
	"& .apexcharts-canvas svg": { height: CHART_HEIGHT },
	"& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
		overflow: "visible",
	},
	"& .apexcharts-legend": {
		height: LEGEND_HEIGHT,
		alignContent: "center",
		position: "relative !important",
		borderTop: `solid 1px ${theme.palette.divider}`,
		top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
	},
}));

// ----------------------------------------------------------------------

const CHART_DATA = [12244, 53345, 44313, 78343];

export default function AppCurrentDownload({ nameArr, priceArr }) {
	const theme = useTheme();

	const chartOptions = merge(BaseOptionChart(), {
		colors: [
			"rgba(4, 255, 137, 0.8)",
			"rgba(82, 240, 166, 0.8)",
			"rgba(3, 58, 253, 0.8)",
			"rgba(39, 43, 59, 0.8)",
		],
		labels: nameArr,
		stroke: { colors: [theme.palette.background.paper] },
		legend: { floating: true, horizontalAlign: "center" },
		tooltip: {
			fillSeriesColor: false,
			y: {
				formatter: (seriesName) => seriesName,
				title: {
					formatter: (seriesName) => `${seriesName}`,
				},
			},
		},
		plotOptions: {
			pie: {
				donut: {
					size: "90%",
					labels: {
						value: {
							formatter: (val) => val,
						},
						total: {
							formatter: (w) => {
								const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
								return sum;
							},
						},
					},
				},
			},
		},
	});

	return (
		<Card
			style={{
				borderRadius: "16px",
				boxShadow: "9px 9px 20px rgba(0, 0, 0, 0.1)",
			}}
		>
			<CardHeader title="Current Market" />
			<ChartWrapperStyle dir="ltr">
				<ReactApexChart
					type="donut"
					series={priceArr}
					options={chartOptions}
					height={280}
				/>
			</ChartWrapperStyle>
		</Card>
	);
}
