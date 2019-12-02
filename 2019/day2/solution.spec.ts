import {agc, step} from "./solution";
// file.only
describe('AGC', () => {
    it('single step', () => {
        expect(step(0, [1, 0, 0, 0])).toEqual([2, 0, 0, 0]);
        expect(step(0, [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])).toEqual(
            [1, 9, 10, 70,
            2, 3, 11, 0,
            99,
            30, 40, 50]);
        expect(step(4, [1, 9, 10, 70,
            2, 3, 11, 0,
            99,
            30, 40, 50])).toEqual([3500,9,10,70,
            2,3,11,0,
            99,
            30,40,50]);
    });

    it('loop', () => {
        expect(agc([1,9,10,3,2,3,11,0,99,30,40,50])).toEqual([3500,9,10,70,
            2,3,11,0,
            99,
            30,40,50])
    })
});
