import fs from 'fs'
const input = fs.readFileSync('2024/4/input.txt', 'utf8')

let rows = input.split('\n')

let count = 0

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (rows[i]?.[j] === 'A') {
            if (rows[i - 1]?.[j - 1] === 'M') {
                if (rows[i + 1]?.[j + 1] === 'S') {
                    if (rows[i - 1]?.[j + 1] === 'M') {
                        if (rows[i + 1]?.[j - 1] === 'S') {
                            count++
                        }
                    } else if (rows[i - 1]?.[j + 1] === 'S') {
                        if (rows[i + 1]?.[j - 1] === 'M') {
                            count++
                        }
                    }
                }
            } else if (rows[i - 1]?.[j - 1] === 'S') {
                if (rows[i + 1]?.[j + 1] === 'M') {
                    if (rows[i - 1]?.[j + 1] === 'M') {
                        if (rows[i + 1]?.[j - 1] === 'S') {
                            count++
                        }
                    } else if (rows[i - 1]?.[j + 1] === 'S') {
                        if (rows[i + 1]?.[j - 1] === 'M') {
                            count++
                        }
                    }
                }
            }
        }
    }
}
        console.log(count)



// for (let i = 0; i < rows.length; i++) {
//     for (let j = 0; j < rows[i].length; j++) {
//         if (rows[i]?.[j] === 'X') {
//             if (rows[i - 1]?.[j - 1] === 'M' && rows[i - 2]?.[j - 2] === 'A' && rows[i - 3]?.[j - 3] === 'S') {
//                 count++
//             }
//             if (rows[i - 1]?.[j] === 'M' && rows[i - 2]?.[j] === 'A' && rows[i - 3]?.[j] === 'S') {
//                 count++
//             }
//             if (rows[i - 1]?.[j + 1] === 'M' && rows[i-2]?.[j + 2] === 'A' && rows[i-3]?.[j + 3] === 'S') {
//                 count++
//             }
//             if (rows[i]?.[j - 1] === 'M' && rows[i]?.[j - 2] === 'A' && rows[i]?.[j - 3] === 'S') {
//                 count++
//             }
//             if (rows[i]?.[j + 1] === 'M' && rows[i]?.[j + 2] === 'A' && rows[i]?.[j + 3] === 'S') {
//                 count++
//             }
//             if (rows[i + 1]?.[j - 1] === 'M' && rows[i + 2]?.[j - 2] === 'A' && rows[i + 3]?.[j - 3] === 'S') {
//                 count++
//             }
//             if (rows[i + 1]?.[j] === 'M' && rows[i + 2]?.[j] === 'A' && rows[i + 3]?.[j] === 'S') {
//                 count++
//             }
//             if (rows[i + 1]?.[j + 1] === 'M' && rows[i + 2]?.[j + 2] === 'A' && rows[i + 3]?.[j + 3] === 'S') {
//                 count++
//             }
//         }
//     }
// }
// Answer 1: 2655
// Answer 2: 