import React, { Component } from "react";
import ColorBox from "./ColorBox";
import { generatePalette } from "./color-helpers";
import seedColors from './seedColors'
import "./Palette.css";

class Palette extends Component {
  render() {
    const colorBoxes = this.props.colors.map((color) => (
      <ColorBox background={color.color} name={color.name} />
    ));
    console.log(generatePalette(seedColors[4]));
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer goes here */}
      </div>
    );
  }
}

export default Palette;
