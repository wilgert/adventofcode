import {getRing, part1} from './solution';

describe('day3',()=>{
    describe('part1',()=>{
        it('calculates some simple inputs', ()=>{
            expect(part1(1)).toEqual(1);
            expect(part1(12)).toEqual(3);
            expect(part1(23)).toEqual(2);
            expect(part1(1024)).toEqual(31);
        });
    })

});

