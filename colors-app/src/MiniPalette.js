import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";


///JSS also known as CSS in JS. This feature
// allows us to use nestings, and component 
//specific styling. Syntax for it is still: JS (Camelcase and Strings).
const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal",
    "& h1": {
        backgroundColor: "orange",
        display: "inline-block"
    }
  },

};

class MiniPalette extends Component {
  render() {
    // we automatically get "classes" with our props
    //with material-ui. it takes our "main" style and
    //gives it a unique id (on top of the class name) 
    //which makes it unique to this component.
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <h1>Mini Palette</h1>
      </div>
    );
  }
}

// This is what is known as a higher order component.
// It takes our component and integrates the styles
// to it to add css.
export default withStyles(styles)(MiniPalette);
