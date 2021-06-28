import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import user from 'actions/apis/users/index';
import { RootContext } from '../../context';
import jwtDecode from 'jwt-decode';
import axios from '../../axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        R1 Mobile
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  const { setAuthToken, setCurrentUser } = useContext(RootContext);

  const loginHandler = (e) => {
    // e.preventDefault();
    
  }

  const validationSchema = yup.object({
    email: yup
      .string('Email').email()
      .required('Email is required'),
    password: yup
    .string('Password')
    .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      user.login(values.email, values.password).then(res => {
        if(!res.data.error){
          const { token } = res.data.data; 
          setAuthToken(token);
  
          const decodedUser = jwtDecode(token);
          axios.defaults.headers.common['authorization'] = "Bearer " + token;
          console.log("Decoded User => ", decodedUser);  
            const userForLocalStorage = {
              email: decodedUser.email,
              _id: decodedUser._id
            };
  
            setCurrentUser(userForLocalStorage);
            history.push("/");
            toast.success("Login Successfull");
        }
      }).catch(err => {
        toast.error("Invalid Credentials");
      })
    },
  });
  
  return (
    <>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{ cursor: 'pointer' }} onClick={() => { history.push("/forget-password") }} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
      </>
  );
}