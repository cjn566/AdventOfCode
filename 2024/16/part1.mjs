import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { memoryUsage } from 'node:process';
import { cpuUsage } from 'process';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()

let startx, starty, endx, endy

let map = input.split('\n').map((line, y) => {
    return line.trim().split('').map((char, x) => {
        if (char === 'S') {
            startx = x
            starty = y
        }
        if (char === 'E') {
            endx = x
            endy = y
            return true
        }
        return char === '.'
    })
})

let currentBest = Infinity

let scoresFromStart = new Map()
let scoresToEnd = new Map()

function checkPlot(x, y, fromDir, route, score) {
    if (score > currentBest) return Infinity

    let sfs = scoresFromStart.get(`${x},${y},${fromDir}`)
    if (sfs && sfs <= score) return Infinity
    scoresFromStart.set(`${x},${y},${fromDir}`, score)

    // let sfe = scoresToEnd.get(`${x},${y},${fromDir}`)
    // if (sfe) {
    //     return 
    // }

    route[y][x] = false
    let tryRoutes = [false, false, false, false]
    let straight = (fromDir + 2) % 4
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
            if (!route[ny][nx]) continue
            if (ny == endy && nx == endx) {
                currentBest = Math.min(currentBest, score + (straight === i ? 1 : 1001))
                return (straight === i ? 1 : 1001)
            }
            if (route[ny][nx]) tryRoutes[i] = true
        }
    }
    let multi = false
    if (tryRoutes.filter(x => x).length > 1) multi = true
    let bestScoreToEnd = Infinity
    tryRoutes.forEach((r, i) => {
        if (r) {
            let routeCopy
            if (multi) {
                routeCopy = JSON.parse(JSON.stringify(route))
            }
            let nx = x + ((i % 2) ? ((i - 1) ? -1 : 1) : 0)
            let ny = y + ((i % 2) ? 0 : (i ? 1 : -1))
            checkPlot(nx, ny, (i + 2) % 4, multi ? routeCopy : route, score + (straight === i ? 1 : 1001))
            // let score = endScores.push(checkPlot(nx, ny, (i + 2) % 4, multi ? routeCopy : route, score + (straight === i ? 1 : 1001)))
            // bestScoreToEnd = Math.min(bestScoreToEnd, score)
        }
    })
    // scoresToEnd.set(`${x},${y},${fromDir}`, bestScoreToEnd)
    // return bestScoreToEnd
}

let score = checkPlot(startx, starty, 3, map, 0)


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(score)