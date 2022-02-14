import React, { useState, useReducer, useEffect } from "react";
import DNodes from "../components/DNodes";
import "../components/Nodes.css";
import reducer from "../reducers/DijkstraRed";
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

  // useEffect(() => {
  //   let frequencyCounter1 = {};
  //   let frequencyCounter2 = {};

  //   for (let index = 0; index < state.nodes.length; index++) {
  //     // increasse key value of the result by one
  //     frequencyCounter1[state.nodes[index]] =
  //       (frequencyCounter1[state.nodes[index]] || 0) + 1;
  //   }
  //   for (let index = 0; index < state.journey.length; index++) {
  //     frequencyCounter2[state.journey[index]] =
  //       (frequencyCounter2[state.journey[index]] || 0) + 1;
  //   }

  //   for (let node in frequencyCounter1) {
  //     if (!(node.name in frequencyCounter2)) {
  //       node.visited = false;
  //     } else {
  //       node.visited=true;
  //     }
  //   }

  //   console.log(state.nodes);

  // }, [state])

  return (
    <div>
      {/* <button onClick={addNode}>Add node</button>
       */}
      <div>
        {state.journey &&
          state.journey.map((node, i) => {
            return <h1 key={i}>{node}</h1>;
          })}
      </div>
      <input
        data-testid="node-name"
        type="text"
        name="nodeName"
        id="node-name"
        onChange={(e) => setNodeName(e.target.value)}
      />
      <div data-testid="make-node" onClick={() => newNode()}>
        Make node
      </div>
      <input
        type="text"
        name="edgeOne"
        id="edgeOne"
        onChange={(e) => setEdgeOne(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="edgeTwo"
        id="edgeTwo"
        onChange={(e) => setEdgeTwo(e.target.value)}
      />
      <p>Select weight</p>
      <input
        type="number"
        id="weight"
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={() => newEdge()}>Submit edge</button>
      <br />
      <input
        type="text"
        id="node1"
        onChange={(e) => setNode1(e.target.value)}
      />
      <br />
      <input
        type="text"
        id="node2"
        onChange={(e) => setNode2(e.target.value)}
      />
      <button onClick={() => dijkstra()}>Start journey</button>
      <section className="layout">
        {state.nodes.map((node, i) => {
          return (
            <DNodes
              key={i}
              name={node.name}
              visited={node.visited}
            />
          );
        })}
      </section>
    </div>
  );
};

export default MainPage;
