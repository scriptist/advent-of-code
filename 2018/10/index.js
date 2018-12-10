const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class Point {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  getPosition(t) {
    return [this.x + this.vx * t, this.y + this.vy * t];
  }
}

function render(positions) {
  const posStrs = positions.map(p => p.join(","));
  const { minX, maxX, minY, maxY } = getBounds(positions);

  let s = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      s += posStrs.includes(`${x},${y}`) ? "#" : ".";
    }
    s += "\n";
  }

  return s;
}

function getBounds(positions) {
  const xPositions = positions.map(p => p[0]);
  const yPositions = positions.map(p => p[1]);
  const minX = Math.min(...xPositions);
  const maxX = Math.max(...xPositions);
  const minY = Math.min(...yPositions);
  const maxY = Math.max(...yPositions);
  return { minX, maxX, minY, maxY };
}

const points = lines.map(line => {
  const [, x, y, vx, vy] = line
    .match(/position=<([\d- ]+), ([\d- ]+)> velocity=<([\d- ]+), ([\d- ]+)>/)
    .map(Number);
  return new Point(x, y, vx, vy);
});

lastSize = Infinity;
let t = 0;
while (true) {
  const positions = points.map(p => p.getPosition(t));
  const { minX, maxX, minY, maxY } = getBounds(positions);
  const size = (maxX - minX) * (maxY - minY);
  if (size < lastSize) {
    lastSize = size;
    t++;
  } else {
    t--;
    break;
  }
}

console.log("Part One:");
console.log(render(points.map(p => p.getPosition(t))));
console.log("Part Two:", t);
