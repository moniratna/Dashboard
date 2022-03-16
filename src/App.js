import "./App.css";
import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes,
} from "@mui/material/styles";
import SignIn from "./Components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
	let theme = createTheme();
	theme = responsiveFontSizes(theme);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
