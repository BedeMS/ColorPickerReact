import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => value.toLowerCase() !== paletteName.toLowerCase()
      )
    );
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const { newPaletteName } = this.state;
    const { classes, open } = this.props;
    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm
              onSubmit={() => this.props.handleSubmit(newPaletteName)}
            >
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                onChange={this.handleChange}
                value={this.state.newPaletteName}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Palette Name is Required",
                  "Palette Name Must Be Unique",
                ]}
              />
              <Button variant="contained" color="secondary" type="submit">
                Save Palette
              </Button>
              <Link to="/">
                <Button variant="contained" color="primary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save Palette
            </Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;