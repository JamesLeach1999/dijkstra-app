import React, {useState, createContext, useEffect} from "react"
import MainApp from "../main/MainApp";
const ConnectionContext = createContext();

function ConnectionContextProvider(props){
    const [showDialog, setShowDialog] = useState(false);
    var [nodes, setNodes] = useState([]);
    const [nodeName, setNodeName] = useState("");
    const [id, setId] = useState(0);
    const showD = () => {
      setShowDialog(!showDialog);
    };

    const newNode = (name) => {
      setNodes([...nodes, { name: name, show: true, id: id }]);
      setId(id + 1);
      setNodeName("");
    };
    const removeNode = (pid) => {
      setNodes((node) => {
        node.show = false;
        return node.filter((n) => n.id !== pid);
      });
    };


    return (
        <ConnectionContext.Provider value={{nodes, id, newNode, removeNode, setNodeName, nodeName}}>
            <MainApp/>
        </ConnectionContext.Provider>
    )
}

export default ConnectionContext
export {ConnectionContextProvider}