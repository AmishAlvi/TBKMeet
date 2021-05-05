import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import moment from "moment";

const data = [
  {
    id: uuid(),
meetingName:'Budget Meeting-2',
meetingTopic:'Budget',
date:'22/03/2021',
time:'13.30'

  },
  {
  id: uuid(),
meetingName:'Budget Meeting-2',
meetingTopic:'Budget',
date:'22/03/2021',
time:'13.30'

  },
  {
  id: uuid(),
meetingName:'Budget Meeting-2',
meetingTopic:'Budget',
date:'22/03/2021',
time:'13.30'

  },
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UpcomingMeetings = ({ className, ...rest }) => {
  const classes = useStyles();
  const [meetings] = useState(data);
  const [meeting,setMeeting]=useState([]);
  useEffect(async () => {
    const result = await axios(
        "http://localhost:81/meeting/getMeetings",
        {withCredentials: true}
    );
    setMeeting(result.data.data)
  },[]);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Upcoming Meetings" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Meeting Name
                </TableCell>
               
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meeting.slice(0,5).map((meeting) => (
                <TableRow
                  hover
                  key={meeting._id}
                >
                  <TableCell>
                    {meeting.title}
                  </TableCell>
                  
                  <TableCell>
                  {moment( meeting.date).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell>                      
                  {moment( meeting.date).format('LT')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          href="meetings"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

UpcomingMeetings.propTypes = {
  className: PropTypes.string
};

export default UpcomingMeetings;
