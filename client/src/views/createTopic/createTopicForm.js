import React,{useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Select,
  InputLabel ,
  MenuItem,
  TextField,
  Divider,
  FormLabel ,
  makeStyles,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel ,
  CardContent,
  Snackbar,
  FormControl
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    minWidth: 150,
    maxWidth: 300,
  }
}));


const CreateTopicForm = props => {

  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  var [errorMessage,setErrorMessage]=useState("");
  var [successMessage,setSuccessMessage]=useState("");
  const [category, setCategory] = React.useState('');
  const [state, setState] = React.useState({
    checkedDecision: false,
    checkedInfo: false,
  });
  const { checkedDecision, checkedInfo } = state;
  const error = [checkedDecision, checkedInfo].filter((v) => v).length < 1;

  //Alert Function
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//Close func for closing the alert
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};
  // The function that handles the logic when submitting the form
  const handleSubmit = async values => {
    // This function received the values from the form
    // The line below extract the two fields from the values object.
    const { title, description,totalTime } = values;
    var body = {
        title: title,
        description: description,
        totalTime: totalTime,
        category: category,
        decision:checkedDecision,
        information: checkedInfo
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    };
    const url = "http://localhost:81/topic/topicSave";
    try {
      const response = await fetch(url, options);
      const text = await response.json();
      console.log(text)

      if (text.status == "success") {
        console.log("success")
        setSuccessMessage(text.message);
        setOpen(true);
        //Form reset must be done!!!
        console.log(checkedDecision)
        console.log(checkedInfo)
      } else {
        console.log(text.message);
        setErrorMessage(text.message);
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    } 
  };

  //For updating the selector -duration time-
  
  const updateCategory = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };
  

  const handleCB = (event,value) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    
  };
  
  // Returning the part that should be rendered
  // Just set handleSubmit as the handler for the onSubmit call.
  return (
    
   <Container maxWidth={false}>
    <Formik
      initialValues={{
        title: '',
        description: '',
        category:"",
        totalTime:''
      }}
      onSubmit={handleSubmit}

      //********Using Yup for validation********/

      validationSchema={Yup.object().shape({
        title: Yup.string().max(100).required('Title is required'),
        description: Yup.string().max(255).required('Description is required'),
       
        totalTime: Yup.string().required("Duration is required").matches(/^\d+$/, 'The field should have digits only')
        
      })}
      
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <>
          
            <form onSubmit={handleSubmit} noValidate>
            <Card>
            <CardContent>
            <CardHeader
          subheader="Please enter the necessary information for creating a topic"
          title="Create Topic"
        />
        <Divider />
                
              <TextField
                error={Boolean(touched.title && errors.title)}
                fullWidth
                helperText={touched.title && errors.title}
                label="Title"
                margin="normal"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                variant="outlined"
                
              />
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                margin="normal"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
                multiline
                rows={5}
              />
              <TextField
                error={Boolean(touched.totalTime && errors.totalTime)}
                fullWidth
                helperText={touched.totalTime && errors.totalTime}
                label="Duration in minutes"
                margin="normal"
                name="totalTime"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.totalTime}
                variant="outlined"
              />
        
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={category}
          onChange={updateCategory}
          label="Category"
          
        >    
          <MenuItem value={"Budget Meeting"}>Budget Meeting</MenuItem>
          <MenuItem value={"HR Meeting"}>HR Meeting</MenuItem>
          <MenuItem value={"Project Meeting"}>Project Meeting</MenuItem>
        </Select>
      </FormControl>
          <br/><br/>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select at least one meeting output</FormLabel>
        <FormControlLabel
          control={<Checkbox checked={state.checkedDecision} onChange={handleCB} name="checkedDecision" value={checkedDecision}/>}
          label="Decision"
        /> 
       <FormControlLabel
          control={<Checkbox checked={state.checkedInfo} onChange={handleCB} name="checkedInfo" value={checkedInfo} />}
          label="Information "
        />
        </FormControl>

          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={3}
          >
          <Button
            color="primary"
            variant="contained"
            disabled={isSubmitting}
            type="submit"
            variant="contained"
          >
           Create Topic
          </Button>

        </Box>
        </Card>
        </form>
          </>
        );
      }}
    </Formik>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    {!Object.keys(errorMessage).length == 0 ? 
     
         (<Alert onClose={handleClose} severity="Error">
         {errorMessage}  
     </Alert>)
        :(<Alert onClose={handleClose} severity="success">
            {successMessage}  
        </Alert>)}
        
        
      </Snackbar>
  </Container>
  );
};

export default CreateTopicForm;
