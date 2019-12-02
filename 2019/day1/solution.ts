import {readFile} from '../../common/readFile';
import * as path from "path";

let input = readFile(path.join(__dirname, 'input.txt'));
let testInput = readFile(path.join(__dirname, 'testInput.txt'));


const massSumPart1 = (input) => {
    return Math.floor(input / 3) - 2;
};

const massSumPart2 = (input) => {
    if(input > 5){
        let result = Math.floor(input / 3) - 2;
        return result + massSumPart2(result);
    } else {
        return 0;
    }
};

input.split('\n')
    .filter(m => !!m)
    .map(massString => parseInt(massString, 10))
    .reduce((sum, mass) => sum + massSumPart2(mass), 0); // ?

// massSumPart2(14); // ?
massSumPart2(1969); // ?
// massSumPart2(100756); // ?
