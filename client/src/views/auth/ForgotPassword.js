import React, {useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Snackbar,
  makeStyles
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Page from 'src/components/Page';
import linearGradient from 'src/components/linearGradient';
import { Alert } from '@material-ui/lab';
import Cookies from 'js-cookie'
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ForgotPassword = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [errorMessage,setErrorMessage]=useState("");
  var [tokenState,setTokenState]= useState("");

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

    const resetTokenClicked= async values =>{
      const { email } = values;
      var body = {
        email: email
      };
      const options = {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)

      };
      const url = "http://localhost:81/auth/resetTokenClicked";
     
      try {
        const response = await fetch(url, options);
        const text = await response.json();
        const head = await response.headers
        console.log( head)
        const user = text.data
  
        if (text.status == "success") {
          console.log("success")
          console.log(text)
          return("success")
          
        } else {
          console.log(text.message);
          setErrorMessage(text.message)
          setOpen(true);    
        }
      } catch (error) {
        console.error(error);
      }
      return "Not yet";
    }

  // The function that handles the logic when submitting the form
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    const { email, password } = values;
    var body = {
      email: email
    };
    const options = {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    const url = "http://localhost:81/auth/passwordreset";
   
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      const head = await response.headers
      //console.log( head)
      const user = text.data

      if (text.status == "success") {
       // console.log("success")
    
        
      } else {
        //console.log(text.message);
        setErrorMessage(text.message)
        setOpen(true);    
      }
    } catch (error) {
     // console.error(error);
    }
    setTokenState(resetTokenClicked(values));
    console.log(tokenState)
  };

  // Returning the part that should be rendered
  // Just set handleSubmit as the handler for the onSubmit call.
  return (
    <Page
      className={classes.root}
      title="Login"
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
        password: ''
      }}
      onSubmit={handleSubmit}

      //********Using Yup for validation********/

      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
    >
      {props => {
        const {
          email,
          password,
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <>
            <form onSubmit={handleSubmit} noValidate>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Forgot Password
                  </Typography>
                  
                </Box>
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
                //className={errors.email && touched.email && "error"}
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
              
              <Box my={2}>
                <Button 
                className={linearGradient().root}
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained" >
                      Reset Password
                </Button>
              </Box>
            </form>
          </>
        );
      }}
    </Formik>
  </Container>  
</Box>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="Error">
            {errorMessage}  
        </Alert>
      </Snackbar>
</Page>
  );
};

export default ForgotPassword;
