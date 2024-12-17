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
            return 'O'
        }
        if (char === 'E') {
            endx = x
            endy = y
            return 'O'
        }
        return char
    })
})

let currentBest = Infinity

let scoresFromStart = new Map()
let scoresToEnd = new Map()
let winningRoutes = []

function checkPlot(x, y, fromDir, route, score) {
    if (score > currentBest) return

    let sfs = scoresFromStart.get(`${x},${y},${fromDir}`)
    if (sfs && sfs < score) return
    scoresFromStart.set(`${x},${y},${fromDir}`, score)

    route[y][x] = 'O'
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
            if (ny == endy && nx == endx) {
                score = score + (straight === i ? 1 : 1001)
                if (score <= currentBest) {
                    currentBest = score
                    winningRoutes.push({ route, score })
                }
                return
            }
            if (route[ny][nx] == '#' || route[ny][nx] == 'O') continue
            if (route[ny][nx] == '.') tryRoutes[i] = true
        }
    }
    let multi = false
    if (tryRoutes.filter(x => x).length > 1) multi = true
    tryRoutes.forEach((r, i) => {
        if (r) {
            let routeCopy
            if (multi) {
                routeCopy = JSON.parse(JSON.stringify(route))
            }
            let nx = x + ((i % 2) ? ((i - 1) ? -1 : 1) : 0)
            let ny = y + ((i % 2) ? 0 : (i ? 1 : -1))
            checkPlot(nx, ny, (i + 2) % 4, multi ? routeCopy : route, score + (straight === i ? 1 : 1001))
        }
    })
}

checkPlot(startx, starty, 3, map, 0)

let numSpotsOnWinningRoutes = winningRoutes.sort((a, b) => a.score - b.score)
    .filter((r, i, A) => r.score === A[0].score)
    .map(G => {
        return G.route.map(ry => {
            return ry.map(rx => {
                return rx === 'O'
            })
        })
    })
    .reduce((Route, wr, i, a) => {
        if (Route) {
            for (let y = 0; y < Route.length; y++) {
                for (let x = 0; x < Route[0].length; x++) {
                    Route[y][x] |=  wr[y][x]
                }
            }
            return Route
        } else return wr
    }, null)
    .reduce((sum, line) => {
        return sum + line.filter(x => x).length
    }, 0)


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(numSpotsOnWinningRoutes)