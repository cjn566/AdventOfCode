import fs from 'fs'
const input = fs.readFileSync('2024/3/input.txt', 'utf8')

const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g

let match
let sum = 0
let summing = true
while ((match = regex.exec(input)) !== null) {
    if (match[0] === "do()") {
        summing = true
        continue
    } else if (match[0] === "don't()") {
        summing = false
        continue
    } else if(summing) {
        sum += parseInt(match[1]) * parseInt(match[2])
    }
}

console.log(result)

// array.map(line => {
//     let numbers = line.split(' ')
//     array1.push(parseInt(numbers[0]))
//     array2.push(parseInt(numbers[3]))
// })

// array1 = array1.sort((a,b) => a-b)
// array2 = array2.sort((a,b) => a-b)

// let result = array1.reduce((sum, num, index) => {

//     return sum
// }, 0)

// console.log(result)

// Answer 1:
// Answer 2: 