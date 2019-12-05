const add = {
    length: 4,
    run: (input1, input2) => input1 + input2
};

const multiply = {
    length: 4,
    run: (input1, input2) => input1 * input2
};

const halt = {
    length: 4,
    run: () => {},
    halt: true
};

const opCodes = {
    1: add,
    2: multiply,
    99: halt
};

export const step = (index: number, state: number[]) => {
    const op = opCodes[state[index]];

    let arg1 = state[state[index+1]];
    let arg2  = state[state[index+2]];

    state[state[index+3]] = op.run(arg1, arg2);

    return state;
};

export const agc = (memory: number[]) => {
    for(let ip = 0; memory[ip] !== 99; ip+=opCodes[memory[ip]].length){
        step(ip, memory);
    }
    return memory;
};
