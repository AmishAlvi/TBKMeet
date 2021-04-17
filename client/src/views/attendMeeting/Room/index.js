import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
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
const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
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
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomID = Room[id];
    const classes = useStyles();

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
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            //stream.getAudioTracks()[0].enabled = false;
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

    return (
        <Container style={{width:"100%"}}>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
    <div className={classes.footerStyle}>
        {muteButtonRender()}
        {camButtonRender()}
        {recordButtonRender()}
        <Button variant="contained" className={classes.exitButton}> Exit</Button>
    </div>
        </Container>

        
    );
};

export default Room;