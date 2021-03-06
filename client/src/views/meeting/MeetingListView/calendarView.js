import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Card, 
} from '@material-ui/core';
import "react-big-calendar/lib/css/react-big-calendar.css";

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
    return (

      <Card
      
    >
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "80vh" , width:"100%"}}
        />
      </div>
      </Card>
    );
  }
}

export default CalendarView;
