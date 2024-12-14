import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()
let match
const regex = /(?:p=([+-]?\d+),([+-]?\d+)\sv=([+-]?\d+),([+-]?\d+))/g

const W = 101, H = 103
let robots = []

while ((match = regex.exec(input)) !== null) {
    if (performance.now() > 10000) break
    robots.push(match.slice(1).map(n => parseInt(n)))
}

robots.map(r => {
    return [...r, null, null]
})

let locations = new Set()
let i = 1, minVar = Infinity, minI = Infinity

for (i = 1; i < 10000; i++) {
    robots.forEach(bot => {
        bot[0] += bot[2]
        bot[1] += bot[3]
        if(bot[0] < 0 ) bot[0] += W
        if(bot[0] >= W) bot[0] -= W
        if(bot[1] < 0 ) bot[1] += H
        if(bot[1] >= H) bot[1] -= H
        bot[4] = (bot[0] - 50)*( bot[0] - 50)
        bot[5] = (bot[1] - 50)*( bot[1] - 50)
    })

    let vars = robots.reduce((acc, r) => {
        acc[0] += r[4]
        acc[1] += r[5]
        return acc
    }, [0,0])
    vars[0] /= robots.length
    vars[1] /= robots.length
    let totalVar = vars[0] + vars[1]

    if(totalVar < minVar){
        minVar = totalVar
        minI = i
   }

    locations.clear()
}


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(i)

// Answer 1:
// Answer 2: 