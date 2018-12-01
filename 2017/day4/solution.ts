import {readFile} from '../../2018/common/readFile';

const input = readFile('./day4/input_day4');

input;

const part1 = (input: string)=>{
    const passPhrases: string[] = input.split('\n');
    const aggregate = passPhrases.reduce((total, passPhrase) =>{
        if(isValid(passPhrase)){
            return ++total;
        }

        return total;
    }, 0);

    return aggregate;
};

const isValid = (passPhrase: string): boolean=>{
    const array = passPhrase.split(' ');
    return (new Set(array)).size === array.length;
};

let result = isValid('aa bb cc dd ee');
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