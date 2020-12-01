import {readFile} from "../../common/readFile";

const input = readFile(__dirname + '/example.txt').split('\n').filter(i => i).map(n => parseInt(n, 10)).sort((a,b) => a - b);

function part1(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = input.length; j >= 0; j--) {
      if(input[i] + input[j] === 2020) {
        return input[i] * input[j];
      }
    }
  }
}

function part2(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = input.length; j >= 0; j--) {
      for (let k = 0; k < input.length; k++) {
        if(input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }
}

part1(input); // ?.
part2(input); // ?.
