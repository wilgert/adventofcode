import {readFile} from '../../2018/common/readFile';

const input = readFile('./day6/input_day6');

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


//
// let result = part1('0 2  7  0');
// result;
//
// result = part1(input);
//
// result;
// const part2 = (input: string)=>{
//     const passPhrases: string[] = input.split('\n');
//     const aggregate = passPhrases.reduce((total, passPhrase) =>{
//         if(isValid2(passPhrase)){
//             return ++total;
//         }
//
//         return total;
//     }, 0);
//
//     return aggregate;
// };
//
// const isValid2 = (passPhrase: string): boolean=>{
//     const asArray = passPhrase.split(' ');
//     const annagramsRemoved = asArray.filter((value, idx) => asArray.slice(idx +1).every((innerValue)=> !isAnagram(innerValue, value)))
//
//     return annagramsRemoved.length === asArray.length;
// };
//
// const regularize =  (str) => {
//     return str.toLowerCase().replace(/[^a-z\d]/g,'').split('').sort().join('');
// }
// const isAnagram = (word1, word2)=> regularize(word1) == regularize(word2);
//
// let result2 = isValid2('abcde fghij');
// result2;
//
//
// result2 = isValid2('abcde xyz ecdab');
// result2;
//
// result2 = isValid2('a ab abc abd abf abj');
// result2;
//
// result2 = part2(input);
//
// result2;