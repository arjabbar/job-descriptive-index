import React, { useState } from 'react';
import { Paper, makeStyles, fade, AppBar, Toolbar, Typography, Divider, Grid, Button, IconButton, Stepper, Step, StepLabel, Slide, Fade, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemAvatar, Avatar, ListItemText, Hidden } from '@material-ui/core';
import { Check as YesIcon, Clear as NoIcon, Help as UndecidedIcon, ArrowLeft, ArrowRight, Close, Assessment } from "@material-ui/icons";
import questionnaire from "./assets/data";
import { red, amber, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: fade(theme.palette.common.white, 0.9),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2)
      }
    }
  },
  question: {
    fontSize: '1.5rem',
    padding: theme.spacing(2)
  },
  answers: {
    margin: theme.spacing(2),
    width: 'unset',
    '& > *': {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '33%'
      }
    }
  },
  adjective: {
    color: theme.palette.primary.light,
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem'
    }
  },
  short: {
    fontSize: '5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem'
    }
  },
  long: {
    fontSize: '3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem'
    }
  },
  adjectiveContainer: {
    minHeight: theme.spacing(15),
    [theme.breakpoints.down('md')]: {
      minHeight: theme.spacing(7)
    }
  },
  answerButton: {
    fontSize: '1.4rem',
    padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
    width: '100%',
    '& > *': {
      position: 'relative',
      right: '10pt'
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.9rem',
      '& > *': {
        right: 0
      }
    }
  },
  answerButtonIcon: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  yes: {
    '&, &:hover, &:active': {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white
    }
  },
  no: {
    '&, &:hover, &:active': {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white
    }
  },
  undecided: {
    '&, &:hover, &:active': {
      backgroundColor: theme.palette.grey[600],
      color: theme.palette.common.white
    }
  },
  buttonTip: {
    marginTop: theme.spacing(),
    display: 'block'
  },
  stepper: {
    marginBottom: theme.spacing(4),
    borderRadius: 100
  },
  avatar: {
    backgroundColor: theme.palette.secondary,
    position: 'relative',
    '& > svg': {
      zIndex: 2
    }
  },
  avatarPercentageGauge: {
    width: '100%',
    backgroundColor: theme.palette.primary.light,
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },
  listItem: {
    '& > * > *': {
      fontSize: '1.1rem'
    }
  },
  resultsButton: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const Questionnaire = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [activeAdjective, setActiveAdjective] = useState(0);
  // Scores will be a 2D array of unequalliy sized columns where the indicies correspond to facets and adjectives/questions within that facet.
  const [scores, setScores] = useState(questionnaire.facets.map(x => new Array(Object.keys(x.adjectives).length)));
  const [isCompleted, setIsCompleted] = useState(false);

  function markAnswer(answer) {
    const { isPositive } = Object.values(questionnaire.facets[activeStep].adjectives)[activeAdjective];
    let score = scores[activeStep][activeAdjective] || 1;
    if (answer === "Y") {
      score = isPositive ? 3 : 0;
    } else if (answer === "N") {
      score = isPositive ? 0 : 3;
    } else if (answer === "?") {
      score = 1;
    } else {
      throw new Error("The answer given is unsupported: " + answer + ". Only 'Y','N', or '?' is supported.");
    }
    console.log(score);
    setScores(s => {
      s[activeStep][activeAdjective] = score;
      return s;
    });
  }

  function goToNextQuestionOrComplete() {
    const isLastQuestionInFacet = activeAdjective === Object.keys(questionnaire.facets[activeStep].adjectives).length - 1;
    const isLastFacet = activeStep === questionnaire.facets.length - 1;
    if (isLastQuestionInFacet && isLastFacet) {
      setIsCompleted(true);
    } else if (isLastQuestionInFacet && !isLastFacet) {
      setActiveStep(step => step + 1);
      setActiveAdjective(0);
    } else {
      setActiveAdjective(adj => adj + 1);
    }
  }

  function getScore(facet) {
    return scores[questionnaire.facets.indexOf(facet)].reduce((prev, next) => prev + next, 0);
  }

  function getMaxScore(facet) {
    return Object.keys(facet.adjectives).length * 3;
  }

  function getPercentageScore(facet) {
    return ((getScore(facet) / getMaxScore(facet)) * 100).toFixed(0);
  }

  return (
    <>
      <Hidden smDown>
        <Stepper variant="elevation" elevation={4} activeStep={activeStep} className={classes.stepper}>
          {questionnaire.facets.map(x => (
            <Step key={x.title}>
              <StepLabel>{x.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Hidden>
      <Paper className={classes.root}>
        {questionnaire.facets.map(facet => {
          var facetIndex = questionnaire.facets.indexOf(facet);
          if (facetIndex !== activeStep) {
            return null;
          }
          return (
            <React.Fragment key={facet.title}>
              <AppBar position="relative" color="transparent">
                <Toolbar>
                  <Typography variant="h5" align="center">
                    {facet.title}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Typography align="center" className={classes.question} color="primary">
                {facet.description}
              </Typography>
              {Object.keys(facet.adjectives).map(adj => {
                var adjectiveIndex = Object.keys(facet.adjectives).indexOf(adj);
                if (adjectiveIndex !== activeAdjective) {
                  return null;
                }
                return (
                  <Fade in key={adj}>
                    <Grid container alignItems="center" justify="center" className={classes.adjectiveContainer}>
                      <Grid item>
                        <Typography align="center" className={`${classes.adjective} ${adj.length > 15 ? classes.long : classes.short}`}>
                          {adj}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fade>
                );
              })}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton
                  disabled={activeStep === 0 && activeAdjective === 0}
                  onClick={() => {
                    if (activeAdjective === 0) {
                      setActiveStep(step => (step === 0 ? 0 : step - 1));
                      setActiveAdjective(() => Object.keys(questionnaire.facets[activeStep].adjectives).length - 1);
                    } else {
                      setActiveAdjective(adj => adj - 1);
                    }
                  }}
                >
                  <ArrowLeft />
                </IconButton>
                <Typography variant="subtitle1" align="center">
                  {activeAdjective + 1}/{Object.keys(questionnaire.facets[activeStep].adjectives).length}
                </Typography>
                <IconButton
                  disabled={scores[activeStep][activeAdjective] === undefined}
                  onClick={() => {
                    goToNextQuestionOrComplete();
                  }}
                >
                  <ArrowRight />
                </IconButton>
              </div>
              <Divider variant="middle" />
              <Grid container className={classes.answers} justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<NoIcon className={classes.answerButtonIcon} />}
                    className={`${classes.no} ${classes.answerButton}`}
                    onClick={() => {
                      markAnswer('N');
                      goToNextQuestionOrComplete();
                    }}
                  >
                    Disagree
                  </Button>
                  <Hidden smDown>
                    <Typography variant="overline" color="textSecondary" align="center" className={classes.buttonTip}>
                      {questionnaire.facets[activeStep].noIf}
                    </Typography>
                  </Hidden>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<UndecidedIcon className={classes.answerButtonIcon} />}
                    className={`${classes.undecided} ${classes.answerButton}`}
                    onClick={() => {
                      markAnswer('?');
                      goToNextQuestionOrComplete();
                    }}
                  >
                    Undecided
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<YesIcon className={classes.answerButtonIcon} />}
                    className={`${classes.yes} ${classes.answerButton}`}
                    onClick={() => {
                      markAnswer('Y');
                      goToNextQuestionOrComplete();
                    }}
                  >
                    Agree
                  </Button>
                  <Hidden smDown>
                    <Typography variant="overline" color="textSecondary" align="center" className={classes.buttonTip}>
                      {questionnaire.facets[activeStep].yesIf}
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
        <Button
          size="large"
          startIcon={<Assessment />}
          variant="contained"
          color="primary"
          className={classes.resultsButton}
          onClick={() => setIsCompleted(true)}
        >
          Results
        </Button>
      </Paper>
      <Dialog
        open={isCompleted}
        fullWidth
        onBackdropClick={() => setIsCompleted(false)}
      >
        <AppBar position="relative" color="primary">
          <Toolbar style={{ justifyContent: 'space-between'}}>
            <Typography variant="h5">
              JDI Questionnaire Scores
            </Typography>
            <IconButton color="inherit" onClick={() => setIsCompleted(false)}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List >
            {questionnaire.facets.map(facet => {
              const percentageScore = getPercentageScore(facet);
              let scoreColor = null;
              if (percentageScore > 66.6) {
                scoreColor = green[800];
              } else if (percentageScore > 33.3) {
                scoreColor = amber[800];
              } else {
                scoreColor = red[800];
              }
              return (
                <React.Fragment key={facet.title}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>
                        <span className={classes.avatarPercentageGauge} style={{ height: `${percentageScore}%`}}></span>
                        {facet.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className={classes.listItem}>
                      <Typography variant="button" component="span">
                        {facet.title} =&nbsp;
                      </Typography>
                      <Typography variant="button" component="span" color="primary">
                        {getScore(facet)}/{getMaxScore(facet)}&nbsp;
                      </Typography>
                      <Typography variant="caption">or</Typography>&nbsp;
                      <Typography variant="button" component="span" style={{ color: scoreColor }}>
                        {percentageScore}&#37;
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <Divider variant="middle" />
                </React.Fragment>
              );
            })}
          </List>
        </DialogContent>
        {/* <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              
            }}
          >
            Print
          </Button>
          <Button variant="outlined" color="primary">Share</Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default Questionnaire;