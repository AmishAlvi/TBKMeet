import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import CalendarView from './calendarView';

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

  return (
    <Page
      className={classes.root}
      title="Meetings"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results meetings={meetings} />
        </Box>
      </Container>
      <CalendarView></CalendarView>
    </Page>
  );
};

export default MeetingListView;
