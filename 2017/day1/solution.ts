import {readFile} from '../../common/readFile';

const input = readFile('day1/input');

input;

const part1 = (input: string)=>{
    const parts = input.split('').map(n => parseInt(n, 10));
    const aggregate = parts.reduce((agg, current, idx) =>{
        if(agg.previous == current){
            agg.total += current;
        }

        agg.previous = current;
        return agg;
    }, {total: 0, previous: parts[parts.length -1] });

    return aggregate.total;
};

let result = part1('1122');
result;

result = part1('1111');
result;

result = part1('1234');
result;

result = part1('91212129');
result;

result = part1(input);

result;

const part2 = (input: string)=>{
    const parts = input.split('').map(n => parseInt(n, 10));
    const length = parts.length;
    const steps = length / 2;

    const result = parts.reduce((total, current, idx) =>{
        if(current == parts[(idx + steps) % length]){
            total += current;
        }
        return total;
    }, 0);

    return result;
};

result = part2('1212');
result;

result = part2('1221');
result;

result = part2('123425');
result;

result = part2('123123');
result;

result = part2('12131415');
result;

result = part2(input);

result;
