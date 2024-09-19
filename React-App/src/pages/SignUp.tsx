import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {
  signup
} from "../api/bind_api";



export default function SignUp() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    cf_password: ''
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    cf_password: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let err = validateForm()
    if (err) {
      return
    }
    console.log({
      email: data.get('username'),
      password: data.get('password')
    });

    let rsp = await signup(String(data.get('username')), String(data.get('password')))
    if (rsp.status === 200) navigate('/')
  };

  const validateForm = () => {
    const newErrors = {
      username: values.username === '',
      password: values.password === '',
      cf_password: values.cf_password === ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).some(error => error);
  }

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {  
    setValues({
      ...values,
      [name]: event.target.value
    });

    setErrors({
      ...errors,
      [name]: false
    })

    if (name === 'cf_password') {
      //console.log("password: ", values.password, "\ncf_password: ", values.cf_password);
      setPasswordsMatch(values.password != event.target.value)
    }
  }


  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up
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
              onChange={handleChange('username')}
              error={errors.username}
              helperText= {errors.username && "Please input username" }
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
              onChange={handleChange('password')}
              error={errors.password}
              helperText= {errors.password && "Please input password" }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="cf_password"
              label="Confirm Password"
              type="password"
              id="cf_password"
              autoComplete="current-password"
              onChange={handleChange('cf_password')}
              error={passwordsMatch || errors.cf_password}
              helperText= {errors.cf_password ? "Please input confirm password" : passwordsMatch && "Password doesn't match" }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}