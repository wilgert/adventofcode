import {readFile} from '../../2018/common/readFile';

const input = readFile('day2/input');

input;

const part1 = (input: string)=>{
    const rows = input.split('\n').map(row => row.split(/\s+/g).map(n => parseInt(n, 10)));
    const aggregate = rows.reduce((total, row, idx) =>{
        const max = Math.max(...row);
        const min = Math.min(...row);

        total += max - min;

        return total;
    }, 0);

    return aggregate;
};

let result = part1('5 1 9 5\n' +
    '7 5 3\n' +
    '2 4 6 8');
result;

result = part1(input);

result;

const part2 = (input: string)=>{
    const rows = input.split('\n').map(row => row.split(/\s+/g).map(n => parseInt(n, 10)));
    const aggregate = rows.reduce((total, row, idx) =>{


        total += row.reduce((total, current, idx)=>{
            for(let num of row.slice(idx+1)){
                if(current % num == 0){

                    total += current/num;
                }
                if(num % current == 0){
                    total += num/current;
                }
            }

            return total;
        }, 0);

        return total;
    }, 0);

    return aggregate;
};

result = part2('5 9 2 8\n' +
    '9 4 7 3\n' +
    '3 8 6 5');
result;

result = part2(input);

result;