import { readFile } from "../../common/readFile";

function sortSignals(signals: string) {
  return signals
    .split(" ")
    .map((s) => s.split("").sort().join(""))
    .join(" ");
}

function processInput(input: string): number[][] {
  return input
    .split("\n")
    .filter((l) => l)
    .map((line) => line.split(""))
    .map(line => line.map(n => parseInt(n, 10)))
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(
  `2199943210
3987894921
9856789892
8767896789
9899965678`
);

function isLowerThanNeighbor(input: number[][], i: number, j: number, i2: number, j2: number, whenUndefined: boolean = true) {
  if(input[i2] === undefined) {
    return whenUndefined;
  }
  if(input[i2][j2] === undefined){
    return whenUndefined;
  }

  return input[i][j] < input[i2][j2];
}

function part1(input: number[][]): number {
  const riskMap: number[][] = [];

    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        if(isLowerThanNeighbor(input, i, j, i-1, j) && isLowerThanNeighbor(input, i, j, i+1, j) && isLowerThanNeighbor(input, i, j, i, j-1) && isLowerThanNeighbor(input, i, j, i, j+1)) {
          if(!riskMap[i]){
            riskMap[i] = [];
          }

          riskMap[i][j] = input[i][j];
        }
      }
    }

  let numbers = riskMap.flat();
  return numbers.reduce((t, l) => t+l+1, 0)
}


function findBasinSize(input: number[][], i: number, j: number, basinMap?: number[][] ) {
  if(input[i] && input[i][j] !==undefined && !basinMap[i][j]) {
    if(isLowerThanNeighbor(input, i, j, i-1, j, false)) {
      basinMap[i][j] = 1;
      findBasinSize(input, i-1, j, basinMap);
    }
    if(isLowerThanNeighbor(input, i, j, i+1, j, false)){
      basinMap[i][j] = 1;
      findBasinSize(input, i+1, j, basinMap);
    }
    if(isLowerThanNeighbor(input, i, j, i, j-1, false)){
      basinMap[i][j] = 1;
      findBasinSize(input, i, j-1, basinMap);
    }
    if(isLowerThanNeighbor(input, i, j, i, j+1, false)){
      basinMap[i][j] = 1;
      findBasinSize(input, i, j+1, basinMap);
    }
  }
  return basinMap.flat().filter(x => x).length;
}

function part2(input: number[][]): number {
  const basinSizes: number[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if(isLowerThanNeighbor(input, i, j, i-1, j) && isLowerThanNeighbor(input, i, j, i+1, j) && isLowerThanNeighbor(input, i, j, i, j-1) && isLowerThanNeighbor(input, i, j, i, j+1)) {
        const basinMap = Array.from(Array(input.length), () => Array.from(Array(input[0].length), () => 0));
        basinSizes.push(findBasinSize(input, i, j, basinMap));
      }
    }
  }

  return basinSizes.sort((a,b)=>b-a).slice(0, 3).reduce((t,n) => t*n);
}

// part1(example); // ?
// part1(input); // ?
part2(example); // ?
part2(input); // ?
