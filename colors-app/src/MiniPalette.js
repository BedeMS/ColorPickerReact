import React, { PureComponent } from "react";
/// in order to have JSS we need:
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";

//Material-UI is one of the top user interface libraries for React out there
///JSS also known as CSS in JS. This feature
// allows us to use nestings, and component
//specific styling. Syntax for it is still: JS (Camelcase and Strings).
 
class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  deletePalette(e) {
    e.stopPropagation();
    this.props.openDialog(this.props.id)
  }

  handleClick(){
    this.props.goToPalette(this.props.id)
  }
  
  render() {
    // we automatically get "classes" with our props
    //with material-ui. it takes our "main" style and
    //gives it a unique id (on top of the class name)
    //which makes it unique to this component.
    const { classes, paletteName, emoji, colors,} = this.props;

    const miniColorBoxes = colors.map((el) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: el.color }}
        key={el.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all .5s ease-in-out" }}
          onClick={this.deletePalette}
        />

        <div className={classes.colors}>{miniColorBoxes}</div>
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
