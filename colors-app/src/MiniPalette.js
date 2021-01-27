import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

///JSS also known as CSS in JS. This feature
// allows us to use nestings, and component
//specific styling. Syntax for it is still: JS (Camelcase and Strings).
const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidder",
    border: "1px solid black",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    backgroundColor: "grey",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
};

class MiniPalette extends Component {
  render() {
    // we automatically get "classes" with our props
    //with material-ui. it takes our "main" style and
    //gives it a unique id (on top of the class name)
    //which makes it unique to this component.
    const { classes, paletteName, emoji } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.colors}></div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

// This is what is known as a higher order component.
// It takes our component and integrates the styles
// to it to add css.
export default withStyles(styles)(MiniPalette);
