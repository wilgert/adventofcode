import { readFile } from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`A Y
B X
C Z
`);

type Round = { firstCol: "A" | "B" | "C"; secondCol: "X" | "Y" | "Z" };

function processInput(input: string): Round[] {
  return input
    .split("\n")
    .filter((i) => i)
    .map((move) => {
      const [firstCol, secondCol] = move.split(" ");
      return { firstCol, secondCol } as Round;
    });
}

function countScorePart1({ firstCol, secondCol }: Round) {
  const moveScoreMap = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const resultScoreMap = {
    AX: 3,
    AY: 6,
    AZ: 0,
    BX: 0,
    BY: 3,
    BZ: 6,
    CX: 6,
    CY: 0,
    CZ: 3,
  };

  return moveScoreMap[secondCol] + resultScoreMap[`${firstCol}${secondCol}`];
}

function countScorePart2({ firstCol, secondCol }: Round) {
  const roundToMyMoveMap = {
    AX: "C",
    AY: "A",
    AZ: "B",
    BX: "A",
    BY: "B",
    BZ: "C",
    CX: "B",
    CY: "C",
    CZ: "A",
  };

  const moveScoreMap = {
    A: 1,
    B: 2,
    C: 3,
  };

  const resultScoreMap = {
    X: 0,
    Y: 3,
    Z: 6,
  };

  return (
    moveScoreMap[roundToMyMoveMap[`${firstCol}${secondCol}`]] +
    resultScoreMap[`${secondCol}`]
  );
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
