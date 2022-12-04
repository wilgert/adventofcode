import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`);

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

type Assignment = { start: number, end: number };

function processInput(input: string): Assignment[][] {
  return input
    .split("\n")
    .filter((i) => i)
    .map(row => row.split(',').map(assignment => {
      const [start, end] = assignment.split('-').map(i => parseInt(i, 10));
      return {start, end};
    }));
}

function aContainsB(a, b): boolean {
  return a.start >= b.start && a.end <= b.end;
}

function anyContains(a, b): boolean {
  return aContainsB(a, b) || aContainsB(b, a);
}

function aOverlapsB(a, b): boolean {
  return range(a.start, a.end, 1).some(id => id >= b.start && id <= b.end);
}

function part1(input) {
  return input.reduce((count, [a, b]) => {
    if (anyContains(a, b)) {
      count++;
    }

    return count;
  }, 0);
}

function part2(input) {
  return input.reduce((count, [a, b]) => {
    if (aOverlapsB(a, b)) {
      count++;
    }

    return count;
  }, 0);
}

// part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
