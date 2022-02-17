import React, {useState, Component, useContext } from "react";
import "./MainApp.css";
import Dialog from "../components/Dialog";
import Nodes from "../components/Nodes";
import ConnectionContext from "../context/NodeContext";
function MainApp(props){

    // var {nodes, setNodes} = useContext(ConnectionContext)
    const [showDialog, setShowDialog] = useState(false);
    var [nodes, setNodes] = useState([])
    const [nodeName, setNodeName] = useState("")
    const [id, setId] = useState(0)
    const showD = () => {
        setShowDialog(!showDialog)
    }

    const newNode = (name) => {
      setNodes([...nodes, {name:name, show: true, id: id}])
      setId(id+1);
      setNodeName("")
    }
    const removeNode = (pid) => {
      setNodes((node) => {
        node.show = false;
        return node.filter((n) => n.id !== pid);
      })
    }

    return(
        <div className="MainApp">
            {/* <div className="Title">Example dialog</div>
            <div className="button" onClick={()=>showD()}>Show dialog</div>
            <Dialog onClose={showD} show={showDialog}/> */}
            <input type="text" name="nodeName" onChange={(e) => setNodeName(e.target.value)} />
            <div onClick={() => newNode(nodeName)}>
              Make node
            </div>
            {nodes.map((node) => {
              return <Nodes key={node.id} {...node} removeNode={removeNode}/>
            })}
        </div>
    )
}


export default MainApp