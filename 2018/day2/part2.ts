import {readFile} from '../common/readFile';
import * as path from 'path';

const input = readFile(path.join(__dirname, 'input.txt')).split('\n');

function changedCharacters(a: string, b: string): number {
    return a.split('').reduce((changes, character, index) => (changes + +(b[index] !== character)), 0)
};

export const commonCharacters = (input: string[]): string => {
    let first;
    let second;

    input.some((outerBoxID) => {
        second = input.find((innerBoxID) => changedCharacters(outerBoxID, innerBoxID) === 1);
        first = outerBoxID;

        return !!second;
    });

    return first.split('').filter(f => second.includes(f)).join('');
    // return '';
};

commonCharacters(input); /* ? */