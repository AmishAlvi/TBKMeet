import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import CalendarView from './calendarView';
import { Search as SearchIcon } from 'react-feather';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MeetingListView = () => {
  const classes = useStyles();
  const [meetings] = useState(data);
  
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: false,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        console.log(state);
      };
  return (
    <Page
      className={classes.root}
      title="Meetings"
    >
      <Container maxWidth={false}>
      <div
      
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
    <Box mt={3}>
    {!state.checkedB ? ( 
          <Results meetings={meetings} />
        ):(<CalendarView></CalendarView>)}
 </Box>
      </Container>
      
    </Page>
  );
};

export default MeetingListView;
