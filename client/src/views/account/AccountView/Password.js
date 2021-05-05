import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();
  

 /*  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }; */
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    
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
        console.log("success")
      } else {
        console.log(text.message);
      
        
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
 /*    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }} */

    //********Using Yup for validation********/
  /*   validationSchema: Yup.object({
      password: Yup.string().required('Password is required'),
      passwordConfirmation: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }); */

    validationSchema={Yup.object().shape({
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('password is required'),
   /*    password:Yup.lazy(
        value =>
          !value
            ? Yup.string()
            : Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
      ), */
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
            /* onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }} */
            /* disabled={isSubmitting} */
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
    </>
    );
  }}
    </Formik>
  );
};



export default Password;
