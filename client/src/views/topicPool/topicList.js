import React, { useState } from 'react';
import clsx from 'clsx';
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
  Button,
  Dialog
  
} from '@material-ui/core';
import Async from 'react-async';
import { CompareArrowsOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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
const useStyles = makeStyles((theme) => ({
  root: {},

  /* tableRow: {
    height: 30
  }, */
}));

/* 
const deneme=(async res=>{
const url="http://localhost:81/topic/getTopic";
response = await fetch(url);
const data = await response.json();
console.log(data);}) */
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

const TopicList = ({ className,  ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };
  const [topicState, setTopicState] = useState({ title: "", _id: "",
  description:"", duration: "", category: "", decision: "",information: ""});
  const [topic, setTopic]=useState([]);    
  const emptyRows = limit - Math.min(limit, topic.length - page * limit);
  const [open, setOpen] = React.useState(false);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const getTopics = async values => {
    const url = "http://localhost:81/topic/getTopic";
    try {
      const result = await fetch(url);
      const data = await result.json();
      // console.log(data)

      if (data.status == "success") {
        // console.log("success");
        setTopic(data.data)
        // console.log(topic)
        
      } else {
        console.log("error");
        
      }
    } catch (error) {
      console.error(error);
    } 
  };
  const handleClose = () => {
    setOpen(false);
  };
   
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
     
      <PerfectScrollbar>
        <Box minWidth={1050}>
        <Async promiseFn={getTopics}>
          
          <Table>
            <TableHead>
              <TableRow>
               
              <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Duration
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Meeting Output
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {topic.slice( page* limit, page * limit + limit).map((topic) => (
                <TableRow
                  hover
                 key={topic._id}
                 className={classes.tableRow}
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
                        {topic.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                     {topic.totalTime } minutes 
                  </TableCell>
                  <TableCell>
                  {topic.category}  
                  </TableCell>
                  <TableCell>
                  {topic.information &&(
                    <p>Information Meeting</p>
                  )}
                  {topic.decision &&(
                    <p>Decision Meeting</p>
                  )}
                 
                  </TableCell>
                  <TableCell>
                  <Link to={{pathname: `/app/modifyTopic/${topic._id}`}}
                   style={{ textDecoration: 'none',color:"initial" }}
                   
                  > 
                    <EditIcon
                    style={{ cursor: "pointer" }}
                    />
                    </Link>
                    <DeleteIcon
                    style={{ cursor: "pointer" }}
                    />
                    <InfoIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleClickOpen();
                      console.log(topic);
                      setTopicState(topic);
                      console.log(topicState);
                                            }}
                    />
                  </TableCell>
                  
                </TableRow>
              ))} 
               {emptyRows > 0 && (
                <TableRow style={{ height:  56 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          </Async>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={topic.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
          <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Topic Detail
            </DialogTitle>
            <DialogContent dividers>
              <p>Title: { topicState.title}</p>
              <br/>
              <p>Description: {topicState.description}</p>
              <br/>
              <p>Duration: { topicState.totalTime} Minutes</p>
              <br/>
              <p>Category: { topicState.category}</p>
              {/*<p>Location: {topicState.location}</p>
               <p>Topics: {meetingState.topic}</p>
              <p>Participants: {meetingState.members}</p> */}
              
            </DialogContent>
            <DialogActions>
            <Button href="" color="primary" onClick={handleClose}>
                  Close </Button>
            </DialogActions>
          </Dialog>
    </Card>
  );
};


export default TopicList;
