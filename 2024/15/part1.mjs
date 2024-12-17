import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()

const halves = input.split('\n\r\n')

let startX, startY, x, y
let map = halves[0].split('\n').map((line, my) => {
    return line.trim().split('').map((char, mx) => {
        if (char === '@') {
            x = mx
            y = my
        }
        return char
    })
})
const mapStr = JSON.stringify(map)
const H = map.length
const W = map[0].length

const moves = halves[1].trim().replace('\r', '').replace('\n', '').split('')


for (let move of moves) {
    let dx = 0, dy = 0
    switch (move) {
        case '<':
        case '>':
            dx = move === '<' ? -1 : 1
            break
        case '^':
        case 'v':
            dy = move === '^' ? -1 : 1
            break
        default:
            continue
    }
    let tx = x + dx, ty = y + dy
    let T = map[ty][tx]
    let box = false
    while(T !== '#' && T !== '.'){
        T = map[ty += dy][tx += dx]
        box = true
    }
    if(T === '.') {
        map[y][x] = '.'
        x += dx
        y += dy
        map[y][x] = '@'
        if(box){
            map[ty][tx] = 'O'
        }
    }
}



let sum = map.reduce((sum, line, y) => {
    return sum + line.reduce((sum, char, x) => {
        if(char === 'O'){
            return sum + 100*y + x
        }
        return sum
    }, 0)
}, 0)

const end = performance.now()

console.log(`Execution time: ${end - start} ms`);
console.log(sum)