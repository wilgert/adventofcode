import { readFile } from "../../common/readFile";

function processInput(input: string): string[][] {
  return input
    .split("\n")
    .filter((l) => l)
    .map((line) => line.split(" | "));
}

const input = processInput(readFile(__dirname + "/input.txt"));
const example = processInput(
  `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`.replace(/\|\n/g, "| ")
);

function part1(input: string[][]): number {
  return input.reduce(
    (total, [displayIn, displayOut]) =>
      total +
      displayOut
        .split(" ")
        .map((s) => s.length)
        .filter((l) => [2, 4, 3, 7].includes(l)).length,
    0
  );
}

function objectFlip(obj: Record<string, string>) {
  return Object.entries(obj).reduce((ret, entry) => {
    const [key, value] = entry;
    ret[value.split("").sort().join("")] = key;
    return ret;
  }, {});
}

function hasAllSegments(segments: string, i: string) {
  return segments.split("").every((c) => i.includes(c));
}

function findSignal(inputs: string[], predicate: (i) => boolean) {
  return inputs.splice(inputs.findIndex(predicate), 1)[0];
}

function findDigitMap(displayIn: string) {
  const digitMap = {};
  const inputs = displayIn.split(" ");

  digitMap["1"] = findSignal(inputs, (i) => i.length === 2);
  digitMap["4"] = findSignal(inputs, (i) => i.length === 4);
  digitMap["7"] = findSignal(inputs, (i) => i.length === 3);
  digitMap["8"] = findSignal(inputs, (i) => i.length === 7);
  digitMap["3"] = findSignal(
    inputs,
    (i) => i.length === 5 && hasAllSegments(digitMap["1"], i)
  );
  digitMap["0"] = findSignal(
    inputs,
    (i) =>
      i.length === 6 &&
      hasAllSegments(digitMap["1"], i) &&
      !hasAllSegments(digitMap["3"], i)
  );
  digitMap["9"] = findSignal(
    inputs,
    (i) =>
      i.length === 6 &&
      hasAllSegments(digitMap["1"], i) &&
      hasAllSegments(digitMap["3"], i)
  );
  digitMap["5"] = findSignal(inputs, (i) => i.length === 5 && hasAllSegments(i, digitMap['9']));
  digitMap["6"] = findSignal(inputs, (i) => i.length === 6);
  digitMap["2"] = inputs[0];
  return objectFlip(digitMap);
}

function part2(input): number {
  return input.reduce((total, [displayIn, displayOut]) => {
    const digitMap: Record<string, string> = findDigitMap(displayIn);

    let number = parseInt(
      displayOut
        .split(" ")
        .map((s) => {
          let sorted = s.split("").sort().join("");
          return digitMap[sorted];
        })
        .join(""),
      10
    );
    return total + number;
  }, 0);
}

part1(example); // ?
part1(input); // ?
part2(example); // ?
part2(input); // ?
