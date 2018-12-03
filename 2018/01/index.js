const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(i => parseInt(i, 10));

// Part One
const partOne = lines.reduce((acc, line) => acc + line, 0);
console.log("Part One: ", partOne);

// Part Two
let partTwo = 0;
const visited = new Set();

for (let i = 0; true; i = (i + 1) % lines.length) {
  const v = (partTwo += lines[i]);
  if (visited.has(v)) {
    break;
  }
  visited.add(v);
}

console.log("Part Two: ", partTwo);
