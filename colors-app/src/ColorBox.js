import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import chroma from "chroma-js";
import "./ColorBox.css";

const styles = {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showingFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: "1",
      transition: "0.5s",
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.70 ? "black" : "white",
  },
  // colorName: {
  //   color: (props) =>
  //     chroma(props.background).luminance() < 0.08 ? "white" : "black",
  // },
  seeMore: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.70 ? "black" : "white",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0",
    bottom: "0",
    // color: "white",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.70 ? "black" : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    textDecoration: "none",
    display: "inline-block",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.3)",
    lineHeight: "30px",
    textTransform: "uppercase",
    border: "none",
    opacity: "0",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }
  render() {
    const {
      name,
      background,
      paletteId,
      id,
      showingFullPalette,
      classes,
    } = this.props;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={this.state.copied ? "copy-overlay show" : "copy-overlay"}
          />
          <div className={`copy-msg ${this.state.copied && "show"}`}>
            <h1>Copied</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorText}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
