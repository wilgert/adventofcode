import {readFile} from "../../common/readFile";

function parseRow(row: string): number[] {
  return row.split(/[ ]+/g).filter(n => n !== '').map(n => parseInt(n, 10));
}

function processInput(input: string): {draws: number[], boards: number[][][]} {
  const rows = input.split("\n").filter(r => r);
  const draws = rows.shift().split(',').map(n => parseInt(n, 10));
  let boards = [];
  for (let i = 0; i < rows.length; i+=5) {
    const board = [];
    for (let j = 0; j < 5; j++) {
      board.push(parseRow(rows[i+j]));
    }
    boards.push(board);
  }

  return {draws, boards};
}

const input = readFile(__dirname + "/input.txt");
const example = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

export function rotateMatrix(matrix) {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}

export function checkBoard(board: number[][]): boolean {
  return board.some(row => row.every(v => v === -1));
}

function markBoard(board: number[][], draw: number) {
  for (let i = 0; i < board.length; i++){
    for (let j = 0; j < board[i].length; j++){
      if(board[i][j] === draw){
        board[i][j] = -1;
      }
    }
  }
}

function calculateScore(board, draw) {
  return board.reduce((total, row) => total + row.filter(n => n!==-1).reduce((totalRow, n) => totalRow + n, 0), 0) * draw
}

function runGame(draws: number[], boards: number[][][]) {
  let winningBoard;

  let draw: number;
  while (!winningBoard) {
    draw = draws.shift();
    for (const board of boards) {
      markBoard(board, draw);

      let rotated = rotateMatrix(board);
      if (checkBoard(board) || checkBoard(rotated)) {
        winningBoard = board;
        break;
      }
    }

  }

  return calculateScore(winningBoard, draw);
}

function part1(input): number {
  const {draws, boards} = processInput(input);
  return runGame(draws, boards);
}


function getLastWinning(draws: number[], boards: number[][][]) {
  let draw;
  let board;

  for (draw of draws) {
    let winners = [];
    for (let i = 0; i < boards.length; i++) {
      board = boards[i];
      markBoard(board, draw);

      if (checkBoard(board) || checkBoard(rotateMatrix(board))) {
        winners.push(i);
      }
    }

    winners.forEach(w => boards.splice(w, 1));

    if (boards.length === 0) {
      break;
    }
  }
  return {draw, board};
}

function part2(input): number {
  let {draws, boards} = processInput(input);
  let {draw, board} = getLastWinning(draws, boards);
  return calculateScore(board, draw);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
