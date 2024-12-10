import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

let blocks = input.split('').map(x => parseInt(x))


// file ID is idx / 2

let start = 0, end = blocks.length - 1, checksum = {idx: 0, sum: 0}, rem = blocks[end]

while ( start < end){
    for(let i = blocks[start] - 1; i >= 0 ; i--){
        checksum.sum += (start / 2) * checksum.idx
        checksum.idx++
    }
    start++
    for(let i = blocks[start] - 1; i >= 0 ; i--){
        checksum.sum += (end / 2) * checksum.idx
        rem--
        if(!rem){
            end -= 2
            rem = blocks[end]
        }
        checksum.idx++
    }
    start++
}

while(rem){
    checksum.sum += (end / 2) * checksum.idx
    checksum.idx++
    rem--
}

console.log(result)

// Answer 1: 
// Answer 2: 
