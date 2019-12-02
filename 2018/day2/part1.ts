import {readFile} from '../../common/readFile';
import * as path from 'path';


const input = readFile(path.join(__dirname, 'input.txt')).split('\n');

function hasCharacterMupliple(str: string, count: number): boolean {
    const letters = str.split('');

    return letters.some((value) => (str.match(new RegExp(value, 'g')) || []).length == count);
}

export const hasDouble = (str: string): boolean => {
    return hasCharacterMupliple(str, 2);
};

export const hasTriple = (str: string): boolean => {
    return hasCharacterMupliple(str, 3);
};

export const checksum = (input): number => {
    const {doubles, triples} = input.reduce((acc, value) => ({
        doubles: acc.doubles + hasDouble(value),
        triples: acc.triples + hasTriple(value),
    }), {doubles: 0, triples: 0});

    return doubles * triples
};

checksum(input); /* ? */
