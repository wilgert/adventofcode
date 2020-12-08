import { readFile } from "../../common/readFile";

interface Instruction {
  opCode: string;
  argument: number;
}

export function parseInstruction(line: string): Instruction {
  const [opCode, argumentAsString] = line.split(' ') ?? [];
  const argument = parseInt(argumentAsString.replace('+', ''), 10);
  return {opCode, argument};
}

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .filter((line) => line.length)
    .map(parseInstruction);

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));

function runInstruction({a, pc}, instruction: Instruction) {
  switch (instruction.opCode) {
    case 'acc':
      a += instruction.argument;
      pc++;
      break;
    case 'jmp':
      pc += instruction.argument;
      break;
    case 'nop':
      pc++
      break;
  }

  return {pc, a}
}

export function computer(instructions: Instruction[], state = {pc: 0, a: 0}) {
  const executed = [];
  let nextInstruction = instructions[state.pc];
  while(nextInstruction && !executed.includes(nextInstruction)) {
    executed.push(nextInstruction);
    state = runInstruction(state, nextInstruction);
    nextInstruction = instructions[state.pc];
  }

  return state;
}

export const goA = (instructions: Instruction[]): number => {
  return computer(instructions).a;
};

export const goB = (instructions): number => {
  for (let i = 2; i < instructions.length; i++) {
    const changedInstructions = [...instructions];
    if(changedInstructions[i].opCode === 'jmp'){
      changedInstructions[i] = {...changedInstructions[i], opCode: 'nop'};
    } else if(changedInstructions[i].opCode === 'nop') {
      changedInstructions[i] = {...changedInstructions[i], opCode: 'jmp'};
    } else {
      continue;
    }

    const {a, pc} = computer(changedInstructions);
    if(pc === changedInstructions.length) {
      return a;
    }
  }
};

/* Tests */

const testResult = goA(testInput);
const testResultB = goB(testInput);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = goB(input);
console.timeEnd("Time B");

console.table({ testResult, resultA, testResultB, resultB});
