import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import EventIcon from '@material-ui/icons/Event';
const Toolbar = ({ className, ...rest }) => {
const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
          <Grid
          container
         direction="row"
        justify="space-between"
      alignItems="center"
>
            <Box maxWidth={500} minWidth={400}>

              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search meeting"
                variant="outlined"
              />
            </Box>
            
            {/* switch component for calendar view */}
            <Box>
            <FormControlLabel
            control={
          <Switch
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Calendar View"
      />
     {/*  <EventIcon></EventIcon> */}
      </Box>
      </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
