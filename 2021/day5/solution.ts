import { readFile } from "../../common/readFile";

function processInput(input: string): string[] {
  return input.split("\n").filter((i) => i);
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`);

type Line = { x1: number, y1: number, x2: number, y2: number };

function parseInput(input): Line[] {
  return input
    .map((line) => /(\d*),(\d*) -> (\d*),(\d*)/gm.exec(line))
    .map(([, ...coords]) => coords.map(n => parseInt(n, 10)))
    .map(([x1, y1, x2, y2]) => ({x1, y1, x2, y2}));
}

function part1(input): number {
  const processed = parseInput(input); // ?
  const grid = [];
  for (const {x1, y1, x2, y2} of processed) {
    if(x1 !== x2 && y1 !== y2){
      continue;
    }
    for (let y = Math.min(y1,y2); y <= Math.max(y2,y1); y++) {
      if(grid[y] === undefined) {
        grid[y] = [];
      }
      for (let x = Math.min(x1,x2); x <= Math.max(x2,x1); x++) {
        if(grid[y][x] === undefined){
          grid[y][x] = 0;
        }
        grid[y][x]++;
      }
    }
  }

  return grid.flat().filter(n => n > 1).length; // ?
}

function part2(input): number {
  const processed = parseInput(input);
  const grid = [];
  for (const {x1, y1, x2, y2} of processed) {
    if(x1 < x2 && y1 < y2) { // 1,1 -> 3,3
      for(let x = x1, y = y1; y <= y2; x++, y++) {
        if(grid[y] === undefined) {
          grid[y] = [];
        }
        if(grid[y][x] === undefined){
          grid[y][x] = 0;
        }
        grid[y][x]++;
      }
    } else if(x1 > x2 && y1 > y2) { // 3,3 -> 1,1
      for(let x = x1, y = y1; x >= x2; x--, y--) {
        if(grid[y] === undefined) {
          grid[y] = [];
        }
        if(grid[y][x] === undefined){
          grid[y][x] = 0;
        }
        grid[y][x]++;
      }
    } else if(x1 > x2 && y1 < y2) { // 2,1 -> 1,2
      for(let x = x1, y = y1; x >= x2; x--, y++) {
        if(grid[y] === undefined) {
          grid[y] = [];
        }
        if(grid[y][x] === undefined){
          grid[y][x] = 0;
        }
        grid[y][x]++;
      }
    } else if(x1 < x2 && y1 > y2) { // 1,2 => 2,1
      for(let x = x1, y = y1; x <= x2; x++, y--) {
        if(grid[y] === undefined) {
          grid[y] = [];
        }
        if(grid[y][x] === undefined){
          grid[y][x] = 0;
        }
        grid[y][x]++;
      }
    } else {
      for (let y = Math.min(y1,y2); y <= Math.max(y2,y1); y++) {
        if(grid[y] === undefined) {
          grid[y] = [];
        }
        for (let x = Math.min(x1,x2); x <= Math.max(x2,x1); x++) {
          if(grid[y][x] === undefined){
            grid[y][x] = 0;
          }
          grid[y][x]++;
        }
      }
    }
  }

  return grid.flat().filter(n => n > 1).length;
}


part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
