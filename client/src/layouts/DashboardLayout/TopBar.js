import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import linearGradient from 'src/components/linearGradient'


const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = linearGradient();
  const [notifications] = useState([]);
  const navigate = useNavigate();

  const Logout = () => {
    //dispatch(logout());
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')   
      const options = {
        method: "GET",
       credentials:"include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      };
      const url = "http://localhost:81/auth/logout";
      try {
        const response = fetch(url, options);
      } catch (error) {
        console.error(error);
      }

      navigate('/login', { replace: true });
    }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
         
          </IconButton>
          <IconButton color="inherit"  onClick= {Logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
            </IconButton>
          <IconButton color="inherit"  onClick= {Logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
