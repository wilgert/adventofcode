// import {Direction, Instruction, move, part1, part2, reducer, splitter, State} from "./part1";
//
// describe('part1', ()=>{
//     it('test1', ()=>{
//         expect(part1('R2, L3')).toEqual(5);
//     });
//
//     it('test2', ()=>{
//         expect(part1('R2, R2, R2')).toEqual(2);
//     });
//
//     it('test6', ()=>{
//         expect(part1('R20, R20, R20')).toEqual(20);
//     });
//
//     it('test3', ()=>{
//         expect(part1('R5, L5, R5, R3')).toEqual(12);
//     });
//
//     it('test5', ()=>{
//         // expect(createGraph('R2, R2, R2, R2')).toEqual(0);
//         expect(part1('L2, L2, L2, L2')).toEqual(0);
//     });
// });
//
// describe('the splitter', ()=>{
//    it('splits', () => expect(splitter('L5')).toEqual({turn: 'L', steps: 5}));
// });
//
// fdescribe('part2', ()=>{
//     it('works', ()=>{
//         expect(part2('R8, R4, R4, R8')).toEqual(4)
//     })
// });
//
// describe('move', ()=>{
//     it('stores all visited positions', ()=>{
//         let visited = [];
//         move({x: 0, y: 0}, {x: 0, y: 2}, visited)
//         expect(visited).toEqual([{x: 0, y: 1}, {x: 0, y: 2}]);
//     })
// });
//
// describe('reducer', ()=>{
//     it('goes west', ()=>{
//         let state: State = {x: 0, y: 0, heading: Direction.North};
//         let instruction: Instruction = {turn: "L", steps: 2};
//
//         expect(reducer(state, instruction)).toEqual({
//             x:-2,
//             y: 0,
//             heading: Direction.West
//         });
//     });
//
//     it('goes east', ()=>{
//         let state: State = {x: 0, y: 0, heading: Direction.North};
//         let instruction: Instruction = {turn: "R", steps: 2};
//
//         expect(reducer(state, instruction)).toEqual({
//             x: 2,
//             y: 0,
//             heading: Direction.East
//         });
//     });
//
//     it('goes east', ()=>{
//         let state: State = {x: 0, y: 0, heading: Direction.North};
//         let instruction: Instruction = {turn: "R", steps: 2};
//
//         expect(reducer(state, instruction)).toEqual({
//             x: 2,
//             y: 0,
//             heading: Direction.East
//         });
//     });
//   });
