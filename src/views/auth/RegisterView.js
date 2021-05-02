import React, {useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
  Snackbar,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import linearGradient from 'src/components/linearGradient';
import Image from 'src/imgs/meeting_register_img_2.jpg'; // Import using relative path
import MuiAlert from '@material-ui/lab/Alert';

const styles = {
    root: {
       
    }
};
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: '100vh'
  },
  image:{
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: '100vh',
    marginTop: '-24px',
  }
}));

const RegisterView = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  var [errorMessage,setErrorMessage]=useState("");

  //Alert Function 
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
//Close func for closing the alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // The function that handles the logic when submitting the form
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    const { email, password, firstName, lastName, companyName } = values;
    var body = {
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    const url = "https://tbkmeet-backend.herokuapp.com/auth/signup";
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      console.log(text)

      if (text.status == "success") {
        console.log("success")
        navigate('/login', { replace: true });
      } else {
        console.log(text.message);
        setErrorMessage(text.message)
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Page
      className={classes.root}
      title="Register"
    >
       
        <Grid
          container
          spacing={0}
        >
            <CssBaseline />
            <Grid
            className={classes.image}
          
            lg={6}
            md={2}
            xl={6}
            xs={0}
          >
            
          </Grid>
          <Grid
         elevation={6} square
            lg={6}
            md={10}
            xl={6}
            xs={12}
          >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              companyName: '',
              policy: false
            }}
            onSubmit={handleSubmit}

            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('password is required'),
                companyName: Yup.string().max(255).required('company name is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
          >
            {props => {
              const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.companyName && errors.companyName)}
                  fullWidth
                  helperText={touched.companyName && errors.companyName}
                  label="Company Name"
                  margin="normal"
                  name="companyName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    className={linearGradient().root}
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}}
          </Formik>
        </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="Error">
            {errorMessage}  
        </Alert>
      </Snackbar>
      </Box>
      </Grid>
      
      </Grid>
    
    </Page>
  );
};

export default RegisterView;
