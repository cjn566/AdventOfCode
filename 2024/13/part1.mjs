import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()
let match
const regex = /(?:Button A: X\+(\d+), Y\+(\d+)\s*Button B: X\+(\d+), Y\+(\d+)\s*Prize: X=(\d+), Y=(\d+))/g


// A = (p_x*b_y - prize_y*b_x) / (a_x*b_y - a_y*b_x)
// B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)

let ax, ay, bx, by, tx, ty, sum = 0
while ((match = regex.exec(input)) !== null) {
    if(performance.now() > 10000) break
    [ax, ay, bx, by, tx, ty] = match.slice(1).map(n => parseInt(n))
    tx += 10000000000000
    ty += 10000000000000
    let A = (tx * by - ty * bx) / (ax * by - ay * bx)
    let B = (ax * ty - ay * tx) / (ax * by - ay * bx)
    if(!(A%1 || B%1))
        sum += A*3 + B
}

console.log(`Execution time: ${performance.now() - start} ms`);
console.log(sum)

// Answer 1:
// Answer 2: 