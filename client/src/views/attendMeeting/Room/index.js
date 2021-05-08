import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import linearGradient from 'src/components/linearGradient';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import styled from "styled-components";
import TextField from "@material-ui/core/TextField"
import {useParams} from 'react-router-dom';
import { id } from "date-fns/esm/locale";
import { Button,Input,Grid,Box,Container } from "@material-ui/core";
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import axios from 'axios';
import Countdown from "react-countdown";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SendIcon from '@material-ui/icons/Send';
import Timer from './timer'
import ChatIcon from '@material-ui/icons/Chat';

/* const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`; */

const StyledVideo = styled.video`
    background: black;
    height: 40%;
    width: 100%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};
const useStyles = makeStyles((theme) => ({
   button: { borderRadius: 50},
   exitButton:{backgroundColor:"#d32f2f", 
   color:"#ffebee",
   '&:hover': {
    backgroundColor: '#b71c1c',
    color: '#ffebee',
},

},
   footerStyle: {
    backgroundColor: fade('#262C29',0.2),
    fontSize: "20px",
    color: "white",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    paddingLeft: "0px",
    paddingRight: "30px",
    paddingTop:"10px",
    paddingBottom:"10px",
    position: "fixed",
    left: "0",
    display:"flex",
    bottom: "0",
    height: "10%x",
    width: "100%",
    justifyContent: "space-between",  
   },
   phantomStyle: {
    display: "block",
    padding: "20px",
    height: "1000px",
    width: "100%"
   },
  Content:
{
  height:"224px",
  overflow:"auto",
  
},
FixedHeightContainer:
{
  float:"right",
  height: "250px",
  width:"250px",
  padding:"1px",
  overflow:"auto",

}
  }));



const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [micStatus,setMicStatus]=useState(true)
    const [camStatus,setCamStatus]=useState(true)
    const [recordStatus,setRecordStatus]=useState(false)
    const [meetingData ,setMeeting]=useState([]);
    const socketRef = useRef();
    const chatSocketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const params = useParams();
    const roomID = params.roomID;
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('user'));
    const [ state, setState ] = useState({ message: "", name: user.firstName + " " + user.lastName })
	  const [ chat, setChat ] = useState([])
    //const [currentTime, setCurrentTime] = useState();
    const [selectedFile, setFile] = useState();
    const [meetingTopicIDs, setTopicIDs] = useState();

    const fileInput = useRef(null)
    const [duration, setDuration] = useState();
    const [isOwner, setOwner] = useState(false);



    //console.log("room id: " , params.roomID)

    /*useEffect(async () => {

    },[]);*/

   // console.log("meeting data: " ,meetingData)
  
  /* const duration = meetingData.duration
   const hours = Math.floor(duration/60)
   const minutes = duration - (hours*60)*/

   /* console.log("topics: " , meetingTopicIDs)
    console.log("date: ", duration.date)
    const mildate = new Date(duration.date)
*/
    //msToTime(duration)

    //setCurrentTime(Date.now())
   /* const meetingDuration = mildate.getTime() - currentTime
    msToTime(mildate.getTime())

    console.log("meeting duration: " , msToTime(meetingDuration))
    console.log("date: ", meetingDuration)*/



    useEffect(
		() => {
			chatSocketRef.current = io.connect("https://tbkmeet-chatserver.herokuapp.com/")
			chatSocketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => chatSocketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		chatSocketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			
      <div key={index}  >
				<h3>
        {message.startsWith("http") ? ( <span>
        {name} : <a href={message}  class="active"> Click here to download attachment </a></span>
      ) : (
        <span>
        {name} : {message} 
        </span>
      )}
					
				</h3>
			</div>
		))
	}

  /*   function Footer({ children }) {
        return (
          
            <div className={classes.phantomStyle} />
            
          
        );
      } */

     useEffect( async () => {
        let url = `http://localhost:81/meeting/getMeetings/${roomID}`;
         await axios.get(url, {withCredentials: true})
        .then(res => { // then print response status
          setMeeting(res.data.data)
          setTopicIDs(res.data.data.topic)
          console.log(res.data)
          console.log(user._id)
          setDuration(res.data.data.duration)
        })
      }, [] );

      

    function muteButtonRender() {

        if(micStatus)
        {
          return (
            
            <Button onClick={muteSelf}  className={classes.button} >
                <MicRoundedIcon  style={{ fontSize: 40 }}/>
            </Button>
            
          )
        }
        else
        {
          return(
          
            <Button onClick={muteSelf}  className={classes.button} > 
            <MicOffRoundedIcon style={{ fontSize: 40 }}/>
            </Button>
          
          )
        }
      }
      function camButtonRender() {
        //console.log(id)
        if(camStatus)
        {
          return (
            
            <Button onClick={closeCamera} className={classes.button}>
                <VideocamRoundedIcon
                 style={{ fontSize: 40 }}
                />

            </Button>
            
          )
        }
        else
        {
          return(
          
            <Button onClick={closeCamera} className={classes.button}>
                <VideocamOffRoundedIcon
                 style={{ fontSize: 40 }}
                />
        </Button>
          
          )
        }
      }
      
    useEffect(() => {
        socketRef.current = io.connect("https://tbkmeet-videoserver.herokuapp.com/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                  peerID: payload.callerID,
                  peer,
                });
           
              setPeers([...peersRef.current]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on('user disconnected', id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if(peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            })
        })

    }, []);



    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }
   function muteSelf()
    {
        if(micStatus)
        setMicStatus(false)
        else
        setMicStatus(true)
        userVideo.current.srcObject.getAudioTracks()[0].enabled = !userVideo.current.srcObject.getAudioTracks()[0].enabled;
    }

    function closeCamera()
    {
        if(camStatus)
        setCamStatus(false)
        else
        setCamStatus(true)
        userVideo.current.srcObject.getVideoTracks()[0].enabled = !userVideo.current.srcObject.getVideoTracks()[0].enabled;
    }

    function handleUpload(e){
      console.log('tmp')
      const data = new FormData() 
      data.append('fileName', selectedFile)
      data.append('meetingId', roomID)
      console.log(selectedFile);
      let url = "http://localhost:81/fileupload";

      axios.post(url, data, {withCredentials: true , headers: 
        {"Content-Type": "multipart/form-data",} 
      },)
      .then(res => { // then print response status
          console.log(res.data.location);
          state.message = res.data.location;
          const { name, message } = state
		      chatSocketRef.current.emit("message", { name, message })
		      e.preventDefault()
		      setState({ message: "", name })

      })

    }

    function handleExit(e){
      window.close()
    }

    return (
      <Container>
        <Grid container>
        <Grid item xs={6}>
        <Container style={{width:"100%"}} >
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
            </Container>
            </Grid>
      <Grid item alignItems="stretch" style={{ display: "flex" }} >
      <Card className={classes.root} variant="outlined">
      <CardContent>

				<h1>Chat Log</h1>
        <div className={classes.FixedHeightContainer}>
				{renderChat()}
        </div>
        
      <form onSubmit={onMessageSubmit}>
      <Grid container>
      <Grid item>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						placeholder="Enter your Message"
					/>
				</Grid>
        <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Button type="submit" className={classes.button} >
                <SendIcon  color='secondary'  style={{ fontSize: 30 }} />
            </Button>
            </Grid>
      </Grid>
			</form>
      </CardContent>
    </Card>
    </Grid>
    </Grid>

    <div className={classes.footerStyle}>
      <div>
        {muteButtonRender()}
        {camButtonRender()}

        </div>
        {duration ? <Timer initialMinute = {duration} /> : <span>loading time</span>}
        <div style={{alignItems: 'flex-end'}}>
        <input type="file" name="fileName"   style={{ display: 'none' }}
        ref={fileInput}
        onChange={(event) => setFile(event.target.files[0])}/>

        <Button className={classes.button }   
        onClick={() => fileInput.current.click()}
        <AttachFileIcon style={{ fontSize: 40 }}></AttachFileIcon>
        
        </Button>

        {console.log(selectedFile)}
        <Button onClick={handleUpload}  className={classes.button} >
                <CloudUploadIcon   style={{ fontSize: 40 }}/>
        </Button>
        <Button variant="contained" className={classes.exitButton} onClick={handleExit}> Exit</Button>
    </div>
    </div>
    </Container>

        
    );
            };

export default Room;