import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`forward 5
down 5
forward 8
up 3
down 8
forward 2`);

type Direction = 'down' | 'up' | 'forward';

type Instruction = { direction: Direction, amount: number };

function processInput(input: string): Instruction[] {
  return input
    .split("\n")
    .filter((i) => i)
    .map((n) => {
      const [direction, amount] = n.split(' ') as [Direction, string];
      return {direction, amount: parseInt(amount, 10)};
    });
}

const instructionMap1 = {
  'down': ({horizontal, depth}, amount) => ({horizontal, depth: depth+amount}),
  'up': ({horizontal, depth}, amount) => ({horizontal, depth: depth-amount}),
  'forward': ({horizontal, depth}, amount) => ({horizontal: horizontal+amount, depth})
};

function part1(input) {
  let {horizontal, depth} = input.reduce(
    (position, {direction, amount}) => {
      return instructionMap1[direction](position, amount);
    },
    { horizontal: 0, depth: 0}
  );
  return horizontal*depth;
}

const instructionMap2 = {
  'down': ({horizontal, depth, aim}, amount) => ({horizontal, depth, aim: aim+amount}),
  'up': ({horizontal, depth, aim}, amount) => ({horizontal, depth, aim: aim-amount}),
  'forward': ({horizontal, depth, aim}, amount) => ({horizontal: horizontal+amount, depth: depth+aim*amount, aim})
};

function part2(input) {
  let {horizontal, depth} = input.reduce(
    (position, {direction, amount}) => {
      return instructionMap2[direction](position, amount);
    },
    { horizontal: 0, depth: 0, aim: 0}
  );
  return horizontal*depth;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
