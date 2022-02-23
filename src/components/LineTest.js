import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./Nodes.css";
const LineTest = () => {
    const [number, setNumber] = useState(2)
    const [nodes, setNodes] = useState([])
        // id = "draggable-1";
        // onDragStart = { onDragStart };
        // className = "example-draggable";
        // draggable = "true";
    
  function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);

    event.currentTarget.style.backgroundColor = "yellow";
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event) {
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    console.log(draggableElement, dropzone, id);
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
  }
  function onNewElement() {
    const origin = document.querySelector(".example-origin");
    const newNode = document.createElement("div");
    newNode.id = `draggable-${number}`;
    setNumber(number+1)
    newNode.onDragStart = onDragStart;
    newNode.className = "example-draggable";
    newNode.draggable = true;
    newNode.innerHTML = "hello"
    newNode.style.backgroundColor = "yellow";

    setNodes([...nodes, newNode])
  }

  return (
    <div className="example-parent">
      <div className="example-origin">
        <div
          id="draggable-1"
          onDragStart={onDragStart}
          className="example-draggable"
          draggable="true"
        >
          draggable
        </div>
        {nodes.map((node) => {
            return (
              <div
                id={node.id}
                onDragStart={onDragStart}
                className="example-draggable"
                draggable="true"
              >
                {node.innerHTML}
              </div>
            );
        })}
        {/* <div
          id="draggable-2"
          onDragStart={onDragStart}
          className="example-draggable"
          draggable="true"
        >
          thing 2
        </div>
        <div
          id="draggable-3"
          onDragStart={onDragStart}
          className="example-draggable"
          draggable="true"
        >
          thing 3
        </div>
        <div
          id="draggable-4"
          onDragStart={onDragStart}
          className="example-draggable"
          draggable="true"
        >
          thing 4
        </div> */}
      </div>
        <button onClick={onNewElement}>Click for new element</button>
      <div className="example-dropzone" onDragOver={onDragOver} onDrop={onDrop}>
        dropzone
      </div>
    </div>
  );
};

export default LineTest;
