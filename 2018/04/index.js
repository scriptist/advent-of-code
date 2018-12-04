const fs = require("fs");

const lines = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .sort();

/*
* This is far from an optimal solution to the problem. I opted to stick with an
* unnecessarily verbose solution in case it might help for part two.
*/

// Create an array listing all minutes at which each guard is asleep
const guards = new Map();
let currentGuard = null;
let sleepStartTime = null;
lines.forEach(line => {
  const time = new Date(line.substr(1, 16));
  const log = line.substr(19);

  const startShiftMatch = log.match(/Guard #(\d+) begins shift/);
  if (startShiftMatch) {
    if (sleepStartTime) {
      let cursor = sleepStartTime;
      while (cursor.getTime() != time.getTime()) {
        guards.get(currentGuard).push(cursor);
        cursor = new Date(cursor.getTime() + 60000);
      }
      sleepStartTime = null;
    }

    currentGuard = startShiftMatch[1];
    if (!guards.has(currentGuard)) {
      guards.set(currentGuard, []);
    }
  } else if (log.startsWith("falls asleep")) {
    sleepStartTime = time;
  } else if (log.startsWith("wakes up")) {
    let cursor = sleepStartTime;
    while (cursor.getTime() != time.getTime()) {
      guards.get(currentGuard).push(cursor);
      cursor = new Date(cursor.getTime() + 60000);
    }
    sleepStartTime = null;
  }
});

// Part One
const sleepiest = Array.from(guards.entries()).reduce(
  (acc, entry) => (acc[1].length > entry[1].length ? acc : entry)
);
const [sleepiestGuardsSleepiestMinute] = getSleepiestMinute(sleepiest[1]);
const partOne = sleepiestGuardsSleepiestMinute * sleepiest[0];
console.log("Part One:", partOne);

// Part Two
const sleepiestTimesPerGuard = Array.from(guards.entries()).map(
  ([guard, times]) => [guard, ...getSleepiestMinute(times)]
);
const bestTime = sleepiestTimesPerGuard.reduce(
  (acc, entry) => (acc[2] > entry[2] ? acc : entry)
);
const partTwo = bestTime[0] * bestTime[1];
console.log("Part Two:", partTwo);

// Helpers
function getSleepiestMinute(times) {
  const minutes = new Array(60).fill(0);

  times.forEach(t => minutes[t.getMinutes()]++);
  const bestMinCount = Math.max(...minutes);
  return [minutes.indexOf(bestMinCount), bestMinCount];
}
