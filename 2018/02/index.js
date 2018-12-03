const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// Part One
const hasSameLetter = (string, count) => {
  const sorted = string.split("").sort();
  const frequencies = new Map();
  sorted.forEach(letter => {
    const f = frequencies.get(letter) || 0;
    frequencies.set(letter, f + 1);
  });
  return Array.from(frequencies.values()).includes(count);
};

const twoLetters = lines.filter(line => hasSameLetter(line, 2));
const threeLetters = lines.filter(line => hasSameLetter(line, 3));
const partOne = twoLetters.length * threeLetters.length;
console.log("Part One:", partOne);

// Part Two
const DIFF_COUNT = 1;
let partTwo;

for (let i = 0; i < lines.length; i++) {
  const first = lines[i];

  for (let j = i + 1; j < lines.length; j++) {
    const second = lines[j];

    let diffs = 0;
    let result = "";
    for (let n = 0; n < first.length && diffs <= DIFF_COUNT; n++) {
      if (first[n] === second[n]) {
        result += first[n];
      } else {
        diffs++;
      }
    }

    if (diffs === DIFF_COUNT) {
      partTwo = result;
      break;
    }
  }
}

console.log("Part Two", partTwo);
