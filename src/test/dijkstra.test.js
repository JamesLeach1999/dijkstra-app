import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MainPage from "../pages/MainPage";
import reducer from "../reducers/DijkstraRed";
import DNodes from "../components/DNodes"
import NodeCreateSlide from "../components/NodeCreateSlide";
const initialState = {
  nodes: [],
  edges: [],
  journey: [],
};


const newState = {
  nodes: [
    { name: "A", visited: false },
    { name: "B", visited: false },
    { name: "C", visited: false },
    { name: "D", visited: false },
    { name: "E", visited: false },
    { name: "F", visited: false },
  ],
  edges: [
    { node1: "A", node2: "B", weight: 4 },
    { node1: "A", node2: "C", weight: 2 },
    { node1: "B", node2: "E", weight: 3 },
    { node1: "C", node2: "D", weight: 2 },
    { node1: "C", node2: "F", weight: 4 },
    { node1: "D", node2: "E", weight: 3 },
    { node1: "D", node2: "F", weight: 2 },
    { node1: "F", node2: "E", weight: 1 },
  ],
  journey:[],
};

describe("Testing dijkstras algo with dummy data", () => {
  test("Sanity check", () => {
    render(<MainPage />);
    expect(reducer(initialState, { type: "DUMMY_ACTION" })).toBeTruthy();
  });
  test("Journey algo", () => {
    render(<MainPage />);

    expect(
      reducer(initialState, {
        type: "TRAVEL",
        payload: { node1: "A", node2: "E" },
      })
    ).toEqual({ nodes: [], edges: [], journey: ["A", "C", "D", "F", "E"] });
  });

  test("Update nodes with state", () => {
    render(<MainPage><NodeCreateSlide/></MainPage>);
    const click = screen.getByTestId("create-slide")
    fireEvent.click(click)
    var nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    function makeNewNode(location) {
      fireEvent.change(nodeName, { target: { value: location } });
      fireEvent.click(submit);
    }
    makeNewNode("A");
    makeNewNode("B");
    makeNewNode("C");
    makeNewNode("D");
    makeNewNode("E");
    makeNewNode("F");
    
    expect(
      reducer(newState, { type: "TRAVEL", payload: { node1: "A", node2: "F" } })
    ).toEqual({
      nodes: [
        { name: "A", visited: true },
        { name: "B", visited: false },
        { name: "C", visited: true },
        { name: "D", visited: true },
        { name: "E", visited: false },
        { name: "F", visited: true },
      ],
      edges: [
        { node1: "A", node2: "B", weight: 4 },
        { node1: "A", node2: "C", weight: 2 },
        { node1: "B", node2: "E", weight: 3 },
        { node1: "C", node2: "D", weight: 2 },
        { node1: "C", node2: "F", weight: 4 },
        { node1: "D", node2: "E", weight: 3 },
        { node1: "D", node2: "F", weight: 2 },
        { node1: "F", node2: "E", weight: 1 },
      ],
      journey: ["A", "C", "D", "F"],
    });
  })
});
