
import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
function App() {
 // localStorage.setItem(loggedIn, false)
  const loggedIn = localStorage.getItem('loggedIn')
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  console.log(loggedIn)
  const routing = useRoutes(routes(loggedIn));
  //console.log(user)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;
