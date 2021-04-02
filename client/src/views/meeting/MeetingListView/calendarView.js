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



class CalendarView extends Component {
  
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(0, "days")
          .toDate(),
        title: "TBKmeet Meeting"
      }
    ],
    open: false,
    eventState: { start: moment().toDate(), end: moment().add(0, "days").toDate(), title: "", _id: "",
      description:"", location: "", topic: "", members: ""}
  };



 handleClickOpen=() => {
  this.setState({open: true});

};
 handleClose=() => {
  this.setState({open: false});
};

  render() {
    const {meetings}= this.props.meetings;
    // console.log(moment()
    // .add(1, "days")
    // .toDate())
 /*   for(let i=1;i<this.props.meetings.length-1;i++)
  {
    this.state.eventss[i].start=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].end=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].title=this.props.meetings[i].title;
  }  */
  const newEvents = this.props.meetings.map(event => ({
    start:event.date,
    end:event.date,
    title: event.title,
    id: event._id,
    description: event.description,
    topic: event.topic,
    location: event.location,
    members:event.members,
    duration:event.duration
  }));
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
            this.handleClickOpen()
            this.setState({eventState: event});
            }}
          style={{ height: "80vh" , width:"100%"}}
        />
      </div>
      <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
              Meeting Detail
            </DialogTitle>
            <DialogContent dividers>
              <p>Title: {this.state.eventState.title}</p>
              <p>Description: {this.state.eventState.description}</p>
              <p>Duration: {this.state.eventState.duration}</p>
              <p>Date: {moment(this.state.eventState.start).format('DD MMM YYYY')}</p>
              <p>Time: {moment(this.state.eventState.start).format('LT')}</p>
              <p>Location: {this.state.eventState.location}</p>
              <p>Topics: {this.state.eventState.topic}</p>
              <p>Participants: {this.state.eventState.members}</p>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={this.handleClose} color="primary">
                Attend Meeting
              </Button>
            </DialogActions>
          </Dialog>

      </Card>
    );
  }
}

export default CalendarView;
