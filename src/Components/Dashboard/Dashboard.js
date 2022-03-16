import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import CardItem from "./CardItem/CardItem";
import AppWidgets1 from "./CardItem/AppWidgets1";
import AppWelcome from "./AppWelcome/AppWelcome";
import CurrentMarket from "./CurrentMarket/CurrentMarket";
import AppAreaInstalled from "./CurrentMarket/AppAreaInstalled";
import jwt_decode from "jwt-decode";
import { UIStore } from "../../store";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import axios from "axios";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	background: "white",
	color: "black",
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}));

const mdTheme = createTheme();

function DashboardContent() {
	const [data, setData] = React.useState(null);
	const [status, setStatus] = React.useState(false);
	const token = UIStore.useState((s) => s.token);
	const userName = jwt_decode(token);
	const username = userName.user.name;
	console.log("username", userName);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const openEl = Boolean(anchorEl);
	const id = openEl ? "simple-popover" : undefined;

	const authstatus = localStorage.getItem("auth");
	console.log(authstatus);
	if (!authstatus) {
		window.location.href = "/";
	}

	const [open, setOpen] = React.useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("auth");
		window.location.href = "/";
	};

	var dataname = [];
	var dataprice = [];
	const [nameArr, setNameArr] = React.useState(null);
	const [priceArr, setPriceArr] = React.useState(null);

	React.useEffect(() => {
		const getData = async () => {
			const response = await axios.get(
				"http://localhost:5000/api/currency/currency"
			);
			console.log(response);
			setData(response.data);
			for (var i = 0; i < response.data.length; i++) {
				console.log(response.data[i].name);
				dataname.push(response.data[i].name);
				dataprice.push(response.data[i].price);
			}
			if (dataname.length > 0 && dataprice.length > 0) {
				setNameArr(dataname);
				setPriceArr(dataprice);
				setStatus(true);
			}

			console.log(status);
		};
		getData();

		console.log(nameArr, "add", priceArr);
	}, []);
	console.log(data);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: "24px",
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "36px",
								...(open && { display: "none" }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component="h1"
							variant="h6"
							color="inherit"
							noWrap
							sx={{ flexGrow: 1 }}
						>
							Dashboard
						</Typography>
						<IconButton color="inherit">
							<Badge
								// badgeContent={4}
								color="secondary"
								aria-describedby={id}
								onClick={handleClick}
							>
								<AccountCircleIcon />
							</Badge>
							<Popover
								id={id}
								open={openEl}
								anchorEl={anchorEl}
								onClose={handleClose}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
							>
								<Button sx={{ p: 2 }} onClick={handleLogout}>
									Log Out
								</Button>
							</Popover>
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					open={open}
					style={{
						"&:hover": {
							textDecoration: "none",
							backgroundColor: "rgba(0, 251, 211, 0.8)",
							// Reset on touch devices, it doesn't add specificity
							"@media (hover: none)": {
								backgroundColor: "transparent",
							},
						},
					}}
				>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						{mainListItems}
						{/* <Divider sx={{ my: 1 }} /> */}
						{/* {secondaryListItems} */}
					</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={8}>
							<Grid item xs={12} md={12}>
								<AppWelcome displayName={`Hello ${username}`} />
							</Grid>

							<Grid item xs={12} md={4}>
								<CardItem title="Bit Coin" price={data && data[0].price} />
							</Grid>
							<Grid item xs={12} md={4}>
								<CardItem title="Ethereum" price={data && data[1].price} />
							</Grid>
							<Grid item xs={12} md={4}>
								<CardItem title="Tether" price={data && data[3].price} />
							</Grid>
							<Grid item xs={12} md={6} lg={4}>
								{status === true ? (
									<CurrentMarket nameArr={nameArr} priceArr={priceArr} />
								) : null}
							</Grid>
							<Grid item xs={12} md={6} lg={8}>
								<AppAreaInstalled />
							</Grid>
							<Grid item xs={12} md={4}>
								<AppWidgets1 />
							</Grid>
							<Grid item xs={12} md={4}>
								<AppWidgets1 />
							</Grid>
							<Grid item xs={12} md={4}>
								<AppWidgets1 />
							</Grid>

							{/* Recent Orders */}
							<Grid item xs={12}>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										borderRadius: "16px",
										boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
									}}
								>
									<Orders />
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Dashboard() {
	return <DashboardContent />;
}
