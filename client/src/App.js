
import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
function App() {
  const user = useSelector(selectUser);
  const routing = useRoutes(routes(user));
  //console.log(user)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
}

export default App;
