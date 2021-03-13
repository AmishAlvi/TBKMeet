import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns'; //instal this version npm i @date-io/date-fns@1.3.13
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Formik } from 'formik';
import Async from "react-async"
import {
  Box, Button,Container,
  Select, InputLabel,
  MenuItem,TextField,
  Divider, makeStyles,
  Card,CardHeader,
  CardContent,FormControl
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
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
  },
  
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: 600
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const columns = [
  { field: 'firstName', headerName: 'First name', width: 180},
  { field: 'lastName', headerName: 'Last name', width: 180 },
  /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  }, */
  { field: 'email', headerName: 'Email', width: 180 }
];

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

 
const CreateMeetingForm = props => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  let userData=[];
  const [select, setSelection] = React.useState([]);
  /* const loadUser = async () => {
    const res = await fetch(`http://localhost:81/meeting/getEmails`)
    if (!res.ok) throw new Error(res.statusText)
     const data=await res.json();
    userData.push(777);
    //return data.data;
    
  } */
  const loadUser = () =>
    fetch(`http://localhost:81/meeting/getEmails`)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())
  const loadTopics = () =>
    fetch(`http://localhost:81/topic/getTopic`)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //Function that handles the form submission
  const handleSubmit = async values => {
    const {title, description, date, duration} = values;
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
    console.log(select);
  };

  //Update the Topic selection
  const [topic, setTopic] = React.useState('');
  const updateTopic = (event) => {
    setTopic(event.target.value);
    console.log("topic");
  };

  //update the location selection
  const [location, setLocation] = React.useState('');
  const updateLocation = (event) => {
    setLocation(event.target.value);
  }
  //update date
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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

                <Async promiseFn={loadTopics}>
                {({data,err,isLoading})=>{
                  if(isLoading) return "Loading..."
                  if(err) return `Something went wrong: ${err.message}`
                  if (data)
                    return (
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
              
                      {data.data.map(topic=> (
                        <MenuItem value={topic.title}>{topic.title}</MenuItem>
                      ))}
                      </Select>          
                    )
                }}
                </Async>
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
                <br></br>
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
      <div>
        {/* Invite Participants Button */}
        <Button 
          color="primary"
          variant="contained"
          justifyContent="flex-start"
          onClick={handleClickOpen}>
            Invite Participants
        </Button>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Invite Participants
          </DialogTitle>
          <DialogContent dividers>
          
            <Async promiseFn={loadUser}>
            {({data,err,isLoading})=>{
              if(isLoading) return "Loading..."
              if(err) return `Something went wrong: ${err.message}`
              if (data)
              return (
                <div style={{ height: 400, width: '100%' }}>
                  {console.log(data.data)}
              
                  <DataGrid 
                    rows={data.data}
                    columns={columns}
                    pageSize={5} 
                    checkboxSelection={true}
                    // getRowId={(row) => row._id}
                    onSelectionChange={(newSelection) => {
                      console.log(newSelection.rows);
                      // setSelection(newSelection.rows);
                      console.log("HIHI");
                    }}
                  />  
                  {/* {console.log("HELLOOOOOO")} */}
                  {/* {console.log(select)} */}
                  <h1>{select.map((val) => val.firstName)}</h1>
  
              </div>
              )
            }}
        
            </Async>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save Participants
            </Button>
          </DialogActions>
        </Dialog>

    </div>

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
