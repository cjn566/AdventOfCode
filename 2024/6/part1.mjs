import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

let x = 0, y = 0

let goingV = true
let going_UP_Right = true

let lines = input.split('\n').map((line, my) => {
    return line.split('').map((char, mx) => {
        if(char === '^') {
            x = mx
            y = my
            return false
        }
        return char
    })
})
let go = true
while(go){
    if(goingV){
        if(going_UP_Right){
            if(y - 1 < 0){
                go = false
                break
            } else if(lines[y - 1][x] === '#'){
                // Turn right
                goingV = false          
            } else {
                y--
                lines[y][x] = false
            }
        } else {
            if(y + 1 >= lines.length){
                go = false
                break
            } else if(lines[y + 1][x] === '#'){
                // Turn right
                goingV = false     
            } else {
                y++
                lines[y][x] = false
            }
        }
    } else {
        if(going_UP_Right){
            if(x + 1 >= lines[0].length){
                go = false
                break
            } else if(lines[y][x + 1] === '#'){
                // Turn right
                goingV = true
                going_UP_Right = false
            } else {
                x++
                lines[y][x] = false
            }
        } else {
            if(x - 1 < 0){
                go = false
                break
            } else if(lines[y][x - 1] === '#'){
                // Turn right
                goingV = true
                going_UP_Right = true        
            } else {
                x--
                lines[y][x] = false
            }
        }        
    }
}

let result = lines.reduce((sum, line, index) => {
    return sum + line.filter(x => !x).length
}, 0)

console.log(result)

// Answer 1: 4988