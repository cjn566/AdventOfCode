import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

let dir = 0, sum = 0, sim = false, first = true, x, y, sx, sy, sd, T, stops = [], startX, startY

const start = performance.now()

let lines = input.split('\n').map((line, my) => {
    return line.split('').map((char, mx) => {
        if (char === '^') {
            x = mx
            y = my
            startX = mx
            startY = my
        }
        return char === '#'
    })
})

function simulate() {
    sim = true
    first = true
    if (dir % 2) {
        sy = y
        sx = T
    } else {
        sy = T
        sx = x
    }
    stops.push([sy, sx])
    sd = dir
    lines[sy][sx] = true
    // console.log(`sim from y:${y} x:${x} d:${dir % 2 ? dir - 1 ? '<' : '>' : dir ? 'v' : '^'}`)
}

function endSim(loop) {
    sum += loop
    stops = []
    sim = false
    x = sx
    y = sy
    dir = sd
    lines[sy][sx] = false
}

const lastY = lines.length - 1
const lastX = lines[0].length - 1

while (true) {
    // if (performance.now() - start > 500) break
    if (dir % 2) { // Left / Right
        // (dir-1) == Left
        T = x
        while (T >= 0 && T <= lastX && !lines[y][T]) {
            if (!sim && T !== x) {
                simulate()
                break
            }
            T += (dir - 1) ? -1 : 1
            //console.log(`step ${dir - 1 ? '<' : '>'} to y:${y + 1} x:${T + 1}`)
        }
        x = T + ((dir - 1) ? 1 : -1)
    } else { // Up / Down
        // dir == Down
        T = y
        while (T >= 0 && T <= lastY && !lines[T][x]) {
            if (!sim && T !== y) {
                simulate()
                break
            }
            T += (dir ? 1 : -1)
            //console.log(`step ${dir ? 'v' : '^'} to y:${T + 1} x:${x + 1}`)
        }
        y = T + (dir ? -1 : 1)
    }
    if (T < 0 || T > ((dir % 2) ? lastX : lastY)) {
        if (sim) {
            endSim(0)
            continue
        }
        else {
            break
        }
    }
    if (sim) {
        if (first) {
            first = false
        } else if (stops.filter(stop => stop[0] == y && stop[1] == x).length > 1) {
            if(sx === startX && sy === startY){
                console.log('fuck')
            } else {
                endSim(1)
            }
            continue
        }
        stops.push([y, x])
    }
    dir = (dir + 1) % 4
}

const end = performance.now()

console.log(`Execution time: ${end - start} ms`);
console.log(sum)