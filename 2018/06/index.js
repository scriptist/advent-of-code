const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// Part One
function manhattanDistance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const coords = input.map(l => l.split(", ").map(c => parseInt(c, 10)));
const largestX = Math.max(...coords.map(c => c[0]));
const largestY = Math.max(...coords.map(c => c[1]));

// Build the grid with each point's closest location
const areas = new Set();
const grid = [];
for (let x = 0; x <= largestX; x++) {
  grid[x] = [];
  for (let y = 0; y <= largestY; y++) {
    const closest = coords.reduce((acc, coord, i) => {
      const d = manhattanDistance([x, y], coord);
      const l = i;
      if (!acc) {
        return { l, d };
      } else if (d === acc.d) {
        return { l: null, d };
      } else if (d < acc.d) {
        return { l, d };
      }
      return acc;
    }, null);

    grid[x][y] = closest.l;
    if (closest.l !== null) {
      areas.add(closest.l);
    }
  }
}

const nonInfiniteAreas = new Set(areas);

// Remove all areas touching the edges
for (let x = 0; x <= largestX; x++) {
  nonInfiniteAreas.delete(grid[x][0]);
  nonInfiniteAreas.delete(grid[x][largestY]);
}
for (let y = 0; y <= largestY; y++) {
  nonInfiniteAreas.delete(grid[0][y]);
  nonInfiniteAreas.delete(grid[largestX][y]);
}

// Flatten the grid, and location that appears most
const flat = [];
grid.forEach(row => flat.push(...row));
const frequencies = Array.from(nonInfiniteAreas).map(letter => {
  const f = flat.filter(l => l === letter).length;
  return [letter, f];
});
const partOne = Math.max(...frequencies.map(f => f[1]));
console.log("Part One", partOne);

// Part Two
const MAX_D = 10000;

// Build an array of total manhattan distances
const distances = [];
for (let x = 0; x <= largestX; x++) {
  for (let y = 0; y <= largestY; y++) {
    distances.push(
      coords.reduce((acc, coord) => acc + manhattanDistance([x, y], coord), 0)
    );
  }
}

// Count how many are under 1000
const partTwo = distances.filter(d => d < MAX_D).length;
console.log("Part Two:", partTwo);
