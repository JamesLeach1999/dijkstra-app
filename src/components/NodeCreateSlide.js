import React, {useState, useRef, useContext} from 'react'
import NodeContext from '../context/NodeContext'
const NodeCreateSlide = (props) => {
  const {setNodeName, newNode} = useContext(NodeContext)
    const refContainer = useRef(null)
    const [clicked, setClicked] = useState(null)
    var handleClick = () => {
    if (!clicked) {
      // attach/remove event handler
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }
  };

  var handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    if (refContainer.current === null||!refContainer.current.contains(e.target) ) {
      // console.log(this.node1);
      return;
    }

    handleClick();
  };
  return (
    <div ref={refContainer}>
        <h1 data-testid="create-slide" style={{ color: "black", width: "75px", height: "75px" }} onClick={() => {
            handleClick();
            setClicked((prevState) => {
              return !prevState;
            });
          }}>click</h1>
          {clicked && <div style={{"text-align":"left"}}>

        Create node
        <br/>
          <input
            data-testid="node-name"
            type="text"
            name="nodeName"
            id="node-name"
            onChange={(e) => setNodeName(e.target.value)}
      />
      <div data-testid="make-node" onClick={() => newNode()}>
        Make node
      </div></div> }
      
    </div>
  );
}

export default NodeCreateSlide