import {hasDouble, hasTriple} from './part1';

const testCases = [
    {str: 'abcdef', double: false, triple: false},
    {str: 'bababc', double: true, triple: true},
    {str: 'abbcde', double: true, triple: false},
    {str: 'abcccd', double: false, triple: true},
    {str: 'aabcdd', double: true, triple: false},
    {str: 'abcdee', double: true, triple: false},
    {str: 'ababab', double: false, triple: true}
];

describe('comparer', () => {
    testCases.forEach(({str, double, triple}) => {
        it(`${str} has double`, () => {
            expect(hasDouble(str)).toEqual(double);
        });

        it(`${str} has triple`, () => {
            expect(hasTriple(str)).toEqual(triple, `${str} should have triple ${triple}`);
        });
    });
});