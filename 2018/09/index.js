const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim();

class Node {
  constructor(value) {
    this.next = this.prev = this;
    this.value = value;
  }

  insertAfter(node) {
    this.prev = node;
    this.next = node.next;
    node.next = node.next.prev = this;
  }

  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
    this.prev = this.next = null;
  }
}

function play(pCount, maxMarble) {
  const players = new Array(pCount).fill(0);
  let currentNode = new Node(0);

  for (let m = 1; m <= maxMarble; m++) {
    if (m % 23 === 0) {
      currentNode = currentNode.prev.prev.prev.prev.prev.prev;
      players[m % pCount] += m + currentNode.prev.value;
      currentNode.prev.remove();
    } else {
      const node = new Node(m);
      node.insertAfter(currentNode.next);
      currentNode = node;
    }
  }

  return Math.max(...players);
}

// Part One
const [, pCount, maxMarble] = input
  .match(/(\d+) players; last marble is worth (\d+) points/)
  .map(Number);
console.log("Part One:", play(pCount, maxMarble));

// Part Two
console.log("Part Two:", play(pCount, maxMarble * 100));
