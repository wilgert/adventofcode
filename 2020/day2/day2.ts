import { readFile } from "../../common/readFile";

const prepareInput = (rawInput: string) => rawInput;

const input = prepareInput(readFile(__dirname + "/input.txt"));

interface PasswordAndPolicy {
  min: number;
  max: number;
  letter: string;
  password: string;
}

const goB = (input): number => {
  return createPasswordsAndPolicies(input).filter((passwordAndPolicy) =>
    isValidPart2(passwordAndPolicy)
  ).length;
};

function isValidPart1({ min, max, letter, password }: PasswordAndPolicy) {
  let length = password.split("").filter((l) => l === letter).length;
  return length >= min && length <= max;
}

function isValidPart2({ min, max, letter, password }: PasswordAndPolicy) {
  return (
    (password[min - 1] === letter && password[max - 1] !== letter) ||
    (password[min - 1] !== letter && password[max - 1] === letter)
  );
}

function createPasswordsAndPolicies(input): PasswordAndPolicy[] {
  return input
    .split("\n")
    .filter((line) => line)
    .map((line) => line.match(/(\d{1,2})-(\d{1,2}) ([a-z]): (.*)/))
    .map(([, min, max, letter, password]) => ({
      min: parseInt(min),
      max: parseInt(max),
      letter,
      password,
    }));
}

const goA = (input): number => {
  return createPasswordsAndPolicies(input).filter((passwordAndPolicy) =>
    isValidPart1(passwordAndPolicy)
  ).length;
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
