import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .filter((line) => line.length)
    .map((line) => parseInt(line, 10))
    .sort((a, b) => a - b);

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));
const testInput2 = prepareInput(readFile(__dirname + "/test-input2.txt"));

function countDifferences(adapters: number[]) {
  const { diffs } = adapters.reduce(
    ({ diffs }, adapter, index, array) => {
      let nextAdapter = array[index + 1];
      if (nextAdapter) {
        diffs[nextAdapter - adapter]++;
      } else {
        diffs[3]++;
      }
      return { diffs };
    },
    { diffs: { 1: 0, 2: 0, 3: 0 } }
  );

  return diffs;
}

function countPossibleCombination(lines: number[]): number {
  const diffs = countDifferences(lines); // ?

}

export const goA = (lines: number[]): number => {
  const diffs = countDifferences([0, ...lines]);
  return diffs[1] * diffs[3];
};

export const goB = (lines: number[]): number => {
  return countPossibleCombination([0, ...lines, lines[-1] + 3]);
};

/* Tests */

const testResultA = goA(testInput);
const testResultA2 = goA(testInput2);
const testResultB = goB(testInput);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = 0; // goB(input);
console.timeEnd("Time B");

console.table({ testResultA, testResultA2, resultA, testResultB, resultB });
