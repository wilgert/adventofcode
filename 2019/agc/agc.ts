import {Op} from "./types";

let jmp = false;

function getParam(paramMode: number, param: number, memory: number[]): number {
    return paramMode ? param : memory[param];
}

function write(memory, address, value): number[] {
    memory[address] = value;
    return memory;
}

const add: Op = {
    name: 'add',
    length: 4,
    run: ({memory, params: [param1, param2, address], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        const parsedParam1 = getParam(paramMode1, param1, memory);
        const parsedParam2 = getParam(paramMode2, param2, memory);
        const value = parsedParam1 + parsedParam2;
        return write(memory, address, value);
    }
};

const multiply: Op = {
    name: 'multiply',
    length: 4,
    run: ({memory, params: [param1, param2, address], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        return write(memory, address, getParam(paramMode1, param1, memory) * getParam(paramMode2, param2, memory))
    }
};

const input: Op = {
    name: 'input',
    length: 2,
    input: true,
    run: ({memory, params: [param1, address]}) => {
        return write(memory, address, param1)
    }
};

const output: Op = {
    name: 'output',
    length: 2,
    output: true,
    run: ({memory, params: [address]}): number => {
        return memory[address]
    }
};

const jmpIfTrue: Op = {
    name: 'jmpIfTrue',
    length: 3,
    jmp: true,
    run: ({ip, memory, params: [param1, param2], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        jmp = getParam(paramMode1, param1, memory) !== 0;
        return jmp ? getParam(paramMode2, param2, memory) : ip;
    }
};

const jmpIfFalse: Op = {
    name: 'jmpIfFalse',
    length: 3,
    jmp: true,
    run: ({ip, memory, params: [param1, param2], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        jmp = getParam(paramMode1, param1, memory) == 0;
        return jmp ? getParam(paramMode2, param2, memory) : ip;
    }
};

const lessThan: Op = {
    name: 'lessThan',
    length: 4,
    run: ({memory, params: [param1, param2, address], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        return write(memory, address, getParam(paramMode1, param1, memory) < getParam(paramMode2, param2, memory) ? 1 : 0)
    }
};

const equals: Op = {
    name: 'equals',
    length: 4,
    run: ({memory, params: [param1, param2, address], paramModes:[paramMode1, paramMode2] = [0,0,0]}) => {
        return write(memory, address, getParam(paramMode1, param1, memory) === getParam(paramMode2, param2, memory) ? 1 : 0)
    }
};


const halt: Op = {
    name: 'halt',
    length: 4,
    run: () => 0,
    halt: true
};

export const opCodes: { [key: number]: Op } = {
    1: add,
    2: multiply,
    3: input,
    4: output,
    5: jmpIfTrue,
    6: jmpIfFalse,
    7: lessThan,
    8: equals,
    99: halt
};

export function getParamModes(memory: number[], index: number) {
    const withoutTensAndSingles = `${(memory[index] - memory[index] % 100) / 100}`;
    const sliced = withoutTensAndSingles.slice(0, 3);
    const padded = sliced.padStart(3, '0');
    const sliced2 = padded.slice(0, 3);
    const splitted = sliced2.split('');
    return splitted.map(n => parseInt(n, 10)).reverse();
}

let stackTrace = [];

export const step = (ip: number, memory: number[], input?: () => number, output?: (out: number) => void, debug?): [number, number[]] => {
    const op = opCodes[memory[ip] % 100];
    stackTrace.push({index: ip, op});

    const paramModes = getParamModes(memory, ip);

    let params = memory.slice(ip + 1, ip + op.length);
    if (op.input) {
        params = [input(), ...params];
    }

    if(op.output === true){
        const toOutput = op.run({memory, params, paramModes}) as number;
        if(toOutput !== 0 && debug) {
            debug(ip, memory, op);
        }
        output(toOutput as number);
    } else if(!op.jmp) {
        memory = [...op.run({memory, params, paramModes}) as number[]];
    }

    if(op.jmp){
        ip = op.run({memory, params, paramModes, ip}) as number
    }

    if(jmp === false) {
        ip = ip + op.length;
    }

    return [ip, memory];
};

export const agc = (memory: number[], verb?: number, noun?: number, input?: () => number, output?: (out: number) => void, debug?: (index: number, memory: number[], op: Op) => void ) => {
    if (noun) {
        memory[1] = noun;
    }
    if (verb) {
        memory[2] = verb;
    }

    let ip = 0;
    while(memory[ip] !== 99){
        [ip, memory] = step(ip, [...memory], input, output,debug);
        jmp = false;
    }

    return memory;
};
