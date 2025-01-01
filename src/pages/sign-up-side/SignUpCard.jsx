import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import { SitemarkIcon } from './CustomIcons';
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import { useNavigate } from 'react-router-dom';
import { callSignUp } from '../../redux/reducers/auth/userSignUp';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignUpCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = React.useState('');
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const passWord = data.get("password");
    const name = data.get("name");
    const phoneNumber = data.get("phoneNumber");
    const result = await dispatch(callSignUp({ email, passWord, name, phoneNumber }))
    if (result === true) {
      setSnackbar({
        open: true,
        message: "Sign up success!",
        severity: "success",
      });
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    }
    if (result.status === 400) {
      setSnackbar({
        open: true,
        message: result.response.data.message,
        severity: "error",
      });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const phoneNumber = document.getElementById('phoneNumber');
    const confirmPassword = document.getElementById('confirmPassword');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (!confirmPassword.value || confirmPassword.value !== password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password and confirm password must be the same.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (!name.value || name.value.length < 6) {
      setNameError(true);
      setNameErrorMessage('Name must be at least 6 characters long.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    if (!phoneNumber.value || phoneNumber.value.length < 10) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage('Phone number must be at least 10 characters long.');
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage('');
    }
    return isValid;
  };

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'email' }}
          />
        </FormControl>
        <FormControl htmlFor="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            error={nameError}
            helperText={nameErrorMessage}
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={nameError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'name' }}
          />
        </FormControl>
        <FormControl htmlFor="phoneNumber">
          <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
          <TextField
            error={phoneNumberError}
            helperText={phoneNumberErrorMessage}
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            placeholder="0123456789"
            autoComplete="phoneNumber"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={phoneNumberError ? 'error' : 'primary'}
            sx={{ ariaLabel: 'phoneNumber' }}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Password</FormLabel>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="confirmPassword"
            placeholder="••••••"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
          Sign up
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <span>
            <Link
              href="/signin"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign in
            </Link>
          </span>
        </Typography>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Card>
  );
}
