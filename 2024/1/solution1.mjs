import fs from 'fs'
const input = fs.readFileSync('2024/1/input.txt', 'utf8')
console.log(input)

let array = input.split('\n')
let array1 = [], array2 = []
array.map(line => {
    let numbers = line.split(' ')
    array1.push(parseInt(numbers[0]))
    array2.push(parseInt(numbers[3]))
})

array1 = array1.sort((a,b) => a-b)
array2 = array2.sort((a,b) => a-b)

let result = array1.reduce((sum, num, index) => {
    return sum + Math.abs(num - array2[index])
}, 0)

console.log(result)

// Answer: 2192892