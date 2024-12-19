import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from 'console';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'sample.txt'), 'utf8')
const start = performance.now()

let A = parseInt(/A: (\d+)/.exec(input)[1])
let B = parseInt(/B: (\d+)/.exec(input)[1])
let C = parseInt(/C: (\d+)/.exec(input)[1])
let program = /Program: (.+)/.exec(input)[1].split(',').map(d => parseInt(d))


function getOperand(combo) {
    switch (combo) {
        case 0:
        case 1:
        case 2:
        case 3:
            return combo
        case 4: return A
        case 5: return B
        case 6: return C
        case 7: throw new error
    }
}

let opcIdx = 0, oc, lo, co
let out = []
while (opcIdx < program.length) {
    oc = program[opcIdx]
    lo = program[opcIdx + 1]
    co = getOperand(lo)
    switch (oc) {
        case 0: // 'adv' division   : A / (2 ^ co) -> A
            A = A >> co
            break
        case 1: // 'bxl' XOR        : B xor lo -> B
            B ^= lo
            break
        case 2: // 'bst' mod8       : co % 8 -> B
            B = co >> 3
            break
        case 3: // 'jnz' jump?      : !A ? - : jump to instruction pointer
            if(A) {
                opcIdx = lo
                continue
            }
            break
        case 4: // 'bxc' XOR        : B xor C -> B (ignore operand)
            B ^= C
            break
        case 5: // 'out'            : co mod8 -> out
            out.push(co % 8)
            break
        case 6: // 'bdv'            : A / (2 ^ co) -> B
            B = A >> co
            break
        case 7: // 'cdv'            : A / (2 ^ co) -> C
            C = A >> co
            break
    }
    opcIdx += 2
}

let result = out.join(',')


console.log(`Execution time: ${performance.now() - start} ms`);
console.log(result)

// Answer 1:
// Answer 2: 