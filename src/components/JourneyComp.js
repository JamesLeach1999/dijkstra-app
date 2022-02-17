import React, {useContext} from 'react'
import NodeContext from '../context/NodeContext'
const JourneyComp = () => {
    const {setNode1, setNode2, dijkstra} = useContext(NodeContext)
  return (
    <div><input
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
      <button onClick={() => dijkstra()}>Start journey</button></div>
  )
}

export default JourneyComp