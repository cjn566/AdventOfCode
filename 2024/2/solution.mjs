import fs from 'fs'
const input = fs.readFileSync('2024/2/input.txt', 'utf8')

let array = input.split('\n')

let array1 = [], array2 = []

array = array.map(line => {
    let ret = line.split(' ').map(num => parseInt(num))
    return ret
})


function checkIsSafe(numbers) {
    let desc = null
    for (let i = 1; i < numbers.length; i++) {
        if (desc == null) {
            let d = numbers[i] - numbers[i - 1]
            if (d == 0 || Math.abs(d) > 3) {
                return false
            }
            desc = d < 0
        } else {
            let d = numbers[i] - numbers[i - 1]
            if (desc) {
                if (d >= 0 || d < -3) {

                    return false
                }
            } else {
                if (d <= 0 || d > 3) {

                    return false
                }
            }
        }
    }
    return true
}


let result = array.reduce((sum, numbers, index) => {
    
    let safe = checkIsSafe(numbers)
    let x = 0
    while (!safe) {
        if (x >= numbers.length) {
            break
        }
        let subset = numbers.slice()
        subset.splice(x, 1)
        safe = checkIsSafe(subset)
        x++
    }

    

    return sum + (safe ? 1 : 0)
}, 0)

console.log(result)

// Answer 1: 510
// Answer 2: 553