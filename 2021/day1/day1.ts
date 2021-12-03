import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`199
200
208
210
200
207
240
269
260
263`);

function processInput(input: string): number[] {
  return input
    .split("\n")
    .filter((i) => i)
    .map((n) => parseInt(n, 10));
}

function part1(input) {
  return input.reduce(
    (total, depth, index, array) => (total += +(depth > array[index - 1])),
    0
  );
}

function part2(input) {
  return input.reduce(
    (total, depth, index, array) =>
      (total += +(
        array[index - 1] + depth + array[index + 1] <
        depth + array[index + 1] + array[index + 2]
      )),
    0
  );
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
