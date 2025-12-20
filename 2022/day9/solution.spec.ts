import { readFile } from "../../common/readFile";
import {part1, part2} from './solution';

const input = readFile(__dirname + "/input.txt");
const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;
// file.only
describe('Part 1', () => {


  it('should return 7 for first two moves', () => {
    expect(part1(example.split('\n').slice(0,2).join('\n'))).toEqual(7);
  });

  it('should return 9 for first three moves', () => {
    expect(part1(example.split('\n').slice(0,3).join('\n'))).toEqual(9);
  });

  it('should return 13 for example', () => {
    expect(part1(example)).toEqual(13);
  });

  it('should return something for input', () => {
    expect(part1(input)).toEqual(5619);
  });

  describe('part 2', () => {
    const example2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

    it('should return one for example', () => {
      expect(part2(example)).toEqual(1);
    })

    it('should return 1 for first line of bigger example', () => {
      expect(part2(example2.split('\n').slice(0,1).join('\n'))).toEqual(1);
    });

    it('should return 1 for first line of bigger example', () => {
      expect(part2(example2.split('\n').slice(0,1).join('\n'))).toEqual(1);
    });

    it('should return 1 for first 2 lines of bigger example', () => {
      expect(part2(example2.split('\n').slice(0,2).join('\n'))).toEqual(1);
    });

    it('should return 1 for first 2 lines of bigger example', () => {
      expect(part2(example2.split('\n').slice(0,2).join('\n'))).toEqual(1);
    });

    it('should return 4 for first 3 lines of bigger example', () => {
      expect(part2(example2.split('\n').slice(0,3).join('\n'))).toEqual(4);
    });

    // it('should return 36 for bigger example', () => {
    //   expect(part2(example2)).toEqual(36);
    // });
  })
})
