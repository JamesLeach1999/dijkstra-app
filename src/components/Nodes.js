import React, { useState } from "react";
import "./Dialog.css";
import ConnectionContext from "../context/Connection";

function Nodes({ id, show, removeNode, name }) {

  var [diffX, setDiffX] = useState(0);
  var [diffY, setDiffY] = useState(0);
  var [dragging, setDragging] = useState(false);
  var [styles, setStyles] = useState({});

  function dragStart(e) {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setDragging(true);
  }

  function draggingT(e) {
    if (dragging) {
      var left = e.screenX - diffX;
      var top = e.screenY - diffY;

      setStyles({ left: left, top: top });
    }
  }

  function dragEnd() {
    setDragging(false);
  }

  return (
    <div
      className={show ? "Dialog" : "Dialog hidden"}
      style={styles}
      onMouseDown={dragStart}
      onMouseMove={draggingT}
      onMouseUp={dragEnd}
    >
      <div className="DialogTitle">Location</div>
      <div className="Contents">{name}</div>
      <div
        className="closeButton"
        onClick={() => {
            console.log(id, name)
            removeNode(id);
        }}
      >
        close
      </div>
    </div>
  );
}

export default Nodes;
