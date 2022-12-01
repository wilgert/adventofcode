// file.only
import { part1 } from "./solution";

describe("day12", () => {
  describe("part1", () => {
    it("solves example 1", () => {
      expect(
        part1(`start-A
start-b
A-c
A-b
b-d
A-end
b-end`)
      ).toEqual(10);
    });

    xit("solves example 2", () => {
      expect(
        part1(`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`)
      ).toEqual(19);
    });

    xit("solves example 3", () => {
      expect(
        part1(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`)
      ).toEqual(226);
    });
  });
});
