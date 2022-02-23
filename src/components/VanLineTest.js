import React from "react";
import LineTo from "react-lineto";
const VanLineTest = () => {

  return (
    <div>
      <div className="A">Element A</div>
      <br />
      <br />
      <br />
      <br />
      <div className="B">Element B</div>
      <LineTo from="A" to="B"  borderColor={"red"} borderWidth={10} />
    </div>
  );
};

export default VanLineTest;
