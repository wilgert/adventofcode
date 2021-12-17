import { readFile } from "../../common/readFile";

function processInput(input: string): number[][] {
  return input.split("\n").filter((l) => l).map(l => l.split('').map(n => parseInt(n)));
}

const input = readFile(__dirname + "/input.txt");
const example =
  `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`
;

function runStep(input: number[][], flashes: number) {
  const flashed = Array.from(Array(input.length), () => Array.from(Array(input[0].length), () => 0));
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      input[y][x]++
    }
  }
  while (input.flat().some(n => n > 9)) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] > 9 && flashed[y][x] !== 1) {
          flashes++;
          flashed[y][x] = 1;
          for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
              if (input[y + j] && input[y+j][x+k]!==undefined && !flashed[y + j][x + k]) {
                input[y + j][x + k]++;
              }
            }
          }
          input[y][x] = 0;
        }
      }
    }
  }
  return flashes;
}

function part1(input: number[][]): number {
  let flashes = 0;
  for (let i = 0; i < 195; i++) {
    flashes = runStep(input, flashes);
  }
  input.flat().some(n => n !== 0); // ?
  return flashes;
}

function part2(input: number[][]): number {
  let steps = 0;
  do {
    steps++;
    runStep(input, 0);
  } while(input.flat().some(n => n !== 0))
  return steps;
}
part1(processInput(example)); // ?
part1(processInput(input)); // ?
part2(processInput(example)); // ?
part2(processInput(input)); // ?
