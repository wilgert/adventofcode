import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string): string[] =>
  rawInput.split("\n\n").filter((line) => line.length);

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));

export const goA = (groups: string[]): number => {
  return groups
    .map((group) => group.split(/\n/).filter((member) => member))
    .map((group) => new Set(group.flatMap((member) => member.split(""))))
    .reduce((total, group) => total + group.size, 0);
};

export const goB = (groups: string[]): number => {
  return groups
    .map((group) => group.split(/\n/).filter((member) => member))
    .reduce(
      (groupTotal, group) =>
        groupTotal +
        group.reduce((acc, member) => {
          return new Set([
            ...acc,
            ...member
              .split("")
              .filter((q) => group.every((gm) => gm.includes(q))),
          ]);
        }, new Set()).size,
      0
    );
};

/* Tests */

// const testResultA = goA(testInput);
const testResultB = goB(testInput);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = goB(input);
console.timeEnd("Time B");

console.table({ testResultB });
console.table({ resultA, resultB });
