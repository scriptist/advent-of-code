const fs = require("fs");

const input = Number(
  fs
    .readFileSync("./input.txt")
    .toString()
    .trim()
);

const GRID_SIZE = 300;
const RANGE_SIZE = 3;

function getPowerLevelAt(x, y, serialNumber) {
  const rackId = x + 10;
  return (Math.floor(((rackId * y + serialNumber) * rackId) / 100) % 10) - 5;
}

function buildGrid(serialNumber, gridSize) {
  const grid = [];
  for (let x = 1; x <= gridSize; x++) {
    grid[x] = [];
    for (let y = 1; y <= gridSize; y++) {
      grid[x][y] = getPowerLevelAt(x, y, serialNumber);
    }
  }
  return grid;
}

function getRangeValue(grid, fromX, fromY, size) {
  let v = 0;
  for (let x = fromX; x < fromX + size; x++) {
    for (let y = fromY; y < fromY + size; y++) {
      v += grid[x][y];
    }
  }
  return v;
}

function findLargestRange(grid, minSize, maxSize) {
  let largest = {
    x: null,
    y: null,
    size: null,
    v: -Infinity
  };
  for (let size = minSize; size <= maxSize; size++) {
    for (let x = 1; x <= GRID_SIZE - size; x++) {
      for (let y = 1; y <= GRID_SIZE - size; y++) {
        const v = getRangeValue(grid, x, y, size, size);
        if (v > largest.v) {
          largest = { x, y, size, v };
        }
      }
    }
  }
  return largest;
}

// Part One
const grid = buildGrid(input, GRID_SIZE);
const partOne = findLargestRange(grid, 3, 3);
console.log("Part One:", `${partOne.x},${partOne.y}`);

// Part Two
const partTwo = findLargestRange(grid, 1, GRID_SIZE);
console.log("Part One:", `${partTwo.x},${partTwo.y},${partTwo.size}`);
