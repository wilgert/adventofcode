import { readFile } from "../../common/readFile";

function processInput(input: string): string[] {
  return input.split("\n").filter((l) => l);
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(
  `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
);

const corruptingScore = {
  "": 0,
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const matching = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

export function getCorruptingCharacter(line: string): [string, string[]] {
  let corrrupting = '';
  const stack = [];
  for (const char of line.split('')) {
    if(matching[char]) {
      stack.push(matching[char]);
    } else if (char === stack[stack.length-1]) {
      stack.pop();
    } else {
      corrrupting = char;
      break;
    }
  }
  return [corrrupting, stack];
}

function part1(input: string[]): number {
  return input.reduce((total, line) => total + corruptingScore[getCorruptingCharacter(line)[0]], 0);
}

const missingScore = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export function getAutocompleteScore(missingCharacters: string[]) {
  return missingCharacters.reduce((stackScore, char) => stackScore * 5 + missingScore[char], 0);
}

function part2(input: string[]): number {
  let scores = [];

  for (const line of input) {
    const [corrupting, stack] = getCorruptingCharacter(line);
    if(corrupting === '' && stack.length > 0){
      scores.push(getAutocompleteScore(stack.reverse()));
    }
  }

  return scores.sort((a, b) => a-b).splice(Math.floor(scores.length / 2), 1)[0];
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
