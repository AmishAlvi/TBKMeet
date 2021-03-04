import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DatePicker from "react-date-picker";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns'; //instal this version npm i @date-io/date-fns@1.3.13
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
  //update date
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-02-14T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

  validationSchema={Yup.object().shape({
    title: Yup.string().max(100).required('Title is required'),
    description: Yup.string().max(255),
    duration: Yup.string().required("Duration is required"),
    topics: Yup.string().ensure().required("Topic is required")
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
       
        {/* <label>Date</label> */}

        {/* <DatePicker
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
        </DatePicker> */}

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Meeting Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Meeting Time"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        </MuiPickersUtilsProvider>
        
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
          justifyContent="flex-end"
          disabled={isSubmitting}
            type="submit"
            variant="contained">
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
