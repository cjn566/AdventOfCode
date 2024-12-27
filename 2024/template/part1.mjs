import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let sample = 0

const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), sample? 'sample.txt' : 'input.txt'), 'utf8')
const start = performance.now()

let map = input.split('\n').map(line => {
    return line.split('').map(x => parseInt(x))
})







let result = lines.reduce((sum, num, index) => {
    return sum + 1
}, 0)

console.log(`Execution time: ${performance.now() - start} ms`);
console.log(result)
console.log(result)