import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import MainPage from "../pages/MainPage";
let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const setup = () => {
  render(<MainPage />);
  const nodeName = screen.getByTestId("nodeName");
  const submit = screen.getByTestId("makeNode");
  const createdNode = screen.getByTestId("0");
  return {
    nodeName,
    submit,
    createdNode,
  };
};

describe("TESTING CREATiNG A NODE", () => {
  var nodeName;
  //   beforeEach(() => {
  // render(<MainPage />);
  // });

  test("Should input a node name", () => {
    render(<MainPage />);

    nodeName = screen.getByTestId("node-name");

    fireEvent.change(nodeName, { target: { value: "ldn" } });

    expect(nodeName.value).toEqual("ldn");
  });

  test("Input, create and check text content erased", () => {
    render(<MainPage />);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    fireEvent.change(nodeName, { target: { value: "ldn" } });
    fireEvent.click(submit);

    expect(nodeName.value).toEqual("");
  });

  test("Render node on page", () => {
    render(<MainPage />);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    fireEvent.change(nodeName, { target: { value: "ldn" } });
    fireEvent.click(submit);
    var createdNode = screen.getByTestId("ldn");
    expect(createdNode.innerHTML).toEqual("ldn");
  });

  test("Render another 2 nodes", () => {
    render(<MainPage />);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    function makeNewNode(location) {
      fireEvent.change(nodeName, { target: { value: location } });
      fireEvent.click(submit);
    }
    makeNewNode("ldn");
    makeNewNode("prs");
    makeNewNode("la");

    var newNode1 = screen.getByTestId("ldn");
    var newNode2 = screen.getByTestId("prs");
    var newNode3 = screen.getByTestId("la");
    expect(newNode1.innerHTML).toEqual("ldn");
    expect(newNode2.innerHTML).toEqual("prs");
    expect(newNode3.innerHTML).toEqual("la");
  });
});
