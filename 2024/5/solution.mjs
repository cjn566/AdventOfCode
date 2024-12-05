import fs from 'fs'
const input = fs.readFileSync('2024/5/input.txt', 'utf8')

let array = input.split('\n\r\n')
let rulesLines = array[0].split('\n')
let updates = array[1].split('\n')


// PART 1

let rules = rulesLines.reduce((rules, line) => {
    if(!rules[line.substring(0,2)]){
        rules[line.substring(0,2)] = [line.substring(3,5)]
    }
    else {
        rules[line.substring(0,2)].push(line.substring(3,5))
    }
    return rules
}, {})

let result = updates.reduce((sum, update) => {
    update = update.split(',')
    let failed = false
    for(let i = 0; i < update.length - 1; i++){
        if(failed){
            break
        }
        for(let j = i+1; j < update.length; j++){
            if(rules[update[j]]?.includes(update[i])){
                // Fail
                failed = true
                break
            }
        }
    }
    if(!failed){
        sum += parseInt(update[(update.length - 1) / 2])
    }
    return sum
}, 0)

console.log(result)

// Answer 1: 5208

// PART 2

let rules = rulesLines.reduce((rules, line) => {
    let left = line.substring(0,2)
    let right = line.substring(3,5)
    if(!rules[left]){
        rules[left] = {}
        rules[left][right] = true
    }
    else {
        rules[left][right] = true
    }
    if(!rules[right]){
        rules[right] = {}
        rules[right][left] = false
    }
    else {
        rules[right][left] = false
    }
    return rules
}, {})

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

let result = updates.reduce((sum, update) => {
    update = update.replace('\r','').split(',')
    let failed = false, i = 0, j = 0
    for(i = 0; i < update.length - 1; i++){
        let left = update[i]
        for(j = i+1; j < update.length; j++){
            let right = update[j]
            if( !rules[left][right] || rules[right][left] ){
                // Fail
                update.move(j, i)
                left = update[i]
                j = i+1
                failed = true
            }
        }
    }
    if(failed){
        sum += parseInt(update[(update.length - 1) / 2])
    }
    return sum
}, 0)

console.log(result)


// Answer 2: 6732