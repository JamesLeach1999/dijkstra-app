import React, { useContext, useState, useEffect } from "react";
import NodeContext from "../context/NodeContext";

const edges = [{
  node1: "A",
  node2: "B",
  pos1: { x: 436, y: 175 },
  pos2: { x: 1631, y: 317 },
  weight: 1203.4072461141325,
}];

const name = "A";
const Edge = () => {
  var [diffX, setDiffX] = useState(0);
  var [diffY, setDiffY] = useState(0);
  var [dragging, setDragging] = useState(false);
  var [styles, setStyles] = useState({});
  var [edge, setEdge] = useState([]);
  function dragStart(e) {
    setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
    setDragging(true);
    console.log(diffX, diffY);
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
    var nodeElement = document.getElementById("d1").getBoundingClientRect();
    // center
    var cNode1 = nodeElement.left + nodeElement.width / 2;
    var cNode2 = nodeElement.top + nodeElement.height / 2;
  }
  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight,
    };
  };

  const connect = (div1, div2, color, thickness) => {
    const off1 = getOffset(div1);
    const off2 = getOffset(div2);

    const x1 = off1.left + off1.width;
    const y1 = off1.top + off1.height;

    const x2 = off2.left + off2.width;
    const y2 = off2.top;

    const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

    const cx = (x1 + x2) / 2 - length / 2;
    const cy = (y1 + y2) / 2 - thickness / 2;

    const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

    const htmlLine =
      "<div style='padding:0px; margin:0px; height:" +
      thickness +
      "px; background-color:" +
      color +
      "; line-height:1px; position:absolute; left:" +
      cx +
      "px; top:" +
      cy +
      "px; width:" +
      length +
      "px; -moz-transform:rotate(" +
      angle +
      "deg); -webkit-transform:rotate(" +
      angle +
      "deg); -o-transform:rotate(" +
      angle +
      "deg); -ms-transform:rotate(" +
      angle +
      "deg); transform:rotate(" +
      angle +
      "deg);' />";

    document.body.innerHTML += htmlLine;
  };
  useEffect(() => {
    const d1 = document.getElementById("d1");
    const d2 = document.getElementById("d2");
    connect(d1, d2, "green", 5);
  }, []);

  return (
    <section className="layout">
      <div
        id="d1"
        style={{
          width: "20px",
          position: "absolute",
          top: " 1px",
          left: "2px",
        }}
        
      >
        foo
      </div>

      <div
        id="d2"
        style={{
          width: "20px",
          position: "absolute",
          top: " 500px",
          left: "200px",
        }}
      >
        bar
      </div>
    </section>
  );
};

export default Edge;
