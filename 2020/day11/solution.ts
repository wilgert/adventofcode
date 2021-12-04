import { readFile } from "../../common/readFile";

function splitGrid(input: string): string[][] {
  return input
    .split("\n")
    .filter((i) => i)
    .map((row) => row.split(""));
}

function joinGrid(input: string[][]): string {
  return input.map((row) => row.join("")).join("\n");
}

const input = readFile(__dirname + "/input.txt");
const example = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

function countOccupiedNeighbours(
  seats: string[][],
  i: number,
  j: number
): number {
  let previousRow = seats[i - 1];
  let currentRow = seats[i];
  let nextRow = seats[i + 1];
  return [
    ...(previousRow
      ? [previousRow[j - 1], previousRow[j], previousRow[j + 1]]
      : []),
    currentRow[j - 1],
    currentRow[j + 1],
    ...(nextRow ? [nextRow[j - 1], nextRow[j], nextRow[j + 1]] : []),
  ].filter((v) => v === "#").length;
}

function findFirstVisibleSeat(
  seats: string[][],
  i: number,
  j: number,
  k: number,
  l: number
) {
  let foundSeat = ".";
  let dk = k;
  let dl = l;
  while (foundSeat === ".") {
    let row = seats[i + dk];
    foundSeat = row ? row[j + dl] : 'A';
    dk += k;
    dl += l;
  }
  return foundSeat;
}

function countOccupiedFirstVisibleSeat(
  seats: string[][],
  i: number,
  j: number
): number {
  let visibleSeats = [];
  for (let k = -1; k < 2; k++) {
    for (let l = -1; l < 2; l++) {
      if (k === 0 && l === 0) {
        continue;
      }
      visibleSeats.push(findFirstVisibleSeat(seats, i, j, k, l));
    }
  }

  return visibleSeats.filter((v) => v === "#").length;
}

function run(
  grid: string,
  countNeighbors: (seats: string[][], i: number, j: number) => number,
  tolerance: number
): string {
  const seats = splitGrid(grid);
  const newSeats = splitGrid(grid);
  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      const occupiedNeighbours = countNeighbors(seats, i, j);
      if (seats[i][j] === "L" && occupiedNeighbours === 0) {
        newSeats[i][j] = "#";
      }
      if (seats[i][j] === "#" && occupiedNeighbours >= tolerance) {
        newSeats[i][j] = "L";
      }
    }
  }

  return joinGrid(newSeats);
}

function part1(grid) {
  let previousGrid = '';
  while (grid !== previousGrid) {
    previousGrid = grid; // ?
    grid = run(grid, countOccupiedNeighbours, 4); // ?
  }
  return grid.split("#").length - 1;
}

function part2(grid) {
  let previousGrid = '';
  while (grid !== previousGrid) {
    previousGrid = grid;
    grid = run(grid, countOccupiedFirstVisibleSeat, 5);
  }
  return grid.split("#").length - 1;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
