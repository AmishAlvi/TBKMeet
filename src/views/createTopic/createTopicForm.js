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
  FormLabel ,
  makeStyles,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel ,
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
    const { title, description,category,duration } = values;
    var body = {
        title: title,
        description: description,
        category: category,
        duration: duration
    };
    
  };

  //For updating the selector -duration time-
  const [category, setCategory] = React.useState('');
  const updateCategory = (event) => {
    setCategory(event.target.value);
  };
  const [state, setState] = React.useState({
    checkedDecision: false,
    checkedInfo: false,
  });

  const handleCB = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { checkedDecision, checkedInfo } = state;
  const error = [checkedDecision, checkedInfo].filter((v) => v).length < 1;
  // Returning the part that should be rendered
  // Just set handleSubmit as the handler for the onSubmit call.
  return (
    
   <Container maxWidth={false}>
    <Formik
      initialValues={{
        title: '',
        description: '',
        category:"",
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
              <TextField
          error={Boolean(touched.duration && errors.duration)}
          fullWidth
          helperText={touched.duration && errors.duration}
          label="Duration in minutes"
          margin="normal"
          name="duration"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.duration}
          variant="outlined"
        />
        
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={updateCategory}
          label="Category"
        >    
          <MenuItem value={"budget"}>Budget Meeting</MenuItem>
          <MenuItem value={"hr"}>HR Meeting</MenuItem>
          <MenuItem value={"project"}>Project Meeting</MenuItem>
        </Select>
      </FormControl>
          <br/><br/>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select at least one meeting output</FormLabel>
      <FormControlLabel
        control={<Checkbox checked={state.checkedDecision} onChange={handleCB} name="checkedDecision" />}
        label="Decision"
      /> 
       <FormControlLabel
      control={<Checkbox checked={state.checkedInfo} onChange={handleCB} name="checkedInfo" />}
      label="Information "
    />
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
