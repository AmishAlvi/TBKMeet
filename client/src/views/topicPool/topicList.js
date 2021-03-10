import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
  
} from '@material-ui/core';
import Async from 'react-async';
import { CompareArrowsOutlined } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

/* 
const deneme=(async res=>{
const url="http://localhost:81/topic/getTopic";
response = await fetch(url);
const data = await response.json();
console.log(data);}) */

const TopicList = ({ className,  ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };
  const [topic, setTopic]=useState([]);    
  const emptyRows = limit - Math.min(limit, topic.length-1 - page * limit);
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const getTopics = async values => {
    const url = "http://localhost:81/topic/getTopic";
    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log(data)

      if (data.status == "success") {
        console.log("success");
        setTopic(data.data)
        console.log(topic)
        
      } else {
        console.log("error");
        
      }
    } catch (error) {
      console.error(error);
    } 
  };

   
  
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
     
      <PerfectScrollbar>
        <Box minWidth={1050}>
        <Async promiseFn={getTopics}>
          <Table>
            <TableHead>
              <TableRow>
               
              <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Duration
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Meeting Output
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               {topic.slice( page* limit, page * limit + limit).map((topic) => (
                <TableRow
                  hover
                 // key={meetings.id}
                  
                >
                 
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {topic.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                     {topic.totalTime} 
                  </TableCell>
                  <TableCell>
                  {topic.category}  
                  </TableCell>
                  <TableCell>
                  {topic.info} 
                  </TableCell>
                  <TableCell>
                 {/*  {topic.description} */} 
                  </TableCell>
                  
                </TableRow>
              ))} 
               {emptyRows > 0 && (
                <TableRow style={{ height:  56 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          </Async>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={topic.length-1}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default TopicList;
