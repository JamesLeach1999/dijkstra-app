import React from "react";
import { render } from "@testing-library/react";
import MainPage from "../pages/MainPage";
import reducer from "../reducers/DijkstraRed";

const initialState = {
  nodes: [],
  edges: [],
  journey: [],
};

describe("Testing reducers", () => {
  test("Sanity check", () => {
    render(<MainPage />);
    expect(reducer(initialState, { type: "DUMMY_ACTION" })).toEqual(
      initialState
    );
  });

  test("See if we can add node", () => {
    render(<MainPage />);
    const node = { name: "ldn", visited: false };

    expect(reducer(initialState, { type: "ADD_NODE", payload: node })).toEqual({
      edges: [],
      journey: [],
      nodes: [{ name: "ldn", visited: false }],
    });
  });

  test("Add 2 more", () => {
    render(<MainPage />);
    var newState = initialState;
    const node = { name: "ldn", visited: false };
    const newNode = { name: "prs", visited: false };
    expect(
      reducer(initialState, { type: "ADD_NODE", payload: newNode })
    ).toEqual({
      edges: [],
      journey: [],
      nodes: [{ name: "prs", visited: false }],
    });
    newState.nodes.push(newNode);
    expect(reducer(initialState, { type: "ADD_NODE", payload: node })).toEqual({
      edges: [],
      journey: [],
      nodes: [
        { name: "prs", visited: false },
        { name: "ldn", visited: false },
      ],
    });
  });
  test("Add Edge", () => {
    render(<MainPage />);
    const newNode = { node1: "ldn", node2: "prs", weight: 2 };
    expect(
      reducer(initialState, { type: "ADD_EDGE", payload: newNode })
    ).toEqual({
      nodes: [{ name: "prs", visited: false }],
      edges: [{ node1: "ldn", node2: "prs", weight: 2 }],
      journey: [],
    });
  });
});
