import {generatePart1, generatePart2, meetsRulesPart1, meetsRulesPart2} from "./solution";
describe('Password cracker', () => {
    it('meetsRulesPart1', () => {
        expect(meetsRulesPart1(111123)).toBe(true);
        expect(meetsRulesPart1(122345)).toBe(true);
        expect(meetsRulesPart1(223350)).toBe(false);
        expect(meetsRulesPart1(111123)).toBe(true);
        expect(meetsRulesPart1(423456)).toBe(false);
        expect(meetsRulesPart1(123789)).toBe(false);
    });

    it('meetsRulesPart2', () => {
        expect(meetsRulesPart2(111123)).toBe(false);
        expect(meetsRulesPart2(122345)).toBe(true);
        expect(meetsRulesPart2(223350)).toBe(false);
        expect(meetsRulesPart2(111123)).toBe(false);
        expect(meetsRulesPart2(423456)).toBe(false);
        expect(meetsRulesPart2(123789)).toBe(false);
        expect(meetsRulesPart2(111122)).toBe(true);
    });

    it('generatePart1', () => {
        expect(generatePart1(123454, 123456)).toEqual(1);
        expect(generatePart1(123454, 123457)).toEqual(1);
        expect(generatePart1(123554, 123557)).toEqual(2);
    });

    it('generatePart2', () => {
        expect(generatePart2(123454, 123456)).toEqual(1);
        expect(generatePart2(123454, 123457)).toEqual(1);
        expect(generatePart2(222554, 123556)).toEqual(0);
    });
});
