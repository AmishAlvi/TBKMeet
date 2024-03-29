import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ModifyMeetingForm from './ModifyMeetingForm';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));
  
  const ModifyMeeting = () => {
    const classes = useStyles();
  
    return (
      <Page
        className={classes.root}
        title="Modify Meeting"
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
            <ModifyMeetingForm />
            </Grid>
          </Grid>
        </Container>
      </Page>
    );
  };
  
  export default ModifyMeeting;
  