import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from "moment";
import { Link } from 'react-router-dom';
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
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
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
  function create() {
      const id = uuid();
      navigate(`/app/room/${id}`, {id: id});
  }
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const [open, setOpen] = React.useState(false);
  const [meetingState, setMeetingState] = useState({date: moment().toDate(),  title: "", _id: "",
  description:"", location: "", topic: "", members: ""});

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                        onClick={() => {
                          handleClickOpen();
                          console.log(meetings);
                          setMeetingState(meetings);
                          console.log(meetingState);
                        }}
                      >
                        <a>{meetings.title}</a>
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
                  <TableCell>
                  <Button href="#text-buttons" color="primary" onClick={create}>
                    Attend Meeting
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
               {emptyRows > 0 && (
                <TableRow style={{ height:  56 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Meeting Detail
            </DialogTitle>
            <DialogContent dividers>
              <p>Title: { meetingState.title}</p>
              <p>Description: {meetingState.description}</p>
              <p>Duration: { meetingState.duration}</p>
              <p>Date: {moment( meetingState.date).format('DD MMM YYYY')}</p>
              <p>Time: {moment( meetingState.date).format('LT')}</p>
              <p>Location: {meetingState.location}</p>
              <p>Topics: {meetingState.topic}</p>
              <p>Participants: {meetingState.members}</p>
              
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={create} color="primary">
                Attend Meeting
              </Button>
            </DialogActions>
          </Dialog>

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
