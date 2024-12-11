import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()

let blinks = 75

let shortcut = new Array(blinks).fill(null).map(()=>({}))

const S = input.split(' ').map(n => parseInt(n))

let n, sum = 0

function doBlink(n, rem) {
    
    if (!rem) 
        return 1

    if (shortcut[rem - 1][n]) {
        return shortcut[rem - 1][n]
    }

    let childCount = 0, oN = n

    if (!n) {
        n++
    }
    else {
        let str = n.toString()
        if (!(str.length % 2)) {
            n = parseInt(str.substring(0, str.length / 2))
            childCount += doBlink( parseInt(str.substring(str.length / 2)), rem - 1)
        } else {
            n *= 2024
        }
    }
    childCount += doBlink(n, rem - 1)
    shortcut[rem - 1][oN] = childCount
    return childCount
}

S.forEach(stone => {
    sum += doBlink(stone, blinks)
})



console.log(sum)
console.log(`Execution time: ${performance.now() - start} ms`);
console.log('done')
// Answer 1:
// Answer 2: 