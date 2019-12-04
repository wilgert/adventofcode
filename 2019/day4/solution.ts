import {readFile} from '../../common/readFile';
import * as path from "path";

const input = readFile(path.join(__dirname, 'input.txt'));

export const isIncreasing = (intArray: number[]) => {
    return intArray
        .every((n, index, array) => {
        const next = array[index + 1];
        return next === undefined || n <= next;
    });
};

export const hasDouble = (intArray: number[]) => {
    return intArray
        .some((n, index, array) => {
            const next = array[index + 1];
            return n === next;
        });
};

export const hasDoublebutNoMore = (intArray: number[]) => {
    return intArray
        .some((n, index, array) => {
            const next = array[index + 1];
            const previous = array[index - 1];
            const nextNext = array[index + 2];
            return n === next && n !== previous && n !== nextNext;
        });
};

export const meetsRulesPart1 = (passWord: number) => {
    const passStr = `${passWord}`;
    const intArray = passStr.split('')
        .map((n) => parseInt(n ,10));
    return isIncreasing(intArray) && hasDouble(intArray);
};

export const meetsRulesPart2 = (passWord: number) => {
    const passStr = `${passWord}`;
    const intArray = passStr.split('')
        .map((n) => parseInt(n ,10));
    return isIncreasing(intArray) && hasDoublebutNoMore(intArray);
};

export const generatePart1 = (start: number, end: number): number => {
    let valid = 0;
  for(let i = start; i < end; i++) {
      if(meetsRulesPart1(i)){
          valid++;
      }
  }
  return valid;
};

export const generatePart2 = (start: number, end: number): number => {
    let valid = 0;
    for(let i = start; i < end; i++) {
        if(meetsRulesPart2(i)){
            valid++;
        }
    }
    return valid;
};


generatePart1(134792, 675810);
generatePart2(134792, 675810);
