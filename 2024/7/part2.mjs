import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

function testOps(arr, target, current) {
    let sum = current + arr[0]
    let product = current * arr[0]
    let concat = parseInt('' + current + arr[0])
    if (arr.length === 1) {
        return (sum === target || product === target || concat === target)
    }
    return (sum <= target && testOps(arr.slice(1), target, sum)) || (product <= target && testOps(arr.slice(1), target, product) || (concat <= target && testOps(arr.slice(1), target, concat)))
}



let result = input.split('\n').map(line => {
    let a = line.split(':')
    return [parseInt(a[0]), ...a[1].trim().split(' ').map(b => parseInt(b))]
}).reduce((sum, line, index) => {
    return sum + (testOps(line.slice(2), line[0], line[1]) ? line[0] : 0)
}, 0)

console.log(result)

// Answer 1:
// Answer 2: 