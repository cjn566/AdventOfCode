import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')
let SIZE = 0, ID = 1
let arr = input.split('').map((x, idx) => ([parseInt(x), idx % 2 ? 0 : idx / 2]))


// file ID is idx / 2

let firstAvailHole = 1, fileToMove = arr.length - 1

while (firstAvailHole < fileToMove) {
    let test = firstAvailHole
    let moved = false
    while (test < fileToMove) {
        if (arr[test][SIZE] >= arr[fileToMove][SIZE]) {
            // Found a spot to move the end file

            // Reduce the size of the available spce in the destination hole
            arr[test][SIZE] -= arr[fileToMove][SIZE]

            // combine next hole size with new vacancy and prev hole size, delete prev hole size
            if(arr[fileToMove + 1]) arr[fileToMove + 1][SIZE] += (arr[fileToMove][SIZE] + (arr[fileToMove - 1][SIZE]))
            arr[fileToMove - 1][SIZE] = 0

            // cut out the prev hole and file to move
            let cutBlocks = arr.splice(fileToMove - 1, 2)

            // place these 2 before the hole the file is filling
            arr.splice(test, 0, ...cutBlocks);

            moved = true

            // find the new next available hole
            firstAvailHole = arr.findIndex((e, i) => i >= firstAvailHole && !e[ID] && e[SIZE])
            break
        }
        test += 2
    }
    if(!moved) fileToMove -= 2
}

let result = arr.reduce((acc, x) => {
    if (!x[ID]) {
        acc.idx += x[SIZE]
    } else {
        for (let i = x[SIZE]; i > 0; i--) {
            acc.sum += acc.idx * x[ID]
            acc.idx++
        }
    }
    return acc
}, { sum: 0, idx: 0 })



console.log(result)

// Answer 1:
// Answer 2: 
