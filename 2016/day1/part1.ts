export interface Instruction {
    turn: 'L'|'R';
    steps: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface State {
    x: number,
    y: number,
    heading: Direction,
}

export enum Direction {
    North,
    East,
    South,
    West
}

const test1 = 'R2, L3';
const test2 = 'R2, R2, R2';
const test3 = 'R5, L5, R5, R3';

const input = 'R4, R4, L1, R3, L5, R2, R5, R1, L4, R3, L5, R2, L3, L4, L3, R1, R5, R1, L3, L1, R3, L1, R2, R2, L2, R5, L3, L4, R4, R4, R2, L4, L1, R5, L1, L4, R4, L1, R1, L2, R5, L2, L3, R2, R1, L194, R2, L4, R49, R1, R3, L5, L4, L1, R4, R2, R1, L5, R3, L5, L4, R4, R4, L2, L3, R78, L5, R4, R191, R4, R3, R1, L2, R1, R3, L1, R3, R4, R2, L2, R1, R4, L5, R2, L2, L4, L2, R1, R2, L3, R5, R2, L3, L3, R3, L1, L1, R5, L4, L4, L2, R5, R1, R4, L3, L5, L4, R5, L4, R5, R4, L3, L2, L5, R4, R3, L3, R1, L5, R5, R1, L3, R2, L5, R5, L3, R1, R4, L5, R4, R2, R3, L4, L5, R3, R4, L5, L5, R4, L4, L4, R1, R5, R3, L1, L4, L3, L4, R1, L5, L1, R2, R2, R4, R4, L5, R4, R1, L1, L1, L3, L5, L2, R4, L3, L5, L4, L1, R3';

export const splitter = (instruction: string)=> {const [m,turn, steps] = instruction.match(/([LR])(\d*)/m); return {turn, steps:parseInt(steps, 10)}; };

const distance = (location) => Math.abs(location.x) + Math.abs(location.y);

export const parse = (input: string): Instruction[] =>{
    return input.split(', ').map(splitter);
};

export const part1 = (input) => {
    const state = parse(input).reduce(reducer, {x: 0, y: 0, heading: Direction.North});
    state;
    return distance(state);
};

export const part2 = (input) => {
    const instructions = parse(input);

    const visited = [];
    let state = {x: 0, y: 0, heading: Direction.North};

    for(let i = 0; i < instructions.length; i++){
        let newState = reducer(state, instructions[i]);

        if(myIndexOf({x: state.x, y: state.y}, visited) !== -1){
            console.log(state);
            break;
        }

        visited.push({x: state.x, y: state.y});
        state = newState;
    }
    console.log(visited);
    console.log(state)
    console.log(distance(state));
    return distance(state);
};

const range = function(start, stop, step) {
    if (stop == null) {
        stop = start || 0;
        start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
    }

    return range;
};

export const move = (oldState, newState, visited) => {
    if(oldState.y !== newState.y){
        moveCoord(oldState, newState, visited, 'y', 'x');
    }
    if(oldState.x !== newState.x){
        moveCoord(oldState, newState, visited, 'x', 'y');
    }
};

export const moveCoord = (oldState, newState, visited, changedCoord, stableCoord) =>{


    let r = range(oldState[changedCoord], newState[changedCoord], oldState[changedCoord] < newState[changedCoord] ? 1 : -1 );

    for(let position of r){
        let thingy = {};
        thingy[changedCoord] = oldState[changedCoord] + position;
        thingy[stableCoord] = newState[stableCoord];
        visited.push(thingy);
    };
};

function myIndexOf(o, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].x == o.x && arr[i].y == o.y) {
            return i;
        }
    }
    return -1;
}

export const reducer = (state: State, instruction: Instruction): State => {
    const newState = Object.assign({}, state);

    newState.heading = calculateHeading(state.heading, instruction.turn);

    switch(newState.heading){
        case Direction.North:
            newState.y += instruction.steps;
            break;
        case Direction.East:
            newState.x += instruction.steps;
            break;
        case Direction.South:
            newState.y -= instruction.steps;
            break;
        case Direction.West:
            newState.x -= instruction.steps;
            break;
    }

    return newState;
};

const calculateHeading = (oldDirection: Direction, turn: 'L'|'R'): Direction =>{
    switch(oldDirection){
        case Direction.North:
            return turn === 'L' ? Direction.West : Direction.East;
        case Direction.East:
            return turn === 'L' ? Direction.North : Direction.South;
        case Direction.South:
            return turn === 'L' ? Direction.East : Direction.West;
        case Direction.West:
            return turn === 'L' ? Direction.South : Direction.North;
        default:
            return Direction.North;
    }
};

const part1 = part1(input);

part1;

const part2  = part2(input);

console.log(part2);
