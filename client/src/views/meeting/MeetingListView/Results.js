import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

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
                  Meeting Topic
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
              {meetings.slice(0, limit).map((meetings) => (
                <TableRow
                  hover
                  key={meetings.id}
                  
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
                        {meetings.meetingName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {meetings.meetingTopic}
                  </TableCell>
                  <TableCell>
                    {`${meetings.address.city}, ${meetings.address.building}, ${meetings.address.room}`}  
                  </TableCell>
                  <TableCell>
                    {meetings.date}
                  </TableCell>
                  <TableCell>
                    {meetings.time}
                  </TableCell>
                  <TableCell>
                  <Button href="#text-buttons" color="primary">
  Attend Meeting
</Button>
                  </TableCell>
                </TableRow>
              ))}
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
