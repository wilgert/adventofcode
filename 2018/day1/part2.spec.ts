import {device} from './solution';

const splitter = (string) => string.split(', ');

describe('testcases', () => {
   it('1', () => {
       const input = splitter('+1, -1');
       const expected = 0;

       expect(device(input)).toEqual(expected);
   });

    it('2', () => {
        const input = splitter('+3, +3, +4, -2, -4');
        const expected = 10;

        expect(device(input)).toEqual(expected);
    });

    it('3', () => {
        const input = splitter('-6, +3, +8, +5, -6');
        const expected = 5;

        expect(device(input)).toEqual(expected);
    });

    it('4', () => {
        const input = splitter('+7, +7, -2, -7, -4');
        const expected = 14;

        expect(device(input)).toEqual(expected);
    });
});