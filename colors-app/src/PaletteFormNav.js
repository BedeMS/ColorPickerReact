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
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  showForm() {
    this.setState({ formShowing: true });
  }
  hideForm(){
    this.setState({formShowing: false});
  }

  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
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
              Create A Palette
            </Typography>

            {/* <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save Palette
            </Button> */}
          </Toolbar>
          <div className={classes.navBtns}>
            {/* <ValidatorForm
              className={classes.validatorInput}
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
              </ValidatorForm> */}
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
