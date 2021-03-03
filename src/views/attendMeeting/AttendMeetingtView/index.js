import React, { useEffect, useState, useRef } from 'react';
/*import {
  makeStyles,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";*/
import { v1 as uuid } from "uuid";
import { useNavigate } from 'react-router-dom';



const AttendMeeting = (props) => {
  let navigate = useNavigate()
  function create() {
      const id = uuid();
      navigate(`/app/room/${id}`, {id: id});
  }

  return (
      <button onClick={create}>Create room</button>
  );
};

export default AttendMeeting;
  
