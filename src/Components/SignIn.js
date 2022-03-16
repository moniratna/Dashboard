import React from "react";
import "../App.css";
import Card from "@mui/material/Card";
import { CardContent, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes,
} from "@mui/material/styles";
// import Image from '@mui/material/Image';
import LoginImage from "../assets/undraw_two.svg";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import swal from "sweetalert";
import { UIStore } from "../store";

const useStyle = makeStyles((theme) => ({
	imageStyle: {
		width: "70%",
		height: "70%",
		marginTop: "30%",
		marginLeft: "20%",
		[theme.breakpoints.down("md")]: {
			width: "60%",
			height: "60%",
			marginTop: "5%",
		},
		[theme.breakpoints.down("lg")]: {
			width: "60%",
			height: "60%",
			marginTop: "25%",
		},
	},
}));

export default function SignIn() {
	const matches = useMediaQuery("(max-width:768px)");
	const classes = useStyle();
	const [values, setValues] = React.useState({
		email: "",
		password: "",
	});
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const res = await axios.post(
			"https://userauthbe.herokuapp.com/api/auth/login",
			{
				email: values.email,
				password: values.password,
			}
		);
		if (res && res.data.token) {
			localStorage.setItem("token", res.data.token);
			UIStore.update((s) => {
				s.token = res.data.token;
			});
			localStorage.setItem("auth", true);
			window.location.href = "/dashboard";
		} else {
			swal({
				title: "Error",
				text: res.data.message,
				icon: "error",
				button: "Ok",
			});
		}
	};
	return (
		<>
			{matches ? (
				<div className="background">
					<Card
						style={{
							alignItems: "center",
							justifyContent: "center",
							width: "80%",
							height: "80%",
							margin: "auto",
							borderRadius: "10px",
							boxShadow: "5px 5px 10px #3ABFE0",
						}}
					>
						<Grid container>
							{/* <Grid item lg={6} xs={12}>
           <img src={LoginImage} alt="logo" className={classes.imageStyle} />
         </Grid> */}
							<Grid item lg={6} xs={12}>
								<Container component="main" maxWidth="xs">
									{/* <CssBaseline /> */}
									<Box
										sx={{
											marginTop: 4,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
											{/* <LockOutlinedIcon /> */}
										</Avatar>
										<Typography component="h1" variant="h5">
											Sign in
										</Typography>
										<Box
											component="form"
											onSubmit={handleSubmit}
											noValidate
											sx={{ mt: 1 }}
										>
											<TextField
												margin="normal"
												required
												fullWidth
												id="email"
												label="Email Address"
												name="email"
												autoComplete="email"
												autoFocus
												onChange={handleChange("email")}
											/>
											<TextField
												margin="normal"
												required
												fullWidth
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="current-password"
												onChange={handleChange("password")}
											/>
											<FormControlLabel
												control={<Checkbox value="remember" color="primary" />}
												label="Remember me"
											/>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
											>
												Sign In
											</Button>
											<Grid container>
												{/* <Grid item xs>
													<Link href="#" variant="body2">
														Forgot password?
													</Link>
												</Grid> */}
												<Grid item>
													<Link href="/signup" variant="body2">
														{"Don't have an account? Sign Up"}
													</Link>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Container>
							</Grid>
						</Grid>
					</Card>
				</div>
			) : (
				<div className="background">
					<Card
						style={{
							alignItems: "center",
							justifyContent: "center",
							width: "80%",
							height: "80%",
							margin: "auto",
							borderRadius: "10px",
							boxShadow: "5px 5px 10px #3ABFE0",
						}}
					>
						<Grid container>
							<Grid item lg={6} md={6} xs={12}>
								<Container component="main" maxWidth="xs">
									<CssBaseline />
									<Box
										sx={{
											marginTop: 8,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
											{/* <LockOutlinedIcon /> */}
										</Avatar>
										<Typography component="h1" variant="h5">
											Sign in
										</Typography>
										<Box
											component="form"
											onSubmit={handleSubmit}
											noValidate
											sx={{ mt: 1 }}
										>
											<TextField
												margin="normal"
												required
												fullWidth
												id="email"
												label="Email Address"
												name="email"
												autoComplete="email"
												autoFocus
												onChange={handleChange("email")}
											/>
											<TextField
												margin="normal"
												required
												fullWidth
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="current-password"
												onChange={handleChange("password")}
											/>
											<FormControlLabel
												control={<Checkbox value="remember" color="primary" />}
												label="Remember me"
											/>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
											>
												Sign In
											</Button>
											<Grid container>
												{/* <Grid item xs>
													<Link href="#" variant="body2">
														Forgot password?
													</Link>
												</Grid> */}
												<Grid item>
													<Link href="/signup" variant="body2">
														{"Don't have an account? Sign Up"}
													</Link>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Container>
							</Grid>
							<Grid item lg={6} md={6} xs={12}>
								<img
									src={LoginImage}
									alt="logo"
									className={classes.imageStyle}
								/>
							</Grid>
						</Grid>
					</Card>
				</div>
			)}
		</>
	);
}
