import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MeetingHistoryList from './meetingHistoryList';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MeetingHistoryView = () => {
  const classes = useStyles();
  
    
      
  return (
    <Page
      className={classes.root}
      title="Meeting History"
    >
        <Container maxWidth={false}>
         <Box mt={3}>
      <MeetingHistoryList/>
      </Box>
      </Container>
    </Page>
  );
};

export default MeetingHistoryView;
