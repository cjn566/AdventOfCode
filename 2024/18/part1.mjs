import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


let sample = 0

const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), sample? 'sample.txt' : 'input.txt'), 'utf8')

const start = performance.now()

let size = sample ? 7 : 71

let startx = 0, starty = 0
let endx = size, endy = size

let map = new Array(size).fill(null).map(line => {
    return new Array(size).fill(null).map(x => true)
})

let bytes = input.split('\n').map((line) => {
    return line.trim().split(',').map(x => parseInt(x))
})

bytes.slice(0, sample? 12 : 1024).forEach(x => {    
    map[x[1]][x[0]] = false
})

let currentBest = Infinity

let scoresFromStart = new Map()
let scoresToEnd = new Map()

function checkPlot(x, y, fromDir, route, score) {
    if (score > currentBest) return Infinity

    let sfs = scoresFromStart.get(`${x},${y}`)
    if (sfs && sfs <= score) return Infinity
    scoresFromStart.set(`${x},${y}`, score)

    // let sfe = scoresToEnd.get(`${x},${y}`)
    // if (sfe) {
        
    //     currentBest = Math.min(currentBest, score + 1)
    //     return score + sfe
    // }

    route[y][x] = false
    let tryRoutes = [false, false, false, false]
    for (let i = 0; i < 4; i++) {
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
            if (!route[ny]?.[nx]) continue
            if (ny == (size - 1) && nx == (size - 1)) {
                scoresToEnd.set(`${x},${y}`, 1)
                currentBest = Math.min(currentBest, score + 1)
                return 1
            }
            if (route[ny][nx]) tryRoutes[i] = true
        }
    }
    let multi = false
    if (tryRoutes.filter(x => x).length > 1) multi = true
    let endRoutes = tryRoutes.map((r, i) => {
        if (r) {
            let routeCopy
            if (multi) {
                routeCopy = JSON.parse(JSON.stringify(route))
            }
            let nx = x + ((i % 2) ? ((i - 1) ? -1 : 1) : 0)
            let ny = y + ((i % 2) ? 0 : (i ? 1 : -1))
            return checkPlot(nx, ny, (i + 2) % 4, multi ? routeCopy : route, score + 1) + 1
        }
        return Infinity
    }).sort((a, b) => a - b)
    let bestRoute = endRoutes[0]
    scoresToEnd.set(`${x},${y}`, bestRoute)
    return bestRoute
}

let score = checkPlot(0, 0, -1, map, 0)


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(currentBest)