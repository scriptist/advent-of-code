const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const tDelta = "A".charCodeAt(0) - 61;

const nodes = {};
const nodeKeys = [];
class Node {
  constructor(value) {
    this.active = false;
    this.complete = false;
    this.dependencies = [];
    this.time = value.charCodeAt(0) - tDelta;
    this.value = value;
  }

  isReady() {
    return (
      !this.active && !this.complete && this.dependencies.every(d => d.complete)
    );
  }
}

function getNextReadyNode() {
  for (var i = 0; i < nodeKeys.length; i++) {
    const node = nodes[nodeKeys[i]];
    if (node.isReady()) {
      return node;
    }
  }

  return null;
}

// Part One
// Build node list
input.forEach(line => {
  const [_, dep, step] = line.match(
    /Step (.) must be finished before step (.) can begin./
  );
  if (!nodes[dep]) {
    nodes[dep] = new Node(dep);
    nodeKeys.push(dep);
  }
  if (!nodes[step]) {
    nodes[step] = new Node(step);
    nodeKeys.push(step);
  }
  nodes[step].dependencies.push(nodes[dep]);
});
nodeKeys.sort();

// Solve
const completedSteps = [];
while (completedSteps.length < nodeKeys.length) {
  const node = getNextReadyNode();
  node.complete = true;
  completedSteps.push(node.value);
}
console.log("Part One:", completedSteps.join(""));

// Part Two
class Worker {
  constructor() {
    this.currentNode = null;
    this.finishTime = null;
  }

  isIdle() {
    return this.currentNode === null;
  }

  start(t, node) {
    node.active = true;
    this.currentNode = node;
    this.finishTime = t + node.time;
  }

  work(t) {
    if (t === this.finishTime) {
      this.currentNode.active = false;
      this.currentNode.complete = true;
      this.currentNode = null;
      this.finishTime = null;
    }
  }
}

Object.values(nodes).forEach(n => (n.complete = false));
const workers = [
  new Worker(),
  new Worker(),
  new Worker(),
  new Worker(),
  new Worker()
];

const completeStepsAt = {};
let t = 0;
for (; Object.values(nodes).some(n => !n.complete); t++) {
  workers.forEach(w => w.work(t));
  workers.forEach(w => {
    if (w.isIdle()) {
      const n = getNextReadyNode();
      if (n) {
        w.start(t, n);
      }
    }
  });
}

console.log("Part Two:", t - 1);
