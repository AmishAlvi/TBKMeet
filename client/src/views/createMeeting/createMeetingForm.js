import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DatePicker from "react-date-picker";


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
  FormControl,
  duration,
  Menu
} from '@material-ui/core';
import Page from 'src/components/Page';
import linearGradient from 'src/components/linearGradient';

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

const CreateMeetingForm = props => {
  const classes = useStyles();
  const navigate = useNavigate();

  //Function that handles the form submission
  const handleSubmit = async values => {
    const {title, topic, description, date, duration, location} = values;
    var body = {
      title: title,
      description: description,
      topics: topic,
      date: date,
      location: location,
      duration: duration
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    const url = "http://http://localhost:3000/app/createMeeting";
    try {
      const response = await fetch(url, options);
      const text = await response.json();

      if(text.status == "success"){
        console.log("success")
        navigate('/app/dashboard', {replace: true});
      } else {
        console.log(text.message);
        window.alert(text.message);
      }
    } catch (error){
      console.error(error);
    }
  };

  //Update the Topic selection
  const [topic, setTopic] = React.useState('');
  const updateTopic = (event) => {
    setTopic(event.target.value);
  };

  //update the location selection
  const [location, setLocation] = React.useState('');
  const updateLocation = (event) => {
    setLocation(event.target.value);
  }

return (
    
  
      
<Container maxWidth={false}>
  <Formik
  initialValues={{
    title: '',
    topics: '',
    desctiption: '',
    duration: '',
    date: '',
    location: ' '
  }}
  onSubmit={handleSubmit}

  // Using Yup for validation

  validationScheme={Yup.object().shape({
    title: Yup.string().max(150).required('Title field is required.'),
    description: Yup.string().max(500),
    topics: Yup.string().required('Topics field is required.'),
    duration: Yup.string().required('Duration field is required.'),
    date: Yup.date().required('Date field is required.'),
    location: Yup.string().required('Location field is required.')
  })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <>

        <form onSubmit={handleSubmit} noValidate>
          <Card>
            <CardContent>
              <CardHeader title="Create A Meeting">
              </CardHeader>
          {/* </Card> */}

          <Divider/>

          {/* Meeting Title */}
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
        {/* Meeting Topic */}
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="topic-input-label">Topic</InputLabel>
        <Select
          labelId="topic-input-label"
          id="topic-input"
          value={topic}
          onChange={updateTopic}
          label="Topics"
          fullWidth
          variant="outlined"
          margin="normal"
          >
            <MenuItem value=""> <em>None</em></MenuItem>
            <MenuItem value={1}>Budget</MenuItem>
            <MenuItem value={2}>Schedule</MenuItem>
            <MenuItem value={3}>Senior Project</MenuItem>
            <MenuItem value={4}>Team Building</MenuItem>
        </Select>
        </FormControl>

        {/* Meeting Description */}
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
          rows={3}
        />

        {/* Meeting Date */}
       
        <label>Date</label>

        <DatePicker
          error={Boolean.date && errors.date}
          label="Date"
          name="meetingDate"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          inputPlaceholder="Select a date"
          shouldHighlightWeekends
          selected="startDate"
          margin="normal"
        >
        </DatePicker>
        
        {/* Meeting Duration */}
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

        {/* Meeting Location */}
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="location-input-label">Location</InputLabel>
        <Select
          labelId="topic-input-label"
          id="location-input"
          value={location}
          onChange={updateLocation}
          label="Topics"
          fullWidth
          variant="outlined"
          margin="normal"
          >
            <MenuItem value=""> <em>None</em></MenuItem>
            <MenuItem value={1}>Meeting Room 1</MenuItem>
            <MenuItem value={2}>Meeting Room 2</MenuItem>
            <MenuItem value={3}>Meeting Room 3</MenuItem>
            <MenuItem value={4}>Meeting Room 4</MenuItem>
        </Select>
        </FormControl>

        </CardContent>

        <Box
          display="flex"
          flex="1"
          flexDirection="row"
          justifyContent="space-between"
          p={3}
        >
          {/* Invite Participants Button */}
          <Button 
          color="primary"
          variant="contained"
          justifyContent="flex-start">
            Invite Participants
          </Button>

        {/* Cretae Meeting button */}
          <Button 
          color="primary"
          variant="contained"
          justifyContent="flex-end">
            Create Meeting
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

export default CreateMeetingForm;
