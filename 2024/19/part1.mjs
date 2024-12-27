import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let sample = 0

const input = fs.readFileSync(path.join(dirname(fileURLToPath(import.meta.url)), sample ? 'sample.txt' : 'input.txt'), 'utf8')
const start = performance.now()

let halves = input.split('\n\r\n')
let Options = halves[0].split(', ').map(o => ({option: o.trim(), keep: true}))
let patterns = halves[1].split('\r\n')


function takeAChunk(pattern, options, depth = 0) {
    for (let o of options) {
        let remaining = pattern.replace(o, ',').split(',')
        if (remaining.length > 1) {
            let didAll = true
            remaining.forEach(r => {
                if (r) {
                    didAll &&= takeAChunk(r, options, depth + 1)
                }
            })
            if (didAll){
                return true
            }
        }
    }
    return false
}

let copyOfOptions = Options.slice().map(x => x.option)


for (let i = 0 ; i < Options.length ; i++){
    let nOptions = copyOfOptions.slice()
    let oTest = nOptions.splice(i, 1)[0]
    if(takeAChunk(oTest, nOptions)){
        Options[i].keep = false
    }
}

Options = Options.filter(o => o.keep).map(o => o.option)

let can = 0
for (let p of patterns){
    if(takeAChunk(p, Options)){
        console.log(can? "can" : "cannot")
        can++
    } 
}

console.log(`Execution time: ${performance.now() - start} ms`);