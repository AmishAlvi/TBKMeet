import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TopicList from './topicList';
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
  
    
      
  return (
    <Page
      className={classes.root}
      title="Topics"
    >
        <Container maxWidth={false}>
         <Box mt={3}>
      <TopicList/>
      </Box>
      </Container>
    </Page>
  );
};

export default MeetingListView;
