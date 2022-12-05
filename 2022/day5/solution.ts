import { readFile } from "../../common/readFile";

const input = readFile(__dirname + "/input.txt");
const example = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

function processStacks(stacks: string): string[][] {
  return stacks
    .split("\n")
    .filter((i) => i)
    .reduce((result, row, currentIndex) => {
      for (let i = 0; i < 9; i++) {
        if (!result[i]) {
          result[i] = [];
        }

        let crate = row.slice(i * 4, i * 4 + 3);
        if (crate && crate.includes("[")) {
          result[i].push(crate);
        }
      }

      return result;
    }, []);
}

type Move = { from: number; to: number; count: number };

function processMoves(moves: string): Move[] {
  return moves
    .split("\n")
    .filter((i) => i)
    .map((move) => {
      const [, count, from, to] = move
        .match(/move (\d+) from (\d) to (\d)/)
        .map((m) => parseInt(m, 10));
      return { count, from, to };
    });
}

function processInput(input: string): { stacks: string[][]; moves: Move[] } {
  const [stacks, moves] = input.split("\n\n");

  return { stacks: processStacks(stacks), moves: processMoves(moves) };
}

function runCrane(input, crane) {
  const { stacks, moves } = processInput(input);
  moves.forEach(crane(stacks));

  return stacks
    .map((stack) => stack[0])
    .join("")
    .replace(/\[|\]/gm, "");
}

function part1(input) {
  const crane = (stacks) => ({ count, from, to }) => {
    for (let i = 0; i < count; i++) {
      stacks[to - 1].unshift(stacks[from - 1].shift());
    }
  };
  return runCrane(input, crane);
}

function part2(input) {
  const crane = (stacks) => ({ count, from, to }) => {
    const removed = stacks[from - 1].splice(0, count);
    stacks[to - 1].unshift(...removed);
  };

  return runCrane(input, crane);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
