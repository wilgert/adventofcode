import { readFile } from "../../common/readFile";

function processInput(input: string): number[] {
  return input
    .replace("\n", "")
    .split(",")
    .map((n) => parseInt(n, 10)); // ?
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`16,1,2,0,4,2,7,1,2,14`);

function getFuelCost(steps) {
  return steps;
}

function getFuelCost2(steps: number) {
  return steps * (steps + 1) / 2;
}

function getOptimalPosition(
  uniquePositions: number[],
  input,
  fuelCost: (steps: number) => number
) {
  return uniquePositions.reduce((result, position) => {
    return Math.min(
      result,
      input.reduce((t, p) => t + fuelCost(Math.abs(position - p)), 0)
    );
  }, Infinity);
}

function part1(input: number[]): number {
  const uniquePositions = input.filter(
    (n, index, array) => array.indexOf(n) === index
  );

  return getOptimalPosition(uniquePositions, input, getFuelCost);
}

function part2(input): number {
  const allPositions = [...Array(Math.max(...input)).keys()];
  return getOptimalPosition(allPositions, input, getFuelCost2);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
