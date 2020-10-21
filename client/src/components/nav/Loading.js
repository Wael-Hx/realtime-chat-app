import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const Loading = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size="1.5em" color="secondary" />
    </div>
  );
};

export default Loading;
