import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
};

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
    this.setState({ newColorName: "" });
  }
  render() {
    const { paletteIsFull, classes } = this.props;
    const { newColorName, currentColor } = this.state;
    return (
      <div>
        <ChromePicker
          onChangeComplete={this.updateCurrentColor}
          color={currentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
          placeholder="Color Name"
            className={classes.colorNameInput}
            variant='filled'
            margin='normal'
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
            className={classes.addColor}
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

export default withStyles(styles)(ColorPickForm);
