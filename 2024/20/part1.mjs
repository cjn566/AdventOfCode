import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let sample = 0

const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), sample ? 'sample.txt' : 'input.txt'), 'utf8')
const start = performance.now()

let sX, sY, eX, eY

let map = input.split('\n').map((line, y) => {
    return line.split('').map((c, x) => {
        switch (c) {
            case 'S':
                sX = x
                sY = y

            case 'E':
                eX = x
                eY = y
        }
        return c
    })
})

let x = sX, y = sY, dir = -1, time = 0, route = [[sY, sX, 0]]

try {
    while (true) {
        time += 1
        for (let i = 0; i < 4; i++) {
            if (dir !== i) {
                let nx = x, ny = y
                if (i % 2) {
                    if (i - 1) { // left
                        nx--
                    } else { // right
                        nx++
                    }
                } else {
                    if (i) { // down
                        ny++
                    } else { // up
                        ny--
                    }
                }
                if (map[ny]?.[nx] === '.') {
                    map[ny][nx] = time
                    route.push([ny, nx, i])
                    x = nx
                    y = ny
                    dir = (i + 2) % 4
                    i = 4
                }
                if (map[ny]?.[nx] === 'E') {
                    map[ny][nx] = time
                    throw true
                }
            }
        }
    }
} catch (e) { }

let shortcuts = {}
let over100 = 0

route.forEach((loc, curr) => {
    let land = []
    land.push(map[loc[0]][loc[1] - 2])
    land.push(map[loc[0]][loc[1] + 2])
    land.push(map[loc[0] - 2]?.[loc[1]])
    land.push(map[loc[0] + 2]?.[loc[1]])
    land.forEach(S => {
        if (S && !isNaN(S) && S - curr > 2) {
            let saved = S - curr - 2
            if(saved >= 100) over100++
            shortcuts[saved] = shortcuts[saved] ? shortcuts[saved] + 1 : 1
            console.log(saved)
        }
    })
})





let result = lines.reduce((sum, num, index) => {
    return sum + 1
}, 0)

console.log(`Execution time: ${performance.now() - start} ms`);
console.log(result)
console.log(result)