import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Select,
  InputLabel ,
  MenuItem,
  TextField,
  Divider,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  FormControl
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    minWidth: 150,
    maxWidth: 300,
  }
}));

const CreateTopicForm = props => {
  const classes = useStyles();
  const navigate = useNavigate();

  // The function that handles the logic when submitting the form
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    const { title, description,duration } = values;
    var body = {
        title: title,
        description: description,
        duration: duration
    };
    
  };

  //For updating the selector -duration time-
  const [duration, setDuration] = React.useState('');
  const updateDuration = (event) => {
    setDuration(event.target.value);
  };
  // Returning the part that should be rendered
  // Just set handleSubmit as the handler for the onSubmit call.
  return (
    
   <Container maxWidth={false}>
    <Formik
      initialValues={{
        title: '',
        description: '',
        duration:''
      }}
      onSubmit={handleSubmit}

      //********Using Yup for validation********/

      validationSchema={Yup.object().shape({
        title: Yup.string().max(100).required('Title is required'),
        description: Yup.string().max(255).required('Description is required'),
        duration: Yup.string().required("Duration is required")
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
          handleSubmit
        } = props;
        return (
          <>
          
            <form onSubmit={handleSubmit} noValidate>
            <Card>
            <CardContent>
            <CardHeader
          subheader="Please enter the necessary information for creating a topic"
          title="Create Topic"
        />
        <Divider />
                
              <TextField
                error={Boolean(touched.title && errors.title)}
                fullWidth
                helperText={touched.title && errors.title}
                label="Title"
                margin="normal"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                variant="outlined"
                
              />
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                margin="normal"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
                multiline
                rows={5}
              />
              
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Duration</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={duration}
          onChange={updateDuration}
          label="Duration"
        >    
          <MenuItem value={10}>10 minutes</MenuItem>
          <MenuItem value={20}>30 minutes</MenuItem>
          <MenuItem value={30}>45 minutes</MenuItem>
        </Select>
      </FormControl>
  
              </CardContent>
              <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={3}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
           Create Topic
          </Button>
        </Box>
              </Card>
            </form>
          </>
        );
      }}
    </Formik>
  </Container>
  );
};

export default CreateTopicForm;
