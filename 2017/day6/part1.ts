import {readFile} from '../../common/readFile';

const input = readFile('2017/day6/input_day6');

const part1 = (input: string)=>{

    let current: Array<{cycle: number, state: number[]}> = {cycle: 0, state: input.split(/\s+/).map(s => parseInt(s, 10))};
    let steps = 0;

    const seen = [];

    while(seen.map(s => s.state).indexOf(current.state.join('-')) === -1){
        seen.push(current);

        steps++;
        // current = equalize(current);
        // result = steps -
    }
    return steps;
};

function findMostBlockIndex(input: number[]): {index: number, blockCount: number} {
    const blockCount = Math.max(...input);

    return {index: input.indexOf(blockCount), blockCount};
}

const equalize = (input: number[]): number[] =>{
    const {index, blockCount} = findMostBlockIndex(input);

    input[index] = 0;

    for(var i = 1; i <= blockCount; i++){
        input[(index + i) % input.length]++;
    }

    return input;
};

let step1 = part1('0 2 7 0');
step1

input;
step1 = part1(input);
console.log(step1);
