
import React, { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';

const linearGradient = makeStyles({
    root:{
    background: 'linear-gradient(45deg,  #9face6 30%,  #74ebd5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(159, 172, 230, .3)',
    color: 'white',
    height:60,
    padding: '0 30px',
    },
    
  
});

export default linearGradient;