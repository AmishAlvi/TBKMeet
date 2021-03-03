import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CreateTopicForm from './createTopicForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CreateTopic = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Create Topic"
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
            <CreateTopicForm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CreateTopic;
