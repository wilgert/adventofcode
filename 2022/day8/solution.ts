import { readFile } from "../../common/readFile";

const input = readFile(__dirname + "/input.txt");
const example = `30373
25512
65332
33549
35390`;
function countVisibleTreesInRow(row: number[], i: number): string[] {
  const visibleTrees = [];
  let maxTree = -1;

  for (let j = 0; j < row.length; j++){
    const tree = row[j];
    if (tree > maxTree) {
      // This tree is visible
      visibleTrees.push(`${i},${j}`)
      maxTree = tree;
    }
  }

  maxTree = -1;
  for (let j = row.length-1; j >= 0; j--){
    const tree = row[j];
    if (tree > maxTree) {
      // This tree is visible
      visibleTrees.push(`${i},${j}`)
      maxTree = tree;
    }
  }

  return visibleTrees;
}

function countVisibleTreesInColumn(column: number[], i: number): string[] {
  const visibleTrees = [];
  let maxTree = -1;

  for (let j = 0; j < column.length; j++){
    const tree = column[j];
    if (tree > maxTree) {
      // This tree is visible
      visibleTrees.push(`${j},${i}`)
      maxTree = tree;
    }
  }

  maxTree = -1;
  for (let j = column.length -1; j >= 0; j--){
    const tree = column[j];
    if (tree > maxTree) {
      // This tree is visible
      visibleTrees.push(`${j},${i}`)
      maxTree = tree;
    }
  }

  return visibleTrees;
}

function part1(input) {
  // Split the input string into lines and map each line to an array of numbers
  const grid = input.split("\n").map(line => line.split("").map(Number));

  let visibleTrees = [];

// Check each row and column of the grid
  for (let i = 0; i < grid.length; i++) {
    // Check each row
    const row = grid[i];
    const visibleTreesFromLeft = countVisibleTreesInRow(row, i);


    // Check each column
    const column = grid.map(row => row[i]);
    const visibleTreesFromTop = countVisibleTreesInColumn(column, i);

    visibleTrees = [...visibleTrees, ...visibleTreesFromLeft, ...visibleTreesFromTop];
  }

  return new Set(visibleTrees).size;
}

function part2(input) {
  const grid = input.split("\n").filter(i => i).map(line => line.split("").map(Number));

  let bestScenicScore = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const scenicScore = calculateScenicScore(grid, i, j);
      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore;
      }
    }
  }
  function calculateScenicScore(grid: number[][], i: number, j: number): number {
    let scenicScore = 1;
    
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([di, dj]) => {
      scenicScore *= countVisibleTrees(grid, i, j, di, dj); // up
    })

    return scenicScore;
  }

  function countVisibleTrees(grid: number[][], i: number, j: number, di: number, dj: number): number {
    const height = grid[i][j];

    let visibleTrees = 0;
    let i2 = i + di;
    let j2 = j + dj;

    // Count the number of visible trees in the specified direction
    while (i2 >= 0 && i2 < grid.length && j2 >= 0 && j2 < grid[0].length){
      visibleTrees++;

      if(grid[i2][j2] >= height) {
        break;
      }

      // Move to the next position in the specified direction
      i2 += di;
      j2 += dj;
    }

    return visibleTrees;
  }

  return bestScenicScore;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
