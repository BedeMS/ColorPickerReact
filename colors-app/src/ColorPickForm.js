import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import DraggleColorBox from "./DraggleColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggleColorList from "./DraggleColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";

class ColorPickForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "teal",
      newColorName: "",
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log(this.state.colors);
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  updateCurrentColor(newColor) {
    console.log(newColor);
    this.setState({ currentColor: newColor.hex });
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor(newColor);
  }
  render() {
    const { paletteIsFull } = this.props;
    const {newColorName, currentColor} = this.state
    return (
      <div>
        <ChromePicker
          onChangeComplete={this.updateCurrentColor}
          color={currentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            name="newColorName"
            value={newColorName}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Field is Required",
              "Color name must be Unique",
              "Color already Used",
            ]}
          />
          <Button
            disabled={paletteIsFull}
            variant="contained"
            color="primary"
            style={{
              backgroundColor: paletteIsFull ? "grey" : currentColor,
            }}
            type="submit"
          >
            {paletteIsFull ? "Palette Is Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickForm;
