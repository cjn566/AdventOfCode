import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

let prevLine, prevPlace, thisPlace, dH, trailheads = []
let grid = input.split('\n').map((line, y) => {
    prevPlace = null
    let thisLine = line.trim().split('').map((height, x) => {
        thisPlace = {
            height: parseInt(height),
            higher: []
        }
        if (!thisPlace.height) trailheads.push(thisPlace)
        dH = thisPlace.height - prevPlace?.height
        if (dH === 1) {
            prevPlace.higher.push(thisPlace)
        } else if (dH === -1) {
            thisPlace.higher.push(prevPlace)
        }
        let up = prevLine?.[x]
        if (up) {
            dH = thisPlace.height - up.height
            if (dH === 1) {
                up.higher.push(thisPlace)
            } else if (dH === -1) {
                thisPlace.higher.push(up)
            }
        }
        prevPlace = thisPlace
        return thisPlace
    })
    prevLine = thisLine
    return thisLine
})

function followTrail(place) {
    if(place.height === 9) return [place]
    let peaks = []
    place.higher.forEach(up => {
        peaks.push(...followTrail(up))
    })
    return peaks
}

let sum = 0
trailheads.forEach(th => {
    sum += followTrail(th).length
})


console.log(sum)

// Answer 1:
// Answer 2: 