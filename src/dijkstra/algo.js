
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

    return this.adjacencyList;
  }

  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return undefined;
    }
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });

    return this.adjacencyList;
  }

  dijkstras(start, finish) {
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

          console.log(previous[smallest]);
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        var iter = 0;
        for (let neighbour in this.adjacencyList[smallest]) {

          let nextNode = this.adjacencyList[smallest][neighbour];

          let candidate = distances[smallest] + nextNode.weight;

          let nextNeighbour = nextNode.node;

          iter++;
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

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("F", "E", 1);

console.log(graph.dijkstras("A", "F"));

// graph.addVertex("ldn")
// graph.addVertex("prs")
// graph.addVertex("la")
// graph.addEdge("prs", "la", 5)
// console.log(graph.dijkstras("ldn", "prs"));