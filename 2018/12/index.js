const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .split("\n")
  .map(l => l.trim());

function getInitialState(pad) {
  const dots = ".".repeat(pad);
  return `${dots}${lines[0].substr(15)}${dots}`;
}

function getNextGeneration(state) {
  let s = "";
  const paddedState = `..${state}..`;
  for (let i = 0; i < state.length; i++) {
    const surrounds = paddedState.substr(i, 5);
    s += transforms[surrounds] || ".";
  }
  return s;
}

function getValue(state, pad) {
  return state.split("").reduce((acc, c, i) => {
    return acc + (c === "#" ? i - pad : 0);
  }, 0);
}

const transforms = lines.slice(2).reduce((acc, t) => {
  const [from, to] = t.split(" => ");
  acc[from] = to;
  return acc;
}, {});

// Part One
let generations = 20;
let pad = generations;
let state = getInitialState(pad);
for (let i = 0; i < generations; i++) {
  state = getNextGeneration(state);
}

const partOne = getValue(state, pad);
console.log("Part One:", partOne);

// Part Two
generations = 50000000000;
pad = 200;
state = getInitialState(pad);
let lastDiff = null;
let lastValue = null;
let partTwo = null;
for (let i = 0; i < generations; i++) {
  state = getNextGeneration(state);

  // Look for patterns
  const value = getValue(state, pad);
  const diff = value - lastValue;
  if (diff === lastDiff) {
    // If we get the same diff twice in a row, assume we'll
    // continue getting it forever
    partTwo = value + (generations - i - 1) * diff;
    break;
  }
  lastDiff = diff;
  lastValue = value;
}
console.log("Part Two:", partTwo);
