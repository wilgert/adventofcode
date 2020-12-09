import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .filter((line) => line.length)
    .map((line) => parseInt(line, 10));

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));

function firstNotSumOfPrevious(numbers: number[], preambleLength: number) {
  for (let i = preambleLength; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const start = i - preambleLength;
    const preAmbles = numbers.slice(start, i);
    if (
      preAmbles.every((preAmble1, index, array) => {
        return !array.some(
          (preAmble2) =>
            preAmble1 !== preAmble2 && preAmble1 + preAmble2 === currentNumber
        );
      })
    ) {
      return currentNumber;
    }
  }
}

export const goA = (numbers, preambleLength: number = 25): number => {
  return firstNotSumOfPrevious(numbers, preambleLength);
};

function getSumOfMinMax(continguousSet: number[]) {
  const { min, max } = continguousSet.reduce(
    ({ min, max }, number) => ({
      min: Math.min(min, number),
      max: Math.max(max, number),
    }),
    { min: Infinity, max: 0 }
  );
  return min + max;
}

function findContinguousSet(
  numbers: number[],
  start: number,
  end: number,
  sum: number
): number[] {
  if (end === numbers.length) {
    return null;
  }
  const foundRange = numbers.slice(start, end);
  const foundRangeTotal = foundRange.reduce((total, n) => total + n, 0);
  if (foundRangeTotal === sum) {
    return foundRange;
  } else {
    return findContinguousSet(numbers, start, end + 1, sum);
  }
}

export const goB = (instructions, maxI = 564, sum = 88311122): number => {
  const range = instructions.slice(0, maxI);
  for (let i = 2; i < range.length; i++) {
    const continguousSet = findContinguousSet(range, i, i + 4, sum);
    if (continguousSet) {
      return getSumOfMinMax(continguousSet);
    }
  }
};

/* Tests */

const testResultA = goA(testInput, 5);
const testResultB = goB(testInput, 14, 127);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = goB(input);
console.timeEnd("Time B");

console.table({ testResultA, resultA, testResultB, resultB });
