import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), 'input.txt'), 'utf8')

const start = performance.now()

let S = input.split(' ').map(n => parseInt(n))

for(let b = 0; b < 25 ; b++){
    for(let i = 0; i < S.length; i++){
        let str = S[i].toString()
        if(S[i] == 0) S[i] = 1
        else if(!(str.length % 2)){
            S[i] = parseInt(str.substring(str.length / 2))
            S.splice(i, 0, parseInt(str.substring(0, str.length / 2)))
            i++
        } else {
            S[i] *= 2024
        }
    }
}


console.log(S.length)
console.log(`Execution time: ${performance.now() - start} ms`);
console.log('done')