import React, {useReducer, useEffect} from 'react'
import "./Nodes.css"


import reducer from "../reducers/DijkstraRed";

const DNodes = ({name, visited}) => {

  useEffect(() => {
    if(visited){
      document.getElementById(name).style.color = "blue"
      document.getElementById(name).style.backgroundColor = "grey"
    } else{
      document.getElementById(name).style.color = "black"
      document.getElementById(name).style.backgroundColor = "lightblue";
    }
  }, [name, visited])
  
  return (
        <div className="node" data-testid={name} id={name}>
            {name}
            {visited &&"HI"}
        </div>
  )
}

export default DNodes