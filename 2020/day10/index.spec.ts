import {goA, goB, test} from "./index";
// file.only
fdescribe('day6', () => {
  describe('goA', () => {
    it('returns 0 for an empty array', () => {
      expect(goA([])).toEqual(0);
    });
  });

  describe('goB', () => {
    it('returns 0 for an empty array', () => {
      expect(goB([])).toEqual(0);
    });
  });
});
