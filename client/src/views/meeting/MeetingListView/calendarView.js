import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Card, 
} from '@material-ui/core';
import "react-big-calendar/lib/css/react-big-calendar.css";
import MeetingListView from ".";

const localizer = momentLocalizer(moment);

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
    ]
  };
 

  render() {
    const {meetings}= this.props.meetings;
    console.log(moment()
    .add(1, "days")
    .toDate())
 /*   for(let i=1;i<this.props.meetings.length-1;i++)
  {
    this.state.eventss[i].start=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].end=Date.parse(this.props.meetings[i].date);
    this.state.eventss[i].title=this.props.meetings[i].title;
  }  */
  const newEvents = this.props.meetings.map(event => ({
    start:event.date,
    end:event.date,
    title: event.title
  }));
    return (

      <Card
      
    >
      <div className="App">
      
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={newEvents}
          views={['month']}
          style={{ height: "80vh" , width:"100%"}}
        />
      </div>
      </Card>
    );
  }
}

export default CalendarView;
