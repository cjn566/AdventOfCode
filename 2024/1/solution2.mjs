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
    return sum + num*array2.filter(num2 => num2 == num).length
}, 0)

console.log(result)

// Answer 2: 22962826