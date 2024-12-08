import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

// let x = 0, y = 0

// let goingV = true
// let going_UP_Right = true

// let lines = input.split('\n').map((line, my) => {
//     return line.split('').map((char, mx) => {
//         if(char === '^') {
//             x = mx
//             y = my
//             return false
//         }
//         return char
//     })
// })
// let go = true
// while(go){
//     if(goingV){
//         if(going_UP_Right){
//             if(y - 1 < 0){
//                 go = false
//                 break
//             } else if(lines[y - 1][x] === '#'){
//                 // Turn right
//                 goingV = false          
//             } else {
//                 y--
//                 lines[y][x] = false
//             }
//         } else {
//             if(y + 1 >= lines.length){
//                 go = false
//                 break
//             } else if(lines[y + 1][x] === '#'){
//                 // Turn right
//                 goingV = false     
//             } else {
//                 y++
//                 lines[y][x] = false
//             }
//         }
//     } else {
//         if(going_UP_Right){
//             if(x + 1 >= lines[0].length){
//                 go = false
//                 break
//             } else if(lines[y][x + 1] === '#'){
//                 // Turn right
//                 goingV = true
//                 going_UP_Right = false
//             } else {
//                 x++
//                 lines[y][x] = false
//             }
//         } else {
//             if(x - 1 < 0){
//                 go = false
//                 break
//             } else if(lines[y][x - 1] === '#'){
//                 // Turn right
//                 goingV = true
//                 going_UP_Right = true        
//             } else {
//                 x--
//                 lines[y][x] = false
//             }
//         }        
//     }
// }

// let result = lines.reduce((sum, line, index) => {
//     return sum + line.filter(x => !x).length
// }, 0)

// console.log(result)

// Answer 1: 4988


let x = 0, y = 0

let goingV = true
let going_UP_Right = true

/*
0 = obstacle
1 = up
2 = right
3 = down
4 = left
5 = potential loop
*/

let OBST=0,UP = 1, RIGHT = 2, DOWN = 3, LEFT = 4,DROP = 5


let lines = input.split('\n').map((line, my) => {
    return line.split('').map((char, mx) => {
        if (char === '^') {
            x = mx
            y = my
            return [false, true, false, false, false, false]
        }
        return [char === '#', false, false, false, false, false]
    })
})
let go = true
while (go) {
    if (goingV) {
        if (going_UP_Right) {
            // ^    1
            if (y - 1 < 0) {
                go = false
                break
            } else if (lines[y - 1][x][OBST]) {
                // >
                goingV = false
                // record new direction
                lines[y][x][RIGHT] = true
            } else {
                // First check if the next space is a spot for a looping obstacle
                let potSpot = lines[y+1][x]
                if (!potSpot.slice(1, 5).some(x => x)) { // Check if the next space hasn't been walked yet
                    
                    // find the next obstacle to the right
                    let line = lines[y].slice(x)
                    let idxNextObst = line.findIndex(x => x[OBST])
                    // if found obstacle
                    if(idxNextObst >= 0){
                        // Check if walked down at the previous spot
                        if(line[idxNextObst - 1][DOWN]){
                            // Set potential loop spot
                            potSpot[DROP] = true
                        }
                    }
                }

                // take a step and record direction
                y--
                lines[y][x][UP] = true
            }
        } else {
            // v    3
            if (y + 1 >= lines.length) {
                go = false
                break
            } else if (lines[y + 1][x][OBST]) {
                // <
                goingV = false
                // record new direction
                lines[y][x][LEFT] = true
            } else {
                // First check if the next space is a spot for a looping obstacle
                let potSpot = lines[y-1][x]
                if (!potSpot.slice(1, 5).some(x => x)) { // Check if the next space hasn't been walked yet                    
                    // find the next obstacle to the LEFT
                    
                    let line = lines[y].slice(0,x+1)
                    let idxNextObst = line.findLastIndex(x => x[OBST])
                    // if found obstacle
                    if(idxNextObst >= 0){
                        // Check if walked down at the previous spot
                        if(line[idxNextObst + 1][UP]){
                            // Set potential loop spot
                            potSpot[DROP] = true
                        }
                    }
                }
                // take a step and record direction
                y++
                lines[y][x][DOWN] = true
            }
        }
    } else {
        if (going_UP_Right) {
            // >    2
            if (x + 1 >= lines[0].length) {
                go = false
                break
            } else if (lines[y][x + 1][OBST]) {
                // v
                goingV = true
                going_UP_Right = false
                // record new direction
                lines[y][x][DOWN] = true
            } else {
                // First check if the next space is a spot for a looping obstacle
                let potSpot = lines[y][x+1]
                if (!potSpot.slice(1, 5).some(x => x)) { // Check if the next space hasn't been walked yet                    
                    // find the next obstacle to the LEFT
                    let line = lines.slice(y).map(r => r[x])
                    let idxNextObst = line.findIndex(x => x[OBST])
                    // if found obstacle
                    if(idxNextObst >= 0){
                        // Check if walked down at the previous spot
                        if(line[idxNextObst - 1][LEFT]){
                            // Set potential loop spot
                            potSpot[DROP] = true
                        }
                    }
                }
                // take a step and record direction
                x++
                lines[y][x][RIGHT] = true
            }
        } else {
            // <    4
            if (x - 1 < 0) {
                go = false
                break
            } else if (lines[y][x - 1][OBST]) {
                // ^
                goingV = true
                going_UP_Right = true
                // record new direction
                lines[y][x][UP] = true
            } else {
                // First check if the next space is a spot for a looping obstacle
                let potSpot = lines[y][x-1]
                if (!potSpot.slice(1, 5).some(x => x)) { // Check if the next space hasn't been walked yet                    
                    // find the next obstacle to the LEFT
                    let line = lines.slice(0, y + 1).map(r => r[x])
                    let idxNextObst = line.findLastIndex(x => x[OBST])
                    // if found obstacle
                    if(idxNextObst >= 0){
                        // Check if walked down at the previous spot
                        if(line[idxNextObst + 1][RIGHT]){
                            // Set potential loop spot
                            potSpot[DROP] = true
                        }
                    }
                }

                // take a step and record direction
                x--
                lines[y][x][LEFT] = true
            }
        }
    }
}

let result = lines.reduce((sum, line, index) => {
    return sum + line.filter(x => x[DROP]).length
}, 0)

console.log(result)

// Answer 2: 