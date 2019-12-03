import {readFile} from '../../common/readFile';
import * as path from "path";

let input = readFile(path.join(__dirname, 'input.txt'));
let testInput = readFile(path.join(__dirname, 'testInput.txt'));


const opcodeLengthMap = {
    1: 4,
    2: 4,
    99: 1
};

export const step = (index: number, state: number[]) => {
    let operant1 = state[state[index+1]];
    let operant2  = state[state[index+2]];
    state[state[index+3]] = state[index] === 1 ? operant1 + operant2 : operant1 * operant2;

    return state;
};

export const agc = (memory: number[]) => {
    for(let ip = 0; memory[ip] !== 99; ip+=opcodeLengthMap[memory[ip]]){
        step(ip, memory);
    }
    return memory;
};

const initialMemory = input.split(',').map(n => parseInt(n, 10));

function part2(initialMemory) {
    for(let noun = 0; noun < 99; noun++){
        for(let verb = 0; verb < 99; verb++){
            const memory = [...initialMemory];
            memory[1] = noun;
            memory[2] = verb;
            const result = agc(memory);
            if(result[0] === 19690720){
                return 100 * noun + verb;
            }
        }
    }
}

part2(initialMemory); // ?

initialMemory[1] = 12;
initialMemory[2] = 2;

agc(initialMemory)[0]; // ?
