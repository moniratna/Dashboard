import React from "react";
import "../../App.css";
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
import SignUpImage from "../../assets/undraw_account.svg";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import swal from "sweetalert";

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

export default function SignUp() {
	const matches = useMediaQuery("(max-width:768px)");
	const classes = useStyle();
	const [values, setValues] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log(values);
		const res = await axios.post("http://localhost:5000/api/users/register", {
			firstname: values.firstName,
			lastname: values.lastName,
			email: values.email,
			password: values.password,
		});
		console.log(res);
		if (res.status === 200) {
			swal("Success", "You have successfully registered", "success");
		}
		window.location.href = "/";
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
											Sign up
										</Typography>
										<Box
											component="form"
											noValidate
											onSubmit={handleSubmit}
											sx={{ mt: 3 }}
										>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<TextField
														autoComplete="given-name"
														name="firstName"
														required
														fullWidth
														id="firstName"
														label="First Name"
														autoFocus
														onChange={handleChange("firstname")}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id="lastName"
														label="Last Name"
														name="lastName"
														autoComplete="family-name"
														onChange={handleChange("lastname")}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id="email"
														label="Email Address"
														name="email"
														autoComplete="email"
														onChange={handleChange("email")}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														name="password"
														label="Password"
														type="password"
														id="password"
														autoComplete="new-password"
														onChange={handleChange("password")}
													/>
												</Grid>
												{/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
											</Grid>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
												// onSubmit={() => console.log("hello world")}
											>
												Sign Up
											</Button>
											<Grid container justifyContent="flex-end">
												<Grid item>
													<Link href="/" variant="body2">
														Already have an account? Sign in
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
											Sign up
										</Typography>
										<Box
											component="form"
											noValidate
											onSubmit={handleSubmit}
											sx={{ mt: 3 }}
										>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<TextField
														autoComplete="given-name"
														name="firstName"
														required
														fullWidth
														id="firstName"
														label="First Name"
														autoFocus
														onChange={handleChange("firstName")}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														required
														fullWidth
														id="lastName"
														label="Last Name"
														name="lastName"
														autoComplete="family-name"
														onChange={handleChange("lastName")}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														id="email"
														label="Email Address"
														name="email"
														autoComplete="email"
														onChange={handleChange("email")}
													/>
												</Grid>
												<Grid item xs={12}>
													<TextField
														required
														fullWidth
														name="password"
														label="Password"
														type="password"
														id="password"
														autoComplete="new-password"
														onChange={handleChange("password")}
													/>
												</Grid>
												{/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
											</Grid>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
											>
												Sign Up
											</Button>
											<Grid container justifyContent="flex-end">
												<Grid item>
													<Link href="/" variant="body2">
														Already have an account? Sign in
													</Link>
												</Grid>
											</Grid>
										</Box>
									</Box>
								</Container>
							</Grid>
							<Grid item lg={6} md={6} xs={12}>
								<img
									src={SignUpImage}
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
