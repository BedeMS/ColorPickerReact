import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggleColorList from "./DraggleColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickForm from "./ColorPickForm";
import styles from './styles/NewPaletteFormStyles';
const drawerWidth = 400;



class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20,
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: "teal",
      colors: this.props.palettes[0].colors,
      newColorName: "",
      // newPaletteName: "",
    };
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  addNewColor(newColor) {
    this.setState({ colors: [...this.state.colors, newColor] });
  }
  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }

  clearColors() {
    this.setState({ colors: [] });
  }

  addRandomColor() {
    //pick random color from existing palettes
    const allColors = this.props.palettes.map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor] });
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = this.state.colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.contianer}>
            <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearColors}
                className={classes.button}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addRandomColor}
                disabled={paletteIsFull}
                className={classes.button}
              >
                Random Color
              </Button>
            </div>
            <ColorPickForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggleColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
          {/* {this.state.colors.map((color) => (
            <DraggleColorBox
              key={color.name}
              color={color.color}
              name={color.name}
              handleClick={() => this.removeColor(color.name)}
            />
          ))} */}
        </main>
      </div>
    );
  }
}

// NewPaletteForm.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
