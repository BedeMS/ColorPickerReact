import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggleColorBox from "./DraggleColorBox";

const DraggleColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggleColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggleColorList;
