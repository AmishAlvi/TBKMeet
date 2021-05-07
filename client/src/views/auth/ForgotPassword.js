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
  var [errorMessage,setErrorMessage]=useState("");
  var [tokenState,setTokenState]= useState("");
  var [isClicked,setIsClicked]= useState(false);

  //Alert Function 
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function validationHandle()
  {
    if(isClicked)
    {
      return(
        Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required'),
          confirmPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
        })
      )
    }
    else{
      return(Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      }))
    }
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
          return true;
          
        } else {
          console.log(text.message);
            
        }
      } catch (error) {
        console.error(error);
      }
      return false;
    }

    const resetPassword= async values =>{
      const { email,password } = values;
      var body = {
        email: email,
        password:password
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
      const url = "http://localhost:81/auth/newPassword";
      await setTokenState(resetTokenClicked);
      if(tokenState){
      try {
        const response = await fetch(url, options);
        const text = await response.json();
        const head = await response.headers
        console.log( head)
        const user = text.data
  
        if (text.status == "success") {
          console.log("success")
          console.log(text)
          navigate('/login')
          
        } else {
          console.log(text.message);
          setErrorMessage("Password change failed")
          setOpen(true);    
        }
      } catch (error) {
        console.error(error);
      }
     }
     else{
      setErrorMessage("Please verify from your email")
      setOpen(true);  
     }
    }
  // The function that handles the logic when submitting the form
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
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
    setIsClicked(true);
    console.log(isClicked)
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
      //********Using Yup for validation********/
      onSubmit={resetPassword}
      validationSchema={validationHandle()}
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
              
              {(() => {
        if (isClicked) {
          return (
            <TextField
            fullWidth
            error={Boolean(touched.password && errors.password)}
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
          )
           }
      })()}
              
                
                 
                {(() => {
        if (isClicked) {
          return (
            <TextField
                   fullWidth
                   error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                   helperText={touched.confirmPassword && errors.confirmPassword}
                   label="Confirm password"
                   margin="normal"
                   name="confirmPassword"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   type="password"
                   value={values.confirmPassword}
                   variant="outlined"
                 />
          )
           }
      })()} 
              <Box my={2}>
                {isClicked
                   ?<Button 
                   className={linearGradient().root}
                       disabled={isSubmitting}
                       fullWidth
                       /* type="submit" */
                       size="large"
                       onClick={()=>{resetPassword(values)}}
                       variant="contained" >
                         Reset Password
                   </Button> 
                   : <Button 
                   className={linearGradient().root}
                       disabled={isSubmitting}
                       fullWidth
                       size="large"
                       onClick={()=>{handleSubmit(values)}}
                       variant="contained" >
                         Send Password Reset Request
                   </Button>
                }                        
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
