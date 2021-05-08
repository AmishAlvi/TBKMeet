import React, { useState, useEffect, useRef} from 'react';
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
  makeStyles
  
} from '@material-ui/core';
import {
  Button
} from '@material-ui/core';
import Async from 'react-async';
import { CompareArrowsOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import moment from "moment";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useParams} from 'react-router-dom';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {},
  button: { borderRadius: 50},

  /* tableRow: {
    height: 30
  }, */
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width:500,
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
const MeetingHistoryList = ({ className,  ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };
  const [endedMeeting, setEndedMeeting]=useState([]);    
  const emptyRows = limit - Math.min(limit, endedMeeting.length - page * limit);
  const fileInput = useRef(null);
  const [selectedFile, setFile] = useState();
  // const params = useParams();
  // const roomID = params.roomID;
  // const [meetingId,  setMeetingId] = useState();
  const user = JSON.parse(localStorage.getItem('user'));
  const [ state, setState ] = useState({ message: "", name: user.firstName + " " + user.lastName })
  const [meetingFile, setMeetingFile] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const [meetingFiles, setMeetingFiles]=useState([]); 

  useEffect(async () => {
    const result = await axios(
        "http://localhost:81/meeting/getEndedMeetings",
        {withCredentials: true}
    );
    setEndedMeeting(result.data.data)

  },[]);

  /*useEffect(async (meetingId) => {
    const result = await axios(
        "http://localhost:81/getFiles/"+meetingId,
        {withCredentials: true}
    ); 
    setMeetingFiles(result.data.data)
    console.log("result: " , result)
  },[]);*/

  /*const GetmeetingFiles = async meetingId =>{
    const options = {
      method: "GET",
      credentials: 'include',
    };
    const url = "http://localhost:81/getFiles/"+meetingId;
   
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      //const head = await response.headers
      //console.log( head)
      //const user = text.data

      if (text.status == "success") {
        setMeetingFiles(text.data.data)
        console.log(text.data.data)
       console.log("success")
      } else {
        //console.log(text.message);

        //setErrorMessage(text.message)

        //setOpen(true);    
      }
    } catch (error) {
     // console.error(error);
    }

    //window.location.reload();
  };*/

  async function getMeetingFiles(meetingId) {
    const options = {
      method: "GET",
      credentials: 'include',
    };
    const url =  "http://localhost:81/getFiles/"+meetingId;
   
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      //const user = text.data

      if (text.status == "success") {
        console.log("success")
        setMeetingFile(text.data)
        console.log(text.data)

      } else {
        console.log(text.message);
      }
    } catch (error) {
      console.error(error);
    }
     handleClickOpen();
  };

  function handleUpload( meetingId){
    console.log('tmp')
    const data = new FormData() 
    data.append('fileName', selectedFile)
    data.append('meetingId', meetingId)
    console.log(selectedFile);
    console.log(meetingId);
    let url = "http://localhost:81/fileupload";
    axios.post(url, data, {withCredentials: true , headers: 
      {"Content-Type": "multipart/form-data",} 
    },)
    .then(res => { // then print response status
        console.log(res.data.location);
        state.message = res.data.location;
        const { name, message } = state
        // e.preventDefault()
        setState({ message: "", name })

    })

  }

  function handleExit(e){
    window.close()
  }

 // GetmeetingFiles()
  
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
                  Title
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                Time
                </TableCell>
                <TableCell>
                  Meeting Output
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {endedMeeting.slice( page* limit, page * limit + limit).map((meeting) => (
                 
                <TableRow
                  hover
                 key={meeting._id}
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
                        {meeting.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  {moment(meeting.date).format('DD MMM YYYY')} 

                  </TableCell>
                  <TableCell>
                  {moment(meeting.date).format('LT')}
                  </TableCell>
                  <TableCell>
                    {/*getMeetingFiles(meeting._id)*/}
                    {/*}
                    <Async promiseFn={getMeetingFiles(meeting._id)}> </Async>
                    {/*console.log(currentFile)}
                    <Link to={currentFile}> download </Link>*/}
                    <Button onClick={(e) => getMeetingFiles(meeting._id)}>get files</Button>
                  </TableCell>

                  <TableCell>
                  <input type="file" name="fileName"   style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={(event) => setFile(event.target.files[0])}/>

                  <Button className={classes.button }   
                    onClick={() => fileInput.current.click()} >
                    <AttachFileIcon style={{ fontSize: 30 }}></AttachFileIcon>
                    </Button>
                    <Button onClick={(e) => handleUpload(meeting._id)}  className={classes.button} >
                      <CloudUploadIcon   style={{ fontSize: 30 }}/>
                    </Button>
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
          {/* </Async> */}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={endedMeeting.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Meeting Outputs
        </DialogTitle>
        <DialogContent dividers>
          {meetingFile.map((file)=>
          <div>
           <Button href="" color="primary" onClick={() => window.open(file.fileName,{ replace: true })}>
           {file.name}
         </Button>
         <br></br>
         </div>
/*           <Link to={file.fileName} replace={true}></Link>
 */         )} 
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};


export default MeetingHistoryList;
