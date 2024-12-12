import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()
let startX, startY
let baseMap = input.split('\n').map((line, my) => {
    return line.trim().split('').map((char, mx) => {
        if (char === '^') {
            startX = mx
            startY = my
        }
        return char === '#'
    })
})

const baseMapStr = JSON.stringify(baseMap)

const H = baseMap.length
const W = baseMap[0].length


function runMap(map, buildPath = false) {
    let stops = new Map()
    let steps
    if(buildPath) steps = new Array(H).fill(null).map(x => new Array(W))
    let x = startX, y = startY, dir = 0, T
    while (true) {
        if (dir % 2) { // Left / Right
            T = x + ((dir - 1) ? -1 : 1)
            while (T >= 0 && T < W && !map[y][T]) {
                if(buildPath) steps[y][T] = true
                T += (dir - 1) ? -1 : 1
            }
            x = T + ((dir - 1) ? 1 : -1)
        } else { // Up / Down
            T = y + ((dir ? 1 : -1))
            while (T >= 0 && T < H && !map[T][x]) {
                if(buildPath) steps[T][x] = true
                T += (dir ? 1 : -1)
            }
            y = T + (dir ? -1 : 1)
        }
        if (T < 0 || T >= ((dir % 2) ? W : H)) {
            return (buildPath ? steps : false)
        }
        if(stops.has(`${y},${x},${dir}`)) return true
        stops.set(`${y},${x},${dir}`)
        dir = (dir + 1) % 4
    }
}

let sum = runMap(baseMap, true).reduce((sum, line, y) => {
    return sum + line.filter((_, x) => {
        let tryMap = JSON.parse(baseMapStr)
        tryMap[y][x] = true
        return runMap(tryMap)
    }).length
}, 0)

const end = performance.now()

console.log(`Execution time: ${end - start} ms`);
console.log(sum)