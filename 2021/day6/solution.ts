import { readFile } from "../../common/readFile";

function processInput(input: string): string[] {
  return input.replace('\n', '').split(",");
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`3,4,3,1,2`);

function parseInput(input): number[] {
  return input.reduce((fishCounts, fish) => {
    fishCounts[fish]++;
    return fishCounts;
  }, [0,0,0,0,0,0,0,0,0,0,0]);
}

function runSimulation(input: number[], iterations: number) {
  let processed = parseInput(input); // ?
  for (let i = 0; i < iterations; i++) {
    const next = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let j = 0; j < 8; j++) {
      next[j] = processed[j + 1];
    }
    next[6] += processed[0];
    next[8] += processed[0];
    processed = next;
  }
  return processed.reduce((t, c) => t + c);
}

function part1(input): number {
  return runSimulation(input, 80);
}

function part2(input): number {
  return runSimulation(input, 256);
}



part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
