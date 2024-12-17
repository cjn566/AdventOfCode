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
            x = 2 * mx
            y = my
        }
        switch (char) {
            case '#':
                return ['#', '#']
            case 'O':
                return ['[', ']']
            case '.':
                return ['.', '.']
            case '@':
                return ['@', '.']
        }
    }).flat()
})

let moves = halves[1].trim().replace('\r', '').replace('\n', '').split('')
let queue = new Map()

function commitMoves() {
    queue.forEach(m => {
        map[m[0] + (m[2] ? -1 : 1)][m[1]]     = '['
        map[m[0] + (m[2] ? -1 : 1)][m[1] + 1] = ']'
        map[m[0]][m[1]]     = '.'
        map[m[0]][m[1] + 1] = '.'
    })
}


function canMove(y, x, vert = true, up_right = true) {
    let c = map[y][x]
    switch (c) {
        case '.':
            return true
        case '#':
            return false
        case '[':
        case ']':
            if (vert) {
                let imleft = c === '['
                if (canMove(y + (up_right ? -1 : 1), x, true, up_right) && canMove(y + (up_right ? -1 : 1), x + (imleft ? 1 : -1), true, up_right)) {                    
                    queue.set(`${y},${x + (imleft ? 0 : -1)}`, [y, x + (imleft ? 0 : -1), up_right])
                    return true
                }
            } else {
                if (canMove(y, x + (up_right ? 1 : -1), false, up_right)) {
                    map[y][x + (up_right ? 1 : -1)] = c
                    return true
                }
            }
            return false
        default:
            console.log('wtf')
    }
}

for (let move of moves) {
    switch (move) {
        case '<':
        case '>':
            if (canMove(y, x + (move === '<' ? -1 : 1), false, move === '>')) {
                map[y][x] = '.'
                x += (move === '<' ? -1 : 1)
                map[y][x] = '@'
            }
            break
        case '^':
        case 'v':
            if (canMove(y + (move === '^' ? -1 : 1), x, true, move === '^')) {
                commitMoves()
                map[y][x] = '.'
                y += (move === '^' ? -1 : 1)
                map[y][x] = '@'
            }
            queue.clear()
            break
        default:
            continue
    }
}



let sum = map.reduce((sum, line, y) => {
    return sum + line.reduce((sum, char, x) => {
        if (char === '[') {
            return sum + 100 * y + x
        }
        return sum
    }, 0)
}, 0)

const end = performance.now()

console.log(`Execution time: ${end - start} ms`);
console.log(sum)
console.log(sum)