import { readFile } from "../../common/readFile";

function processInput(input: string): unknown[] {
  return input.split("\n").filter((i) => i);
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`);

function getBitCounts(input) {
  return input.reduce((counts, value) => {
    value.split("").forEach((bit, index) => {
      if (!counts[index]) {
        counts[index] = [0, 0];
      }
      counts[index][bit] = counts[index][bit] + 1; // ?
    });
    return counts;
  }, []);
}

function part1(input) {
  const bitCounts = getBitCounts(input);

  const gamma = parseInt(
    bitCounts.map(([c1, c2]) => (c1 > c2 ? 0 : 1)).join(""),
    2
  ); // ?
  const epsilon = parseInt(
    bitCounts.map(([c1, c2]) => (c1 < c2 ? 0 : 1)).join(""),
    2
  ); // ?
  return gamma * epsilon;
}

function findO2gen(values, first: string = "1", second: string = "0") {
  let bit = 0;

  while (values.length > 1) {
    const bitCounts = getBitCounts(values);
    const bitValue = bitCounts[bit][0] > bitCounts[bit][1] ? first : second;
    values = values.filter((value) => value[bit] === bitValue);
    bit++;
  }

  return values[0];
}

function part2(input) {
  const o2gen = parseInt(findO2gen(input), 2); // ?
  const co2scrub = parseInt(findO2gen(input, "0", "1"), 2); // parseInt(findO2gen(bitCounts, input, '1', '0'), 2);// ?
  return o2gen * co2scrub;
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
