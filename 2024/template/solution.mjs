import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

let lines = input.split('\n')

lines.map(line => {
    return line
})

let result = lines.reduce((sum, num, index) => {

    return sum 
}, 0)

console.log(result)

// Answer 1: 
// Answer 2: 