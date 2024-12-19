import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


let sample = 0

const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), sample ? 'sample.txt' : 'input.txt'), 'utf8')

const start = performance.now()

let size = sample ? 7 : 71

let baseMap = new Array(size).fill(null).map(line => {
    return new Array(size).fill(null).map(x => 1)
})

let bytes = input.split('\n').map((line) => {
    return line.trim().split(',').map(x => parseInt(x))
})

bytes.slice(0, sample ? 12 : 1024).forEach(x => {
    baseMap[x[1]][x[0]] = 0
})

let highOrder = [2, 1, 3, 0]
let lowOrder = [1, 2, 3, 0]

function checkPlot(x, y, fromDir) {
    map[y][x] = 0
    let order = (((x / y) > 1) ? highOrder : lowOrder)
    order.forEach(i => {
        if (fromDir !== i) {
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
            if (!map[ny]?.[nx]) return
            if (ny == (size - 1) && nx == (size - 1)) {
                throw true
            }
            if (map[ny][nx]) {
                checkPlot(nx, ny, (i + 2) % 4)
            }
        }
    })
}

let map
let worked = false
let i = (sample ? 12 : 1024) - 1
do {    
    i++
    worked = false
    baseMap[bytes[i][1]][bytes[i][0]] = 0
    map = JSON.parse(JSON.stringify(baseMap))
    try {
        checkPlot(0, 0, -1, map, 0)
    } catch (x) {
        worked = true
    }
} while(worked)


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(bytes[i])