import {readFile} from '../../common/readFile';

const input = readFile('./day5/input_day5');

const part1 = (input: string)=>{

    let instructions: number[] = input.split(/\s+/).map(s => parseInt(s, 10));
    let steps = 0;
    const length = instructions.length;
    instructions;
    let index = 0;

    while(index < length){
        steps++;
        index += (instructions[index] > 2 ? instructions[index]-- : instructions[index]++);
    }
    return steps;
};


let result = part1('0 3  0  1  -3');
result;

result = part1(input);

result;
const part2 = (input: string)=>{
    const passPhrases: string[] = input.split('\n');
    const aggregate = passPhrases.reduce((total, passPhrase) =>{
        if(isValid2(passPhrase)){
            return ++total;
        }

        return total;
    }, 0);

    return aggregate;
};

const isValid2 = (passPhrase: string): boolean=>{
    const asArray = passPhrase.split(' ');
    const annagramsRemoved = asArray.filter((value, idx) => asArray.slice(idx +1).every((innerValue)=> !isAnagram(innerValue, value)))

    return annagramsRemoved.length === asArray.length;
};

const regularize =  (str) => {
    return str.toLowerCase().replace(/[^a-z\d]/g,'').split('').sort().join('');
}
const isAnagram = (word1, word2)=> regularize(word1) == regularize(word2);

let result2 = isValid2('abcde fghij');
result2;


result2 = isValid2('abcde xyz ecdab');
result2;

result2 = isValid2('a ab abc abd abf abj');
result2;

result2 = part2(input);

result2;
