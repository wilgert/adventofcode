import {readFile} from "../../common/readFile";

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split(""));

const input = prepareInput(readFile(__dirname + "/input.txt"));

function countTrees(
  map: string[][],
  { right, down }: { right: number; down: number }
) {
  let trees = 0;
  for (let i = 0; i < map.length; i += down ) {
    const row = map[i];
    const treeIndex = (i/down * right) % row.length;
    if (row[treeIndex] === "#") {
      trees++;
    }
  }
  return trees;
}

const goA = (input): number => {
  return countTrees(input, { right: 3, down: 1 });
};

const goB = (input) => {
  const slopes = [
    {
      right: 1,
      down: 1,
    },
    {
      right: 3,
      down: 1,
    },
    {
      right: 5,
      down: 1,
    },
    {
      right: 7,
      down: 1,
    },
    {
      right: 1,
      down: 2,
    },
  ];

  return slopes.reduce((totalTrees, slope) => totalTrees * countTrees(input, slope), 1)
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
