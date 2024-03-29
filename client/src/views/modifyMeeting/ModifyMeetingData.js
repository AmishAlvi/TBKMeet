import React,{useState, useEffect} from 'react';
import { Link as RouterLink, useNavigate, useParams, useLocation } from 'react-router-dom';
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
  Snackbar

} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

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
const topicColumns = [
  
  { field: 'title', headerName: 'Topic Title', width: 180},
  { field: 'totalTime', headerName: 'Duration', width: 180 }
  
];
const columns = [
  { field: 'firstName', headerName: 'First name', width: 120},
  { field: 'lastName', headerName: 'Last name', width: 120 },
  { field: 'email', headerName: 'Email', width: 220 }
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

 
const ModifyMeetingForm = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openTopic, setOpenTopic] = React.useState(false);
  const [selectParticipats, setSelectionParticipants] = React.useState([]);
  let dt = new Date();
  const minDate = dt.setDate(dt.getDate() );
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [openAlert, setOpenAlert] = React.useState(false);
  var [errorMessage,setErrorMessage]=useState("");
  var [successMessage,setSuccessMessage]=useState("");
  const[user,setUser]=useState([]);
  const[member,setMember]=useState([]);
  const[topic,setTopic]=useState([]);
  const[selectedTopic,setSelectedTopic]=useState([]);
  const[topicsArr,setTopicsArr]=useState([]);
  const[participantsArr,setParticipantsArr]=useState([]);
  const[selectionModelTopic,setSelectionModelTopic]=useState([]);
  const[selectionModelParticipant,setSelectionModelParticipant]=useState([]);
  const loadUser = async values => {
    const options = {
      method: "GET",
      credentials: 'include',
    };
    const url = "http://localhost:81/meeting/getEmails";
    try {
      const result = await fetch(url,options);
      const data = await result.json();
      console.log(data)

      if (data.status == "success") {
        console.log("success");
        setUser(data.data)
        console.log(user)
        
      } else {
        console.log("error");
        
      }
    } catch (error) {
      console.error(error);
    } 
  };
