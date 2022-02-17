import React, {useContext} from 'react'
import NodeContext from '../context/NodeContext';
const Edges = () => {

    const {setEdgeOne, setEdgeTwo, setWeight, newEdge} = useContext(NodeContext)
  return (
    <div>
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
    </div>
  );
}

export default Edges