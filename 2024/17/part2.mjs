import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { error } from 'console';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')
const start = performance.now()
let programStr = /Program: (.+)/.exec(input)[1]
let p = programStr.split(',').map(d => parseInt(d))

let A = 0n
for (let i = p.length - 1; i >= 0; i--) {
    let found = false
    for (let t = 0n; t < 8n; t++) {
        let a = A + t               // a = attempted A value
        let b = (a % 8n)            // op 0: 2, 4
        b ^= 1n                     // op 1: 1, 1
        let c = a >> b              // op 2: 7, 5
                                    // op 3: 0, 3 (push a >>)
        b ^= 4n                     // op 4: 1, 4
        b ^= c                      // op 5: 4, 4
        b &= 7n                     // op 6: 5, 5
        if (b === BigInt(p[i])){
            A += t
            A <<= 3n
            found = true
            break
        }
    }
    if(!found){
        console.log('wtf')
    }
}
A <<= 3n
console.log(`Execution time: ${performance.now() - start} ms`);
console.log(A)

// Answer 1:
// Answer 2: 