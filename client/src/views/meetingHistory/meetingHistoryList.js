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
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  button: { borderRadius: 50},

  /* tableRow: {
    height: 30
  }, */
}));

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
  const [currentFile, setCurrentFile] = useState("")

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
        console.log(text.data)
        if(text.data.fileName) {
          setCurrentFile(text.data.fileName)
        }   
      } else {
        console.log(text.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleUpload(e, meetingId){
    /*console.log('tmp')
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

    })*/

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
                    <Async promiseFn={getMeetingFiles(meeting._id)}> </Async>
                    <Link to={currentFile}> download </Link>
                  </TableCell>

                  <TableCell>
                  <input type="file" name="fileName"   style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={(event) => setFile(event.target.files[0])}/>

                  <Button className={classes.button }   
                    onClick={() => fileInput.current.click()} >
                    <AttachFileIcon style={{ fontSize: 30 }}></AttachFileIcon>
                    </Button>
                    <Button onClick={handleUpload(meeting._id)}  className={classes.button} >
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
    </Card>
  );
};


export default MeetingHistoryList;
