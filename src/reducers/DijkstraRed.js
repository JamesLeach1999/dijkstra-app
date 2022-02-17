class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class Priority {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);

    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) {
        break;
      } else {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
  }

  dequeue() {
    const min = this.values[0];
    var end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;

      let rightChild;
      let leftChild;

      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx].priority;
        if (leftChild < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx].priority;
        // this checks if the right child is what we want to swap with
        if (
          (swap == null && rightChild < element.priority) ||
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap == null) {
        break;
      }
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    console.log(this.adjacencyList);
    return this.adjacencyList;
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return undefined;
    }
    console.log(this.adjacencyList);
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });

    return this.adjacencyList;
  }
  
  updateEdge(v1, v2, weight){
    if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) {
      return undefined;
    }
    // // this.adjacencyList[v1]
    for (let i = 0; i < this.adjacencyList[v1].length; i++) {
      
      if(v2 === this.adjacencyList[v1][i].node){
        this.adjacencyList[v1][i].weight = weight
      }
    }
    for (let i = 0; i < this.adjacencyList[v2].length; i++) {
      
      if(v2 === this.adjacencyList[v2][i].node){
        this.adjacencyList[v2][i].weight = weight
      }
    }
    // this.adjacencyList[v2].push({ node: v1, weight });
  
    return this.adjacencyList;
    
  }

  dijkstras(start, finish) {
    console.log(this.adjacencyList);
    const nodes = new Priority();
    const distances = {};
    const previous = {};
    let path = []; // for returning at end
    let smallest;
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbour in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbour];

          let candidate = distances[smallest] + nextNode.weight;

          let nextNeighbour = nextNode.node;

          if (candidate < distances[nextNeighbour]) {
            distances[nextNeighbour] = candidate;

            previous[nextNeighbour] = smallest;

            nodes.enqueue(nextNeighbour, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

var graph = new WeightedGraph();
// nodes for testing purposes
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");

// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("C", "F", 4);
// graph.addEdge("D", "E", 3);
// graph.addEdge("D", "F", 1);
// graph.addEdge("F", "E", 1);


// needed since the graph adjacency list wont update when called inside reducer
function adding(val){
  graph.addVertex(val)
}

function updateEdge(v1, v2, weight){
  graph.updateEdge(v1, v2, weight)
}

function addingEdge(val1, val2, weight){
  graph.addEdge(val1, val2, weight)
}

function travel(v1, v2){
  console.log(graph.dijkstras(v1, v2));
  return graph.dijkstras(v1, v2)
}

const reducer = (state, action) => {
  if (action.type === "DUMMY_ACTION") {
    console.log("numberwnag");
    return { ...state };
  }
  if (action.type === "ADD_NODE") {
    console.log("numberwnag");
    const newNode = [...state.nodes, action.payload];
    adding(action.payload.name);
    return { ...state, nodes: newNode };
  }

  if (action.type === "ADD_EDGE") {
    console.log("numberwnag");
    const newEdge = [...state.edges, action.payload];
    addingEdge(
      action.payload.node1,
      action.payload.node2,
      action.payload.weight
    );

    return {
      ...state,
      edges: newEdge,
    };
  }

  if(action.type === "UPDATE_EDGE"){
    console.log("Update");
    updateEdge(
      action.payload.node1,
      action.payload.node2,
      action.payload.weight
    );
    return {...state}
  }

  if (action.type === "TRAVEL") {
    state.journey = [];
    const from = action.payload.node1;
    const to = action.payload.node2;
    const path = travel(from, to)
    var visited = state.nodes.map((node) => {
      if (path.indexOf(node.name) !== -1) {
        delete node.visited;
        node.visited = true;
      } else {
        delete node.visited;
        node.visited = false;
      }
      return node;
    });
    console.log(path);
    return {
      ...state,
      nodes: visited,
      journey: path,
    };
  }
};

export default reducer;
