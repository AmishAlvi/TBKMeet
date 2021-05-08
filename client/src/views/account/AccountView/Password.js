import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import * as Yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [errorMessage,setErrorMessage]=useState("");
  var [successMessage,setSuccessMessage]=useState("");

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
  const handleSubmit = async (values) => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    setErrorMessage("");
    ///setSuccessMessage("")
    console.log("tmp")
    console.log(values.password)
    const {password} = values;
    console.log(values.password)
    //values.preventDefault()
    var body = {
      password: password
    };
    console.log(body.password)
    const options = {
      method: "POST",
     credentials:"include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    const url = "http://localhost:81/auth/updatePassword";
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      console.log(text)

      if (text.status == "success") {
          //console.log("success")
           setSuccessMessage(text.message);
           setOpen(true);
           
      } else {
        console.log("This is the error message "+text.message);
        setErrorMessage(text.message);
        setOpen(true);
      
        
      }
    } catch (error) {
      console.error(error);
    }
    

  };
  return (
    <Formik
    initialValues={{
      password: '',
      confirmPassword: '',
    }}

    validationSchema={Yup.object().shape({
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required'),
      confirmPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required').oneOf([Yup.ref('password'), null], 'Passwords must match')
      
    })}
  >
  {props => {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
    } = props;
    return (
      <>
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
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
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(values);
            }}
            color="primary"
            variant="contained"
            disabled={isSubmitting}
          >
            Update
          </Button>
        </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    {!Object.keys(errorMessage).length == 0 ? 
     
         (<Alert onClose={handleClose} severity="Error">
         {errorMessage}  
     </Alert>)
        :(<Alert onClose={handleClose} severity="success">
            {successMessage}  
        </Alert>)}
        
        
      </Snackbar>
      </Card>
    </form>
    </>
    );
  }}
    </Formik>
  );
};



export default Password;
