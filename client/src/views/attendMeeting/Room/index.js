import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField"
import {useParams} from 'react-router-dom';
import { id } from "date-fns/esm/locale";
import { Button } from "@material-ui/core";
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import axios from 'axios';
import Countdown from "react-countdown";
import Timer from './timer'

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

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
    justifyContent:"flex-end",
    bottom: "0",
    height: "10%x",
    width: "99%"  
   },
   phantomStyle: {
    display: "block",
    padding: "20px",
    height: "1000px",
    width: "100%"
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
    const now = Date.now()
    const [selectedFile, setFile] = useState();

    const CountdownWrapper = () => <Countdown date={now + 100000} />;
    const MemoCountdown = React.memo(CountdownWrapper);

    //console.log("room id: " , params.roomID)

    useEffect(async () => {
      const result = await axios(
  
        `http://localhost:81/meeting/getMeetings/${roomID}`,
          {withCredentials: true}
  
      );
      setMeeting(result.data.data)
    },[]);

  
    const duration = meetingData
    console.log(duration)



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
			<div key={index}>
				<h3>
        {message.startsWith("http") ? ( <span>
        {name} : <a href={message}  class="active">{message}</a></span>
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
      function recordButtonRender() {
        //console.log(id)
        if(recordStatus)
        {
          return (
            
            <Button onClick={startRecord} className={classes.button} style={{ color:"#d32f2f"}}>
                <FiberManualRecordIcon
                 style={{ fontSize: 40 }}
                />

        </Button>
            
          )
        }
        else
        {
          return(
          
            <Button onClick={startRecord} className={classes.button} style={{ alignItems:"center"}}  >
                <FiberManualRecordIcon
                 style={{ fontSize: 40  }}
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
    function startRecord(){
        if(recordStatus)
        setRecordStatus(false)
        else
        setRecordStatus(true)
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

    return (
        <Container style={{width:"100%"}}>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}
            {
            <div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div> }

    

    <div className={classes.footerStyle}>
        {muteButtonRender()}
        {camButtonRender()}
        {recordButtonRender()}
        <Timer initialMinute = {0} initialSeconds = {150} />
        <Button variant="contained" className={classes.exitButton}> Exit</Button>
        <input type="file" name="fileName" onChange={(event) => setFile(event.target.files[0])}/>
        {console.log(selectedFile)}
        <button type="button" class="btn btn-success btn-block" onClick={handleUpload}>Upload</button> 
    </div>
        </Container>

        
    );
};

export default Room;