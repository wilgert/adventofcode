import { manhattenDistance, parseInstruction, createGraph, wireToGrid} from "./solution";
describe('Manhatten distance again', () => {
    it('manhattenDistance', () => {
        expect(manhattenDistance({x:0, y:0}, {x: 3, y:3})).toEqual(6);
        expect(manhattenDistance({x:0, y:0}, {x: 4, y:3})).toEqual(7);
    });

    it('parseInstruction', () => {
            expect(parseInstruction('R4')).toEqual({ direction: 'R', steps: 4});
            expect(parseInstruction('D24')).toEqual({ direction: 'D', steps: 24});
        }
    );

    xit('wireToGrid', () => {
       expect(wireToGrid({grid: {}, closestCross: Infinity}, [{direction: 'U', steps: 2}], 0))
           .toEqual({grid: {'0,1': [0], '0,2': [0]}, closestCross: Infinity});
        expect(wireToGrid({grid: {}, closestCross: Infinity}, [{direction: 'R', steps: 2}], 0))
            .toEqual({grid: {'1,0': [0], '2,0': [0]}, closestCross: Infinity});
        expect(wireToGrid({grid: {}, closestCross: Infinity}, [{direction: 'U', steps: 2},{direction: 'R', steps: 2}], 0))
            .toEqual({grid: {'0,1': [0], '0,2': [0], '1,2': [0], '2,2': [0]}, closestCross: Infinity});
    });

    it('part1', () => {
        expect(createGraph('R8,U5,L5,D3\nU7,R6,D4,L4')).toEqual(30);
    });
});
