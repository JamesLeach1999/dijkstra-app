import React, { useReducer, useState, useEffect } from "react";
import "./Nodes.css";

import reducer from "../reducers/DijkstraRed";

const DNodes = ({ name, visited, edges }) => {
    const [state, dispatch] = useReducer(reducer, {});

  var [diffX, setDiffX] = useState(0);
  var [diffY, setDiffY] = useState(0);
  var [dragging, setDragging] = useState(false);
  var [styles, setStyles] = useState({});
  var [edge, setEdge] = useState([])
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
    var nodeElement= document.getElementById(`${name}`).getBoundingClientRect()
    // center
    var cNode1 = nodeElement.left+nodeElement.width/2;
    var cNode2 = nodeElement.top+nodeElement.height/2;
    edge.map((e) => {
      if(e.node1 === name){
        e.pos1 = {x:cNode1, y:cNode2}
      } else if(e.node2 === name) {
        e.pos2 = {x:cNode1, y:cNode2}
      }
      if(e.pos1 && e.pos2){

        console.log(e);
        const dist = Math.sqrt(
          (e.pos1.x - e.pos2.x) ** 2 + (e.pos1.y - e.pos2.y) ** 2
          );
          e.weight = dist
          dispatch({type:"UPDATE_EDGE", payload:{node1:e.node1, node2: e.node2, weight:dist}})
      }

    })
  }

  function alterEdge(){
    edge.weight = 55
  }
  useEffect(() => {

    edges.map((e) => {
      if(e.node1 === name || e.node2 === name){
        setEdge([...edge, e])
      }
    })
  },[edges])


  return (
    <div
      className={"node" }
      style={styles}
      onMouseDown={dragStart}
      onMouseMove={draggingT}
      onMouseUp={dragEnd}
      id={name}
      data-testid={name}
    >
      <div className="DialogTitle">{name}</div>
      <div className="Contents" data-testid={`edge-button-${name}`} >Edge button</div>
      {visited && "Visited"}
      {/* <button onClick={() => alterEdge()}>Set edge to 55</button> */}
      
    </div>
    
  );
};

export default DNodes;
