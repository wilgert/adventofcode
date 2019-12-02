import {readFile} from '../../common/readFile';
import * as path from 'path';


const input = readFile(path.join(__dirname, 'input.txt')).split('\n');

class Point {
    constructor(public x: number,
    public y: number) {}



    toString(){
        return `${this.x},${this.y}`;
    }
}

interface Claim {id: number, topLeft: Point, width: number, height: number, points?: Point[]}

function inputToClaim(input: string): Claim {
    const matches = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/.exec(input);
    const [, id, x, y,  width, height] = matches.map(m => parseInt(m, 10));

    const claim = {id, topLeft: new Point(x,y), width, height};

    return {...claim, points: claimToPoints(claim)};
}


function claimToPoints(claim: Claim): Point[] {
    let points = [];

    for(let i = 0; i < claim.width; i++) {
        const x = claim.topLeft.x + i;

        for(let j = 0; j < claim.height; j++){
            const y = claim.topLeft.y + j;
            points.push(new Point(x,y));
        }
    }

    return points;
}

export const overlappingSquares = (input): number => {
    const squares: Map<string, number> = input.reduce((acc: Map<string, number>, value) => {
        const claim = inputToClaim(value);


        claim.points.map(p => p.toString()).forEach(p => {
           let current = acc.get(p) || 0;

           acc.set(p, current+1);
        });

        return acc;
    }, new Map<string, number>());

    return Array.from(squares.values()).filter((x: number) => x > 1).length
};

export const uniqueClaim = (input): number => {
    const claims = input.map(inputToClaim);

    const squares: Map<string, Claim[]> = claims.reduce((acc, claim) => {

        claim.points.map(p => p.toString()).forEach(p => {
            let current = acc.get(p) || [];

            acc.set(p, [...current, claim]);
        });

        return acc;
    }, new Map<number, Claim[]>());

    const squaresAsArray = Array.from(squares.entries());
    const squaresWithSingleClaim = new Map<string, Claim[]>(squaresAsArray.filter(([key, value]) => value.length == 1));
    const foundClaim = claims.find(claim => {
        return claim.points.every((p: Point) => {
            return squaresWithSingleClaim.has(p.toString());
        });
    });

    return foundClaim.id;
};

overlappingSquares(input); /* ? */
uniqueClaim(input); /* ? */
