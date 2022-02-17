import React, { useState, useReducer, useEffect, useContext } from "react";
import DNodes from "../components/DNodes";
import NodeCreateSlide from "../components/NodeCreateSlide"
import "../components/Nodes.css";
import reducer from "../reducers/DijkstraRed";
import NodeContext from "../context/NodeContext";
import Edges from "../components/Edges";
import JourneyComp from "../components/JourneyComp";
const defaultState = {
  nodes: [],
  edges: [],
  journey: [],
};

const MainPage = () => {
  const [id, setId] = useState(0);
  const [nodeName, setNodeName] = useState("");
  const [edgeOne, setEdgeOne] = useState("");
  const [edgeTwo, setEdgeTwo] = useState("");
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [weight, setWeight] = useState(0);
  const [visited, setVisited] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);

  const newNode = () => {
    const node = { name: nodeName, visited: false };
    dispatch({ type: "ADD_NODE", payload: node });
    setId(id + 1);
    setNodeName("");
    document.getElementById("node-name").value = "";
  };

  const newEdge = () => {
    const edge = { node1: edgeOne, node2: edgeTwo, weight: weight };
    dispatch({ type: "ADD_EDGE", payload: edge });
    document.getElementById("edgeOne").value = "";
    document.getElementById("edgeTwo").value = "";
    document.getElementById("weight").value = "";
  };

  const dijkstra = () => {
    dispatch({ type: "TRAVEL", payload: { node1, node2 } });
    document.getElementById("node1").value = "";
    document.getElementById("node2").value = "";
  };

  return (
    <NodeContext.Provider value={{newNode, setNodeName, setEdgeOne, setEdgeTwo, setWeight, newEdge, setNode1, setNode2, dijkstra}}>
      {/* <button onClick={addNode}>Add node</button>
       */}
      
      <NodeCreateSlide/>
      
      <Edges/>
      <br />
      <JourneyComp/>
      <section className="layout">
        {state.nodes.map((node, i) => {
          var edgeNode = []
          state.edges.map((edge) => {
            if(edge.node1===node.name){
              edgeNode.push(edge)
            } else if(edge.node2 === node.name){
              edgeNode.push(edge)
            }
          })
          return (
            <DNodes
              key={i}
              name={node.name}
              visited={node.visited}
              edges={edgeNode}
            />
          );
        })}
      </section>
    </NodeContext.Provider>
  );
};

export default MainPage;
