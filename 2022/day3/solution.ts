import {readFile} from "../../common/readFile";

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`);


interface Rucksack {
  a: string;
  b: string;
}

function processInput(input: string): string[] {
  return input
    .split("\n")
    .filter((i) => i);
}

function letterToPriority(l: string): number {
  return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZa'.indexOf(l) + 1;
}

function overlappingItemPriority({a, b}: Rucksack): number {
  const overlappingItem = a.split('').find(item => b.includes(item));
  return letterToPriority(overlappingItem);
}

function overlappingItemPriority2([a, b, c]: [string, string, string]): number {
  const overlappingItem = a.split('').find(item => b.includes(item) && c.includes(item));
  return letterToPriority(overlappingItem);
}

function part1(input) {
  return input.map((row) => {
    const a = row.slice(0, row.length / 2);
    const b = row.slice(row.length / 2,  row.length);
    return { a, b };
  }).reduce((total, ruckSack) => total + overlappingItemPriority(ruckSack), 0);
}

function part2(input) {
  let total = 0;
  for (let i = 0; i < input.length - 1; i+=3) {
    const elves = input.slice(i, i+3);
    total += overlappingItemPriority2(elves);
  }

  return total;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
