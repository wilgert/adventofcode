import { readFile } from "../../common/readFile";

function processInput(input: string): number[] {
  return input.replace('\n', '').split(",").map(n => parseInt(n, 10)); // ?
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`16,1,2,0,4,2,7,1,2,14`);

function part1(input: number[]): number {
  const uniquePositions = input.filter((n, index, array) => array.indexOf(n) === index); // ?

  let result = Infinity;

  for (const position of uniquePositions) {
    const fuelCost = input.reduce((t, p) => t + Math.abs(position-p), 0);
    if(fuelCost < result) {
      result = fuelCost;
    }
  }

  return result;
}

function getFuelCost(position: any, p) {
  const steps = Math.abs(position - p);
  let cost = 0;
  for (let i = 1; i <= steps; i++) {
    cost += i;
  }

  return cost;
}

function part2(input): number {
  const maxPosition = Math.max(...input); // ?

  let result = Infinity;

  for (let i = 0; i < maxPosition; i++) {
    const fuelCost = input.reduce((t, p) => t + getFuelCost(i, p), 0);
    if(fuelCost < result) {
      result = fuelCost;
    }
  }

  return result;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
