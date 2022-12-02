import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`A Y
B X
C Z
`);

type Round = { firstCol: 'A' | 'B' | 'C', secondCol: 'X' | 'Y' | 'Z' };

function processInput(input: string): Round[] {
  return input
    .split("\n")
    .filter((i) => i)
    .map(move => {
      const [firstCol, secondCol] = move.split(' ');
      return {firstCol, secondCol} as Round;
    })
}

function countScorePart1({firstCol, secondCol}: Round) {
  const moveScoreMap = {
    'X': 1,
    'Y': 2,
    'Z': 3
  }

  const resultScoreMap = {
    'AX': 3,
    'AY': 6,
    'AZ': 0,
    'BX': 0,
    'BY': 3,
    'BZ': 6,
    'CX': 6,
    'CY': 0,
    'CZ': 3,
  }

  return moveScoreMap[secondCol] + resultScoreMap[`${firstCol}${secondCol}`];
}

function countScorePart2({firstCol, secondCol}: Round) {
  const resultScoreMap = {
    'AX': 3 + 0,
    'AY': 1 + 3,
    'AZ': 2 + 6,
    'BX': 1 + 0,
    'BY': 2 + 3,
    'BZ': 3 + 6,
    'CX': 2 + 0,
    'CY': 3 + 3,
    'CZ': 1 + 6
  }

  return resultScoreMap[`${firstCol}${secondCol}`];
}

function part1(input) {
  const scores = input.map(countScorePart1);
  return scores.reduce((total, score) => score + total);
}


function part2(input) {
  const scores = input.map(countScorePart2);
  return scores.reduce((total, score) => score + total);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
