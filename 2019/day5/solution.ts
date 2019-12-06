import {readFile} from "../../common/readFile";
import * as path from "path";
import {agc} from "../agc/agc";
import {Op} from "../agc/types";

let input = readFile(path.join(__dirname, 'input.txt'));

const initialMemory = input.split(',').map(n => parseInt(n, 10));

const output1= [];
const debugLog = [];
const debug = (index: number, memory: number[], op: Op) => debugLog.push({index, memory, op});

// part 1
// agc(initialMemory, null, null, ()=>1, (n) => output1.push(n), debug);
//
// output1;
//
// debugLog;

const output2 = [];
// part 2
agc([...initialMemory], null, null, ()=>5, (n) => output2.push(n), debug);

output2;
