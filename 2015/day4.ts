import {Md5} from "ts-md5";


const testInput1 = 'abcdef';
const testResult1 = '609043';
const testInput2 = 'pqrstuv';
const testResult2 = '1048970';
const realInput = 'ckczppom';

let md5 = '';
let number = 0;

while(!md5.startsWith('000000')) {
    number++;
    md5 = Md5.hashAsciiStr(`${realInput}${number}`);
}

md5;
number;
