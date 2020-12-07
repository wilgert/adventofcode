import { readFile } from "../../common/readFile";

export function parseRule(line: string): {name: string, contains: ContainedBag[]} {
  const [name, containsString] = line.split(' bags contain ') ?? [];
  const contains = containsString.split(', ').flatMap(containsRule => {
    let matches = containsRule.match(/(\d+) (\w* \w*) bags?.?/);
    return matches ? {name: matches[2], count: parseInt(matches[1],10)} : [];
  }) // ?
  return {name, contains};
}

type ContainedBag = { name: string, count: number };

class BagNode {
  constructor(public name: string, public contains: ContainedBag[]) {

  }

  canContain(bagName: string, allNodes: BagNodes) {
    return Object.values(this.contains).map(({name}) => name).includes(bagName) || this.contains.some(({name}) => allNodes[name].canContain(bagName, allNodes));
  }

  countContaining(allNodes: BagNodes) {
    return this.contains.reduce((total, {name, count}) => total + count + count * allNodes[name].countContaining(allNodes),0)
  }
}

type BagNodes = { [key: string]: BagNode };
const prepareInput = (rawInput: string): BagNodes =>
  rawInput.split("\n")
    .filter((line) => line.length)
    .reduce((allNodes, line) =>  {
      const {name, contains} = parseRule(line);
      allNodes[name] = new BagNode(name, contains);
      return allNodes;
    }, {});

const input = prepareInput(readFile(__dirname + "/input.txt"));
const testInput = prepareInput(readFile(__dirname + "/test-input.txt"));

export const goA = (nodes: BagNodes): number => {
  return Object.values(nodes).filter(node => node.canContain('shiny gold', nodes)).length;
};

export const goB = (nodes: BagNodes): number => {
  return nodes['shiny gold'].countContaining(nodes);
};

/* Tests */

const testResultA = goA(testInput);
const testResultB = goB(testInput);

/* Results */

console.time("Time A");
const resultA = goA(input);
console.timeEnd("Time A");

console.time("Time B");
const resultB = goB(input);
console.timeEnd("Time B");

console.table({ testResultA, testResultB });
console.table({ resultA, resultB });