/*   const loadUser = async values => {
    const options = {
      method: "GET",
      credentials: 'include',
    };
    const url = "http://localhost:81/meeting/getEmails";
    try {
      const result = await fetch(url,options);
      const data = await result.json();
      console.log(data)

      if (data.status == "success") {
        console.log("success");
        setUser(data.data)
        console.log(user)
        
      } else {
        console.log("error");
        
      }
    } catch (error) {
      console.error(error);
    } 
  }; */
  const loadTopic = async values => {
    const options = {
      method: "GET",
      credentials: "include",
    };
    const url = "http://localhost:81/topic/getTopic";
    try {
      const result = await fetch(url,options);
      const data = await result.json();
      //console.log(data)

      if (data.status == "success") {
        console.log("success");
        setTopic(data.data)
        //console.log(topic)
        
      } else {
        console.log("error");
        
      }
    } catch (error) {
      console.error(error);
    } 
  };

      //function for displaying alert
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
//Open Participants Dialog
  const handleClickOpen = () => {
    loadUser();
    setOpen(true);
    
  };
  
  const handleClickOpenTopic =()=>{
    loadTopic();
    console.log(topic);
    setOpenTopic(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseTopic = () => {
    setOpenTopic(false);
    console.log(topicsArr);
    // console.log(selectionModelTopic);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
 /*  const addId=(data)=>{
    var ln = data.length;
    console.log("add id starts")
    for(var i=0; i<ln;i++)
    {
      console.log(i);
      data[i].id=i;
    }
    return data;
  } */
  const SaveParticipants=()=>
  {
    setParticipantsArr(member);
    setSelectionModelParticipant(member.map((r) => r.id));
    console.log(participantsArr);
   console.log(member);
    handleClose();
  }
  const SaveTopics=()=>
  {
    setTopicsArr(selectedTopic);
    setSelectionModelTopic(selectedTopic.map((r) => r.id));
     console.log(selectionModelTopic)
     console.log(topicsArr)
    handleCloseTopic();
    //console.log(calculateTotalDuration())
    
  }
  const calculateTotalDuration=()=>{
    var totalDuration=0;
    topicsArr.map((val) => 
    totalDuration+=parseInt(val.totalTime)
    );
    console.log(totalDuration);
    return totalDuration;
  }
  const clearForm=()=>{
   setTopicsArr([]);
   setSelectedDate(new Date());
   setLocation("");
   setParticipantsArr([]);
  }
  //Function that handles the form submission
  const handleSubmit = async (values,{resetForm}) => {
};


useEffect(async () => {
    const result = await axios(
      `http://localhost:81/meeting/getMeetings/${meetingId}`,
        {withCredentials: true}
    );
 
    setMeeting(result.data)
  },[]);
 //update date
 const handleDateChange = (date) => {
  setSelectedDate(date);
};
const urllocation = useLocation();
const getCurrentPathWithLastPart = () => {

  return urllocation.pathname.slice(urllocation.pathname.lastIndexOf('/')+1,urllocation.pathname.length );
}
const  meetingId  = getCurrentPathWithLastPart();
  const [location, setLocation] = React.useState('');
  const [meeting, setMeeting] = React.useState('');
  getMeeting(meetingId);
  
   //update the location selection
  const updateLocation = (event) => {
    setLocation(event.target.value);
  }
 
  console.log(meeting)

  var meetingArr=meeting;
  console.log(meetingArr)
  return (
    
<Container maxWidth={false}>
  <Formik
   initialValues={{
    title: '',
    topics: '',
    description: '',
    duration: '',
    date: '',
    location: ' '
  }} 
  onSubmit={handleSubmit}

  // Using Yup for validation

  validationSchema={Yup.object().shape({
    title: Yup.string().max(100).required('Title is required'),
    description: Yup.string().max(255),
    duration: Yup.string().required("Duration is required").matches(/^\d+$/, 'The field should have digits only').test(
      "DOB",
      "Duration must be greater than total topic durations",
      value => {
        return value >= calculateTotalDuration();
      })
      // location: Yup.string().ensure().required("Location is required")
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
        handleReset,
        handleSubmit
      } = props;
      return (
        <>
        
        <form onSubmit={handleSubmit} noValidate>
          <Card>
            <CardContent>
              <CardHeader title="Modify The Meeting">
              </CardHeader>
          {/* </Card> */}

          <Divider/>

          {/* Meeting Title */}

          <TextField
                error={Boolean(touched.title && errors.title)}
                fullWidth
                helperText={touched.title && errors.title}
                label="Title"
                /* initialValues={meeting.title} */
                margin="normal"
                name="title"
                onBlur={handleBlur}
                onChange={(e) => setMeeting({title:"e.target.value"})}
                value={meetingArr.title}
                variant="outlined">
              </TextField>
        {/* Meeting Topic */}  
      {/* Invite Topics Button */}
       <Button 
          color="primary"
          variant="contained"
          justifyContent="flex-start"
          onClick={handleClickOpenTopic}>
            Select topic
          </Button> 
      <Dialog onClose={handleCloseTopic} aria-labelledby="customized-dialog-title" open={openTopic}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseTopic}>
          Select Topics
        </DialogTitle>
        <DialogContent dividers> 
             <div style={{ height: 400, width: '100%' }}> 
             {/* {console.log(topicsArr)} */}
                <DataGrid 
                  
                  rows={topic}
                  columns={topicColumns}
                  pageSize={5} 
                  checkboxSelection
                  selectionModel={selectionModelTopic} 
                  onSelectionModelChange={(e) => {
                     
                     const selectedIDs = new Set(e.selectionModel);
                     console.log(selectedTopic)
                     setSelectedTopic(topic.filter((r) =>
                       selectedIDs.has(r.id))
                       
                     )} }
                  
                />   
                      
                    
  
            </div>
            
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={SaveTopics} color="primary">
            Save Topics
          </Button>
        </DialogActions>
      </Dialog>

    {/* </div>  */}


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


      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          minDate={minDate}
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
          minDate={minDate}
          value={selectedDate}
          keyboardIcon={<ScheduleIcon />}
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
        <br></br>
        {/* Invite Participants Button */}
        <Button 
          color="primary"
          variant="contained"
          justifyContent="flex-start"
          onClick={handleClickOpen}>
            Invite Participants
          </Button>
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
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Invite Participants
        </DialogTitle>
        <DialogContent dividers>

              <div style={{ height: 400, width: '100%' }}>
            
                <DataGrid 
                
                 rows={user}
                 columns={columns}
                 pageSize={5} 
                 checkboxSelection 
                 selectionModel={selectionModelParticipant} 
                 onSelectionModelChange={(e) => {
                    
                    const selectedIDs = new Set(e.selectionModel);
                    console.log(member)
                    setMember(user.filter((r) =>
                      selectedIDs.has(r.id))
                      
                    )} }            
                      />  
                      
       
  
            </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={SaveParticipants} color="primary">
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
            Modify Meeting
          </Button>
          </Box>

        </Card>
        </form>
        </>
      );
    }}
  
  </Formik>

     <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
    {!Object.keys(errorMessage).length == 0 ? 
     
         (<Alert onClose={handleCloseAlert} severity="Error">
         {errorMessage}  
     </Alert>)
        :(<Alert onClose={handleCloseAlert} severity="success">
            {successMessage}  
        </Alert>)}
        
        
      </Snackbar> 
</Container>

  );
};

export default ModifyMeetingForm;
