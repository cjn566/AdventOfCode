import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()
let match
const regex = /(?:p=([+-]?\d+),([+-]?\d+)\sv=([+-]?\d+),([+-]?\d+))/g

const W = 101, H = 103, t = 100
// const W = 11, H = 7, t = 100
const midX = (W - 1)/2
const midY = (H - 1)/2
let px, py, vx, vy, dx, dy, q0 = 0, q1 = 0, q2 = 0, q3 = 0, cX = 0, cY = 0
while ((match = regex.exec(input)) !== null) {
    if(performance.now() > 10000) break
    [px, py, vx, vy] = match.slice(1).map(n => parseInt(n))
    dx = (((px + vx*t) % W) + W) % W
    dy = (((py + vy*t) % H) + H) % H
    if(dx < midX){
        if(dy < midY){
            q0++
        } else if(dy > midY){
            q3++
        } else cY++
    } else if(dx > midX){
        if(dy < midY){
            q1++
        } else if(dy > midY){
            q2++
        }  else cY++
    } else cX++
}

let sum = q0*q1*q2*q3

console.log(`Execution time: ${performance.now() - start} ms`);
console.log(sum)

// Answer 1:
// Answer 2: 