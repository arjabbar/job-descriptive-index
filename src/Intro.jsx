import React from 'react';
import { Paper, Typography, Divider, makeStyles, Button, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  intro: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  divider: {
    margin: `${theme.spacing(2)}px auto`,
    maxWidth: theme.spacing(10),
    height: 4,
    backgroundColor: theme.palette.primary.light
  },
  startButton: {
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  }
}));

const Intro = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper className={classes.intro}>
      <Typography variant="h4">Welcome to the JDI Questionnaire!</Typography>
      <Divider className={classes.divider} variant="middle" />
      <Typography variant="h5">The JDI (Job Descriptive Index) Questionnaire is designed to gauge how satified you are with your job. The JDI was first published in 1969 in the book <b>The Measurement of Satisfaction in Work and Retirement</b> by Smith, Kendall, and Hulin.</Typography>
      <Divider className={classes.divider} variant="middle" />
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        className={classes.startButton}
        onClick={() => {
          history.push("/questionnaire");
        }}
      >
        Start Questionnaire
      </Button>
      <Divider className={classes.divider} variant="middle" />
      <Typography variant="caption">This website is not officially endorsed by the creators of the JDI. Please refer to the book, or <Link href="https://www.bgsu.edu/arts-and-sciences/psychology/graduate-program/industrial-organizational/research/job-descriptive-index.html">this website</Link> for detailed information.</Typography>
    </Paper>
  )
};


export default Intro;