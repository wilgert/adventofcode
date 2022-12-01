import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`);

function processInput(input: string): number[][] {
  return input
    .split("\n\n")
    .map(cals => cals.split('\n').filter((i) => i).map((n) => parseInt(n, 10)))
}

function sortByCals(input) {
  return input.map(cals => cals.reduce((t, c) => t + c)).sort((a, b) => b - a);
}

function part1(input) {
  return sortByCals(input)[0];
}


function part2(input) {
  return sortByCals(input).slice(0,3).reduce((t,c) => t+c);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
