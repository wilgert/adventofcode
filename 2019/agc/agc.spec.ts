import {agc, getParamModes, opCodes, step} from "./agc";
import {readFile} from "../../common/readFile";
import * as path from "path";
// file.only
describe('AGC', () => {
    describe('opCodes', () => {
        it('1 adds 2 parameters', () => {
            expect(opCodes[1].run({memory: [], params: [2, 3,0], paramModes: [1,1]})).toEqual([5]);
        });

        it('2 multiplies 2 parameters', () => {
            expect(opCodes[2].run({memory: [], params: [2, 3, 0], paramModes: [1,1]})).toEqual([6]);
        });

        it('3 gets input and stores it at parameter address', () => {
            expect(opCodes[3].run({memory:[], params:[2,1]})).toEqual([,2]);
        });

        it('4 gets parameter address and writes to output', () => {
            expect(opCodes[4].run({memory:[0,1,1], params:[2,1]})).toEqual(1);
        });

        it('4 gets parameter address and writes to output', () => {
            expect(opCodes[4].run({memory:[0,1,1], params:[2,1]})).toEqual(1);
        });

        it('5 jumps if true', () => {
            expect(opCodes[5].run({ip: 42, memory:[0,1,1], params:[2,1]})).toEqual(1);
        });

        it('5 does not jump if false', () => {
            expect(opCodes[5].run({ip: 42, memory:[0,1,1], params:[0,1]})).toEqual(42);
        });

        it('6 jumps if false', () => {
            expect(opCodes[6].run({ip: 42, memory:[0,1,1], params:[0,1]})).toEqual(1);
        });

        it('6 does not jump if true', () => {
            expect(opCodes[6].run({ip: 42, memory:[0,1,1], params:[2,1]})).toEqual(42);
        });

        it('7 gets parameter address and writes to output', () => {
            expect(opCodes[4].run({memory:[0,1,1], params:[2,1]})).toEqual(1);
        });
    });

    it('getParamModes', () => {
        expect(getParamModes([102], 0)).toEqual([1,0,0]);
    });

    it('single step', () => {
        expect(step(0, [1, 0, 0, 0])).toEqual([4, [2, 0, 0, 0]]);
        expect(step(0, [1002,4,3,4,33])).toEqual(
            [4,[1002,4,3,4,99]]);
        expect(step(0, [1101,100,-1,4,0])).toEqual(
            [4, [1101,100,-1,4,99]])
        expect(step(0, [101,-114,5,5,,100])).toEqual(
            [4, [101,-114,5,5,,-14]]);

    });

    it('day5', () => {
        let input = readFile(path.join(__dirname, '../day5/input.txt'));

        const initialMemory = input.split(',').map(n => parseInt(n, 10));
        const output = jasmine.createSpy();
        agc(initialMemory, null, null, ()=>5, output);
        console.log(output.calls.mostRecent().args);
    });

    it('input', () => {
        const input = jasmine.createSpy('input').and.returnValue(5);
        expect(step(0, [3,2], input)).toEqual([2, [3,2,5]]);
        expect(input).toHaveBeenCalledTimes(1);
    });

    it('output with position mode', () => {
        const output = jasmine.createSpy('output');
        expect(step(0, [4,2,42], null, output)).toEqual([2,[4,2,42]]);
        expect(output).toHaveBeenCalledWith(42);
    });

    it('loop', () => {
        expect(agc([1,9,10,3,2,3,11,0,99,30,40,50])).toEqual([3500,9,10,70,
            2,3,11,0,
            99,
            30,40,50])
    });

    it('works with jmps and equal using position mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,9,8,9,10,9,4,9,99,-1,8], null, null, () => 8, output);
        expect(output).toHaveBeenCalledWith(1);
        output.calls.reset();
        agc([3,9,8,9,10,9,4,9,99,-1,8 ], null, null, () => 3, output);
        expect(output).toHaveBeenCalledWith(0);
    });

    it('works with jmps and lessThan using position mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,9,7,9,10,9,4,9,99,-1,8], null, null, () => 18, output);
        expect(output).toHaveBeenCalledWith(0);
        output.calls.reset();
        agc([3,9,7,9,10,9,4,9,99,-1,8], null, null, () => 3, output);
        expect(output).toHaveBeenCalledWith(1);
    });

    it('works with jmps and equal using immediate mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,3,1108,-1,8,3,4,3,99], null, null, () => 8, output);
        expect(output).toHaveBeenCalledWith(1);
        output.calls.reset();
        agc([3,3,1108,-1,8,3,4,3,99], null, null, () => 5, output);
        expect(output).toHaveBeenCalledWith(0);
    });

    it('works with jmps and lessThan using immediate mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,3,1107,-1,8,3,4,3,99], null, null, () => 4, output);
        expect(output).toHaveBeenCalledWith(1);
        output.calls.reset();
        agc([3,3,1107,-1,8,3,4,3,99], null, null, () => 9, output);
        expect(output).toHaveBeenCalledWith(0);
    });

    it('jmp test position mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], null, null, () => 0, output);
        expect(output).toHaveBeenCalledWith(0);
        output.calls.reset();
        agc([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], null, null, () => 2, output);
        expect(output).toHaveBeenCalledWith(1);
    });

    it('jmp test position mode', () => {
        const output = jasmine.createSpy('output');
        agc([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], null, null, () => 0, output);
        expect(output).toHaveBeenCalledWith(0);
        output.calls.reset();
        agc([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], null, null, () => 2, output);
        expect(output).toHaveBeenCalledWith(1);
    });
});
