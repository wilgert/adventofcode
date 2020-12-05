import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string) =>
  rawInput.split("\n").filter(line=>line.length).map((line) =>
    ({row: line.substring(0, 7), column: line.substring(7, 10)})
  );

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));

function partition(instructions, space) {
  return instructions.split('').reduce((acc, instruction) => {
    switch(instruction) {
      case 'F':
      case 'L':
        return {lower: acc.lower, upper: (acc.lower + acc.upper) / 2};
      default:
        return {lower: (acc.upper + acc.lower) / 2, upper: acc.upper};
    }
  }, {lower: 0, upper: space}).upper
}

function findRow(row) {
  return partition(row, 128);
}

function findColumn(column) {
  return partition(column, 8);
}

function getSeatId(row, column): number {
  return (row-1) * 8 + (column-1);
}
getSeatId(82, 2); // ?

function mapToSeats(lines) {
  return lines.map(({row, column}) => ({row: findRow(row), column: findColumn(column)}));
}

const goA = (lines): number => {
  return mapToSeats(lines)
    .reduce((acc, {row, column}) => Math.max(acc, getSeatId(row, column)) , 0);
};

const goB = (lines) => {
  return mapToSeats(lines)
    .sort((seatA, seatB) => seatA.column - seatB.column)
    .sort((seatA, seatB) => seatA.row - seatB.row)
    .reduce((acc, seat) => {
      acc[seat.row] = [...(acc[seat.row] ?? []), seat.column];
      return acc;
    } , {})
};

/* Tests */

// row 70, column 7, seat ID 567.
// row 14, column 7, seat ID 119.
// row 102, column 4, seat ID 820.
const testResultA = goA(testInput);

const testResultB = goB(testInput);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = goB(input);
console.timeEnd("Time B");

console.table(resultB)
