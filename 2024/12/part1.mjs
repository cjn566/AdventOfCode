import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()

let map = input.split('\n').map((line, y) => {
    return line.trim().split('').map((char, x) => {
        return {
            char,
            checked: false
        }
    })
})

const H = map.length
const W = map[0].length

function checkPlot(x, y, fromDir, char) {
    map[y][x].checked = true
    let area = 1
    for (let i = 0; i < 4; i++) {
        if (fromDir !== i) {
            let nx = x, ny = y
            if (i % 2) {
                if (i - 1) { // left
                    nx--
                } else { // right
                    nx++
                }

                if (!(map[ny][nx]?.char == char)) {
                    wallMap[0][i - 1 ? x : x + 1][y] = true
                    continue // OOB
                }
            } else {
                if (i) { // down
                    ny++
                } else { // up
                    ny--
                }

                if (!(map[ny]?.[nx].char == char)) {
                    wallMap[1][i ? ny : y][x] = true
                    continue // OOB
                }
            }
            if (map[ny][nx].checked) continue
            area += checkPlot(nx, ny, (i + 2) % 4, char)
        }
    }
    return area
}

function blankWallMap() {
    return [
        new Array(W + 1).fill(null).map(_ => new Array(H + 1).fill(false)),
        new Array(H + 1).fill(null).map(_ => new Array(W + 1).fill(false))
    ]
}
let wallMap

let result = map.reduce((sum, line, y) => {
    let lineSum = line.reduce((ugh, plot, x) => {
        if (!plot.checked) {
            wallMap = blankWallMap()
            let region = checkPlot(x, y, -1, plot.char)
            let wallCount = 0
            wallMap.forEach((ori, o) => {
                ori.forEach((line, D1) => {
                    let prevW = false
                    line.forEach((w, D2) => {
                        if (w !== prevW) { // wall just changed
                            if (w) wallCount++ // wall started
                        } else if (w) { // wall continues
                            if (wallMap[+!o][D2][D1]) wallCount++ // wall crosses
                        }
                        prevW = w
                    })
                })
            })
            ugh += region * wallCount
        }
        return ugh
    }, 0)
    return sum + lineSum
}, 0)


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(result)