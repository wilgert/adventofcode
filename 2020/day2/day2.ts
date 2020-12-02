import {readFile} from "../../common/readFile";

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readFile(__dirname + '/input.txt'))

function isValidPart1({min, max, letter, password}) {
  let length = password.split('').filter(l => l === letter).length;
  return length >= min && length <= max;
}

function isValidPart2({min, max, letter, password}) {
  return (password[min-1] === letter && password[max-1] !== letter) || (password[min-1] !== letter && password[max-1] === letter)
}

function createPasswordsAndPolicies(input) {
  return input.split('\n')
    .map(line => line.match(/(\d{1,2})-(\d{1,2}) ([a-z]): (.*)/))
    .filter(match => match)
    .map((match) => ({min: parseInt(match[1]), max: parseInt(match[2]), letter: match[3], password: match[4]}));
}

const goA = (input) => {
  return createPasswordsAndPolicies(input) // ?
    .reduce((total, passwordAndPolicy) => isValidPart1(passwordAndPolicy) ? ++total : total, 0);
}

const goB = (input) => {
  return createPasswordsAndPolicies(input) // ?
    .reduce((total, passwordAndPolicy) => isValidPart2(passwordAndPolicy) ? ++total : total, 0);
}

/* Tests */

// test()

/* Results */

console.time("Time")
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd("Time")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
