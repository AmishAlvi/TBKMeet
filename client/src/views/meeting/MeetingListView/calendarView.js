import React, { Component, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Card, 
} from '@material-ui/core';
import "react-big-calendar/lib/css/react-big-calendar.css";
import MeetingListView from ".";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { v1 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom';
const localizer = momentLocalizer(moment);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: 500
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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



const CalendarView = ({ className, meetings, ...rest }) => {
  

const[events,setEvents]=useState([
      {
        start: moment().toDate(),
        end: moment()
          .add(0, "days")
          .toDate(),
        title: "TBKmeet Meeting"
      }
    ]);
    const [open, setOpen] =useState(false);
    const [eventState,setEventState]=useState( { start: moment().toDate(), end: moment().add(0, "days").toDate(), title: "", _id: "",
    description:"", location: "", topic: "", members: ""})


 const handleClickOpen=() => {
  setOpen(true);

};
 const handleClose=() => {
  setOpen(false);
};
let navigate = useNavigate()
function create() {
    const id = uuid();
    navigate(`/app/room/${id}`, {id: id});
}
    //const {meetings}= this.props.meetings;
    // console.log(moment()
    // .add(1, "days")
    // .toDate())
 /*   for(let i=1;i<this.props.meetings.length-1;i++)
  {
    this.state.eventss[i].start=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].end=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].title=this.props.meetings[i].title;
  }  */
  const newEvents = meetings.map(event => ({
    start:event.date,
    end:event.date,
    title: event.title,
    id: event._id,
    description: event.description,
    topic: event.topic,
    location: event.location,
    members:event.members,
    duration:event.duration,
    isStarted:event.isStarted
  }));
  function MeetingButtonRender(status, meeting_id) {
    //console.log(id)
    if(status)
    {
      return (
        
                    <Button href="" color="primary" onClick={() => navigate(`/app/room/${meeting_id}`, {id: meeting_id})}>
                      Attend Meeting
                    </Button>
        
      )
    }
    else
    {
      return(
      
                  <Button href="" color="primary" onClick={() => navigate(`/app/room/${meeting_id}`, {id: meeting_id})}>
                  Start Meeting </Button>
      
      )
    }
  }
  console.log(eventState);
    return (

      <Card>
      <div className="App">
      
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={newEvents}
          views={['month']}
          // onSelectEvent={()=>{
          //   console.log(newEvents);
          // }}
          onSelectEvent={event => {
            handleClickOpen()
            setEventState( event);
            }}
          style={{ height: "80vh" , width:"100%"}}
        />
      </div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Meeting Detail
            </DialogTitle>
            <DialogContent dividers>
              <p>Title: {eventState.title}</p>
              <p>Description: {eventState.description}</p>
              <p>Duration: {eventState.duration}</p>
              <p>Date: {moment(eventState.start).format('DD MMM YYYY')}</p>
              <p>Time: {moment(eventState.start).format('LT')}</p>
              <p>Location: {eventState.location}</p>
{/*               <p>Topics: {this.state.eventState.topic}</p>
              <p>Participants: {this.state.eventState.members}</p> */}
            </DialogContent>
            <DialogActions>
            {MeetingButtonRender(eventState.isStarted, eventState._id)}
            </DialogActions>
          </Dialog>

      </Card>
    );
  
};




export default CalendarView;
