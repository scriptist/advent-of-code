const fs = require("fs");

const input = fs
  .readFileSync("./input.txt")
  .toString()
  .trim();

// Part One
function findPair(string, start = 0) {
  for (var i = start; i < string.length - 1; i++) {
    if (
      string[i] !== string[i + 1] &&
      string[i].toLowerCase() === string[i + 1].toLowerCase()
    ) {
      return i;
    }
  }
}

function react(string) {
  let pair;
  let reacted = string;

  while ((pair = findPair(reacted, pair ? pair - 1 : 0)) != null) {
    reacted = reacted.substr(0, pair) + reacted.substr(pair + 2);
  }
  return reacted;
}

const partOne = react(input);
console.log("Part One:", partOne.length);

// Part Two
const units = Array.apply(null, { length: 26 }).map((_, i) =>
  String.fromCharCode("a".charCodeAt(0) + i)
);

const partTwo = units
  .map(unit => [unit, react(input.replace(new RegExp(unit, "ig"), "")).length])
  .reduce((acc, item) => (acc[1] < item[1] ? acc : item))[1];

console.log("Part Two:", partTwo);
