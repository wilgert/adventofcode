import * as fs from 'fs';


export function readFile(filePath: string){
    return fs.readFileSync(filePath, 'utf-8').toString();
}