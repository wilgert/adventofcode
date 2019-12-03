import {readFile} from '../../common/readFile';
import * as path from "path";

const input = readFile(path.join(__dirname, 'input.txt'));

export interface Point {
    x: number,
    y: number
}

export type Direction = 'U' | 'D' | 'L' | 'R';

export interface Instruction {
    direction: Direction;
    steps: number;
}

export const parseInstruction = (input: string): Instruction => {
    const [, direction, steps] = /([UDLR])(\d+)/gm.exec(input);
    return {direction, steps: parseInt(steps, 10)} as Instruction;
};

export const manhattenDistance = (from: Point, to: Point) => {
    return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
};


function getAddress(currentPoint: Point) {
    return `${currentPoint.x},${currentPoint.y}`;
}

export const wireToGrid = ({grid, closestCross}, wire, wireNumber) => {
    let currentPoint: Point = {x: 0, y: 0};
    let totalSteps = 0;
    for (let i = 0; i < wire.length; i++) {
        const {direction, steps} = wire[i];
        for (let step = 0; step < steps; step++) {
            totalSteps++;
            switch (direction) {
                case "U":
                    currentPoint.y++;
                    break;
                case "L":
                    currentPoint.x--;
                    break;
                case "R":
                    currentPoint.x++;
                    break;
                case "D":
                    currentPoint.y--;
                    break;
            }
            const address = getAddress(currentPoint);
            let existing = grid[address] || {};
            if (wireNumber === 1 && existing[0] !== undefined) {
                let currentTotalSteps = existing[0] + totalSteps;
                closestCross = Math.min(closestCross, currentTotalSteps);
            }
            grid[address] = {...existing, [wireNumber]: totalSteps};
        }
    }
    return {grid, closestCross};
};


export const part1 = (input: string): number => {
    const wires: Array<Instruction[]> = input.split('\n').map(line => {
        let strings = line.split(',');
        return strings.filter(i => !!i).map(instructionStr => parseInstruction(instructionStr));
    });
    return wires.reduce(wireToGrid, {grid: {}, closestCross: Infinity}).closestCross;

};
 part1(input); // ?
