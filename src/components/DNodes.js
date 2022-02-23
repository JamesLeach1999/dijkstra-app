import React, { useReducer, useState, useEffect, useContext } from "react";
import "./Nodes.css";
import NodeContext from "../context/NodeContext";
import reducer from "../reducers/DijkstraRed";
import LineTo from "react-lineto";

const DNodes = ({ name, visited, edges }) => {
  const [edgeState, dispatch] = useReducer(reducer, {});
  const {
    setEdgeOne,
    setEdgeTwo,
    edgeOne,
    edgeTwo,
    setWeight,
    newEdge,
    setTempEdge,
    connectEdge,
    edgeStyles,
    state
  } = useContext(NodeContext);

  var [diffX, setDiffX] = useState(0);
  var [diffY, setDiffY] = useState(0);
  var [dragging, setDragging] = useState(false);
  var [styles, setStyles] = useState({});
  const [lineStyle, setLineStyle] = useState({ display: "none" });
  // var [edgeStyles, setEdgeStyles] = useState({})
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
      setLineStyle({ display: "none" });
    }
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

  const dragEnd = () => {
    setDragging(false);
    setLineStyle({ display: "initial" });
    var nodeElement = document.getElementById(`${name}`);

    const off1 = getOffset(nodeElement);

    const cNode1 = off1.left + off1.width;
    const cNode2 = off1.top + off1.height;

    // center

    edge.map((e) => {
      if (e.node1 === name) {
        e.pos1 = { x: cNode1, y: cNode2 };
      } else if (e.node2 === name) {
        e.pos2 = { x: cNode1, y: cNode2 };
      }
      if (e.pos1 && e.pos2) {
        const dist = Math.sqrt(
          (e.pos1.x - e.pos2.x) ** 2 + (e.pos1.y - e.pos2.y) ** 2
        );
        e.weight = dist;

        dispatch({
          type: "UPDATE_EDGE",
          payload: { node1: e.node1, node2: e.node2, weight: dist },
        });
      }
    });
  };

  const t = (e) => {
    e.preventDefault();
    setTempEdge(e.target);
  };

  useEffect(() => {
    edges.map((e) => {
      if (e.node1 === name || e.node2 === name) {
        setEdge([e]);
      }
    });
    console.log(state);
  }, [state]);

  return (
    <div
      className={`node ${name}`}
      style={styles}
      onMouseDown={dragStart}
      onMouseMove={draggingT}
      onMouseUp={dragEnd}
      id={name}
      data-testid={name}
      onClick={t}
    >
      <div className="DialogTitle">{name}</div>
      <div
        className="Contents"
        data-testid={`edge-button-${name}`}
        onClick={() => {
          if(!edgeOne){
            setEdgeOne(name)
          } else if((edgeOne !== name) && !edgeTwo){
            setEdgeTwo(name)
          } 
          if(edgeOne && edgeTwo){
            newEdge()
            
          }
        }}
        style={edgeStyles}
      >
        Edge button
      </div>
      {visited && "Visited"}
      {/* <button onClick={() => alterEdge()}>Set edge to 55</button> */}
      {edges.map((e) => {
        if (!dragging) {
          if (e.node1 === name) {
            return (
              <div style={lineStyle}>
                <LineTo
                  id="line"
                  from={`node ${name}`}
                  to={`node ${e.node2}`}
                  border={10}
                  zIndex={-1}
                />
              </div>
            );
          } else {
            return (
              <div style={lineStyle}>
                <LineTo
                  id="line"
                  from={`node ${name}`}
                  to={`node ${e.node1}`}
                  border={10}
                  zIndex={-1}
                />
              </div>
            );
          }
        } else {
          if (e.node1 === name) {
            return (
              <div style={lineStyle}>
                <LineTo
                  id="line"
                  from={`node ${name}`}
                  to={`node ${e.node2}`}
                  border={10}
                  borderColor="blue"
                  zIndex={-1}
                />
              </div>
            );
          } else {
            return (
              <div style={lineStyle}>
                <LineTo
                  id="line"
                  from={`node ${name}`}
                  to={`node ${e.node1}`}
                  border={10}
                  borderColor="blue"
                  zIndex={-1}
                />
              </div>
            );
          }
        }

      })}
    </div>
  );
};

export default DNodes;
