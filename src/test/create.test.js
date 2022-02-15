import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import MainPage from "../pages/MainPage";
import NodeCreateSlide from "../components/NodeCreateSlide"
let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


describe("TESTING CREATiNG A NODE", () => {
  var nodeName;

  test("Should input a node name", () => {
    render(
      <MainPage>
        <NodeCreateSlide />
      </MainPage>
    );
    const click = screen.getByTestId("create-slide");
    fireEvent.click(click);
    nodeName = screen.getByTestId("node-name");

    fireEvent.change(nodeName, { target: { value: "ldn" } });

    expect(nodeName.value).toEqual("ldn");
  });

  test("Input, create and check text content erased", () => {
    render(
      <MainPage>
        <NodeCreateSlide />
      </MainPage>
    );
    const click = screen.getByTestId("create-slide");
    fireEvent.click(click);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    fireEvent.change(nodeName, { target: { value: "ldn" } });
    fireEvent.click(submit);

    expect(nodeName.innerHTML).toEqual("");
  });

  test("Render node on page", () => {
    render(
      <MainPage>
        <NodeCreateSlide />
      </MainPage>
    );
    const click = screen.getByTestId("create-slide");
    fireEvent.click(click);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    fireEvent.change(nodeName, { target: { value: "A" } });
    fireEvent.click(submit);
    var createdNode = screen.getByTestId("A");
    expect(createdNode.innerHTML).toEqual(
      '<div class="DialogTitle">A</div><div class="Contents"></div><button>Set edge to 55</button>'
    );
  });

  test("Render another 2 nodes", () => {
    render(
      <MainPage>
        <NodeCreateSlide />
      </MainPage>
    );
    const click = screen.getByTestId("create-slide");
    fireEvent.click(click);

    nodeName = screen.getByTestId("node-name");
    const submit = screen.getByTestId("make-node");
    function makeNewNode(location) {
      fireEvent.change(nodeName, { target: { value: location } });
      fireEvent.click(submit);
    }
    makeNewNode("A");
    makeNewNode("B");

    var newNode1 = screen.getByTestId("A");
    var newNode2 = screen.getByTestId("B");
    expect(newNode1.innerHTML).toEqual(
      '<div class="DialogTitle">A</div><div class="Contents"></div><button>Set edge to 55</button>'
    );
    expect(newNode2.innerHTML).toEqual(
      '<div class="DialogTitle">B</div><div class="Contents"></div><button>Set edge to 55</button>'
    );
  });
});
