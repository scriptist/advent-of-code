const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// Part One
const claims = new Set();
const fabric = [];
lines.forEach(line => {
  const claim = line.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  const [num, x, y, width, height] = claim
    .slice(1, 6)
    .map(i => parseInt(i, 10));
  claims.add(num);

  for (let i = x; i < x + width; i++) {
    fabric[i] = fabric[i] || [];

    for (let j = y; j < y + height; j++) {
      fabric[i][j] = fabric[i][j] || [];
      fabric[i][j].push(num);
    }
  }
});

const flattened = fabric.reduce((acc, v) => acc.concat(v), []);

const partOne = flattened.filter(cell => cell.length > 1).length;
console.log("Part One:", partOne);

// Part Two
const nonOverlappingClaims = new Set(claims);
flattened.forEach(cell => {
  if (cell.length > 1) {
    cell.forEach(claim => nonOverlappingClaims.delete(claim));
  }
});

const partTwo = nonOverlappingClaims.values().next().value;
console.log("Part Two:", partTwo);
