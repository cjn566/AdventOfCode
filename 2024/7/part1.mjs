import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

function testOps(arr, target, current) {
    let sum = current + arr[0]
    let product = current * arr[0]
    if (arr.length === 1) {
        if (sum === target || product === target) {
            return true
        } else {
            return false
        }
    }
    if (sum <= target) {
        let trySum = testOps(arr.slice(1), target, sum)
        if (trySum) {
            return true
        }
    }
    if(product <= target){
        let tryProduct = testOps(arr.slice(1), target, product)
        if (tryProduct) {
            return true
        }
    }
    return false
}



let lines = input.split('\n').map(line => {
    let a = line.split(':')
    return [parseInt(a[0]), ...a[1].trim().split(' ').map(b => parseInt(b))]
})

let result = lines.reduce((sum, line, index) => {
    let target = line[0]
    let firstValue = line[1]
    let rest = line.slice(2)
    let result = testOps(rest, target, firstValue)
    if (result) {
        return sum + target
    } else {
        return sum
    }
}, 0)

console.log(result)

// Answer 1:
// Answer 2: 