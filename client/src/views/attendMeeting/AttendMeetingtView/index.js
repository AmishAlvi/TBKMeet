import React, { useEffect, useState, useRef } from 'react';
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