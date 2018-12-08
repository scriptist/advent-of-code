const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim();

class Node {
  constructor(parent, childCount, metaCount) {
    this.parent = parent;
    if (this.parent) this.parent.children.push(this);

    this.childCount = childCount;
    this.metaCount = metaCount;

    this.children = [];
    this.meta = [];
    this.value = null;
  }

  hasChildren() {
    return this.children.length === this.childCount;
  }

  hasMeta() {
    return this.meta.length === this.metaCount;
  }

  getValue() {
    // Memoize values
    if (this.value != null) {
      return this.value;
    } else if (this.children.length === 0) {
      return (this.value = this.meta.reduce((acc, m) => acc + m, 0));
    } else {
      return (this.value = this.meta.reduce((acc, m) => {
        const child = this.children[m - 1];
        return acc + (child ? child.getValue() : 0);
      }, 0));
    }
  }
}

// Part One
const numbers = input.split(" ").map(Number);
let currentNode = null;
let metaSum = 0;

for (let i = 0; i < numbers.length; i++) {
  while (currentNode && currentNode.hasChildren() && currentNode.hasMeta()) {
    currentNode = currentNode.parent;
  }

  if (!currentNode || !currentNode.hasChildren()) {
    // Create new node
    currentNode = new Node(currentNode, numbers[i], numbers[++i]);
  } else if (!currentNode.hasMeta()) {
    currentNode.meta.push(numbers[i]);
    metaSum += numbers[i];
  }
}

console.log("Part One:", metaSum);

// Part Two
console.log("Part Two:", currentNode.getValue());
