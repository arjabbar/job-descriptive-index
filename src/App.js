import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, useTheme, fade, makeStyles } from "@material-ui/core";
import Questionnaire from './Questionnaire.jsx'
import Intro from './Intro.jsx';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: `${theme.spacing(8)}px ${theme.spacing(20)}px`,
    maxWidth: 1200,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  root: {
    height: '100%'
  },
  logo: {
    cursor: 'pointer'
  }
}));

function App() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          backgroundColor: fade(theme.palette.secondary.dark, 0.8)
        }}
      >
        <Toolbar>
          <Typography variant="h5" onClick={() => window.location = "/"} className={classes.logo}>
            The Job Descriptive Index Questionnaire
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Intro />
            </Route>
            <Route path="/questionnaire">
              <Questionnaire></Questionnaire>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
