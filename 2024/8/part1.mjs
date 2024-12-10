import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')
let lines = input.split('\n')

let nodes = {}
let antinodes = new Map()
let COL = 1, ROW = 0

lines.forEach((line, row) => {
    line.trim().split('').forEach((char, col) => {
        if (char !== '.') {
            nodes[char] = (nodes[char] ?? []).concat([[row, col]])
        }
    })
})

function findGCF(a, b) {
    while(b) {
        let t = b
        b = a % b
        a = t
    }
    return a
}

Object.keys(nodes).forEach(nodetype => {
    let N = nodes[nodetype]
    for(let i = 0; i < N.length - 1; i++) {
        for(let j = i + 1; j < N.length; j++) {
            let first = N[i]
            let second = N[j]
            let dY = (first[COL] - second[COL])
            let dX = (first[ROW] - second[ROW])
            let GCF = findGCF(dX, dY)
            dX /= GCF
            dY /= GCF
            let target = [first[ROW], first[COL]]
            while(target[ROW] >= 0 && target[ROW] < 50 && target[COL] >= 0 && target[COL] < 50) {
                antinodes.set(JSON.stringify(target))
                target[ROW] += dX
                target[COL] += dY
            }            
            target = [first[ROW] - dX, first[COL] - dY]
            while(target[ROW] >= 0 && target[ROW] < 50 && target[COL] >= 0 && target[COL] < 50) {
                antinodes.set(JSON.stringify(target))
                target[ROW] -= dX
                target[COL] -= dY
            }
        }
    }
})

let result = lines.reduce((sum, num, index) => {

    return sum 
}, 0)

console.log(result)

// Answer 1: 