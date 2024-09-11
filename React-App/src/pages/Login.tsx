import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Fade from "@mui/material/Fade";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider"





export default function SignIn() {
  // const [value, setValue] = useState("Change me");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let status = await auth.loginAction(data)
    
    if (status == 200) {
      navigate('/blog') 
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

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   //console.log('event: ', event.currentTarget);
  //   setValue(event.currentTarget.value);
  // }


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
              // onChange={handleChange}
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
