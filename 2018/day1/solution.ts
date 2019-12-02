import * as path from 'path';
import {readFile} from "../../common/readFile";


const input = readFile(path.join(__dirname, 'input.txt'));
const lines = input.split('\n');

const mapper = (string) => parseInt(string, 10);

export const device = (input) => {
    const instructions = input
        .map(mapper);
    const length = instructions.length;

    let current = 0;
    let visited = new Set<number>();

    let i = 0;
    while(visited.has(current) == false) {
        visited.add(current);
        current = current + instructions[i];
        i++;
        if(i == length) {
            i = 0;
        }
    }
    return current;
};

device(lines); /* ? */
