import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from "moment";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import { v1 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, meetings, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, meetings.length - page * limit);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  let navigate = useNavigate()
  /*function create() {
      const id = uuid();
      navigate(`/app/room/${id}`, {id: id});
  }*/

  function MeetingButtonRender(status, meeting_id) {
    //console.log(id)
    if(status)
    {
      return (
        <TableCell>
                    <Button href="" color="primary" onClick={() => navigate(`/app/room/${meeting_id}`, {id: meeting_id})}>
                      Attend Meeting
                    </Button>
        </TableCell>
      )
    }
    else
    {
      return(
      <TableCell>
                  <Button href="" color="primary" onClick={() => navigate(`/app/room/${meeting_id}`, {id: meeting_id})}>
                  Start Meeting </Button>
      </TableCell>
      )
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
               
              <TableCell>
                  Meeting Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Time
                </TableCell>
                <TableCell>
                  Attend
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings.slice(page* limit, page * limit + limit).map((meetings) => (
                <TableRow
                  hover
                  key={meetings._id}
                  
                >
                 
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {meetings.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {meetings.description}
                  </TableCell>
                  <TableCell>
                  {meetings.location}
                  </TableCell>
                  <TableCell>
                    {moment(meetings.date).format('DD MMM YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(meetings.date).format('LT')}
                  </TableCell>
                                    {MeetingButtonRender(meetings.isStarted, meetings._id)}
                </TableRow>
              ))}
               {emptyRows > 0 && (
                <TableRow style={{ height:  56 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={meetings.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  meetings: PropTypes.array.isRequired
};

export default Results;
