import {readFile} from '../../common/readFile';
import * as path from "path";
import {agc} from "../agc/agc";

let input = readFile(path.join(__dirname, 'input.txt'));
let testInput = readFile(path.join(__dirname, 'testInput.txt'));


const initialMemory = input.split(',').map(n => parseInt(n, 10));

function part2(initialMemory) {
    for (let noun = 0; noun < 99; noun++) {
        for (let verb = 0; verb < 99; verb++) {
            const memory = [...initialMemory];
            const result = agc(memory, noun, verb);
            if (result[0] === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
}

part2(initialMemory); // ?

initialMemory[1] = 12;
initialMemory[2] = 2;

agc(initialMemory)[0]; // ?
