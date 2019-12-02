import {readFile} from '../../common/readFile';
import * as path from "path";

let input = readFile(path.join(__dirname, 'input.txt'));
let testInput = 'dabAcCaCBAcCcaDA';

const letters = 'abcdefghijklmnopqrstuvwxyz';


const part1 = (input) => {
    const regexes = letters
        .split('')
        .map(l => new RegExp(`(${l}${l.toUpperCase()}|${l.toUpperCase()}${l})`, 'gm'));

    let previousLength = input.length;

    do {
        previousLength = input.length;
        regexes.forEach((regex) => {
            input = input.replace(regex, '');
        });
    }while(previousLength !== input.length);

    return input.length;
};

console.log(part1(testInput));
console.log(part1(input));

const part2 = (input) => {

    const lengths = letters.split('').map((letter) => {
        let polymer = `${input}`;
        let previousLength = polymer.length;

        do {
            previousLength = polymer.length;
            polymer = polymer.replace(new RegExp(letter, 'gmi'), '');
        }while(previousLength !== polymer.length);

        return part1(polymer);
    });

    return Math.min.apply(Math, lengths);
};

console.log(part2(testInput));
console.log(part2(input));
