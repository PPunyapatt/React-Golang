import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";
import bcrypt from 'bcryptjs'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  submit,
  test_admin
} from "../api/bind_api";
// import '../App.css'

import ResponsiveAppBar from "../components/header"


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [value, setValue] = useState("Change me");
  const [showAlert, setShowAlert] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("Password: ", data.get('password'));
    
    console.log({
      email: data.get('username'),
      password: data.get('password')
    });
    let rsp = await submit(String(data.get('username')), String(data.get('password')))
    console.log('rsp: ', rsp);
    
    if (rsp.status == 200) {
      console.log('access-token: ', cookies);
      navigate('/blog')
      
      let rsp_admin = await test_admin()
      console.log('rsp_admin: ', rsp_admin);   
    }
    else {
      setShowAlert(true)
    }    
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false); // Hide the alert after 3 seconds
      }, 2000); // Duration of the alert

      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or showAlert changes
    }
  }, [showAlert]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log('event: ', event.currentTarget);
    setValue(event.currentTarget.value);
  }


  return (
    <>
      {/* <ResponsiveAppBar/> */}
      <Container component="main" maxWidth="xs" id="login">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container sx={{ textAlign: 'center' }}>
                <Grid item xs={6}>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link 
                      href="#" 
                      variant="body2"
                      onClick={() => {
                        navigate('/SignUp')
                      }}>
                        {"Sign Up"}
                    </Link>
                </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Fade 
        in={showAlert}
        timeout = {{enter: 1000, exit: 1000}}>
        <Alert severity="error" sx={{ display: 'flex' }}>Username or password is invalid.</Alert>
      </Fade>
    </>
  );
}
