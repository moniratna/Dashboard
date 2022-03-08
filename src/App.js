import logo from './logo.svg';
import './App.css';
import Card from '@mui/material/Card';
import { CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider,  responsiveFontSizes  } from '@mui/material/styles';
// import Image from '@mui/material/Image';
import LoginImage from './assets/undraw_two.svg';
import { makeStyles } from '@mui/styles';
import SignIn from './Components/SignIn';




function App() {
  let theme = createTheme();
theme = responsiveFontSizes(theme);


  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
