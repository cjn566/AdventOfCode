import fs from 'fs'
const input = fs.readFileSync('input.txt', 'utf8')
console.log(input)

let array = input.split('\n')
array.pop()


let foo = array.map(line => {

    let replaced = line
    .replaceAll('one','one1one')
    .replaceAll('two','two2two')
    .replaceAll('three','three3three')
    .replaceAll('four','four4four')
    .replaceAll('five','five5five')
    .replaceAll('six','six6six')
    .replaceAll('seven','seven7seven')
    .replaceAll('eight','eight8eight')
    .replaceAll('nine','nine9nine')

    let asArr = replaced.split('')

    let first = asArr.find(c => {
        return (c >= '0' && c <= '9')
    })
    let last  = asArr.findLast(c => {
        return (c >= '0' && c <= '9')
    })
    let number = parseInt(first + last)
    return {
        line,
        replaced,
        asArr,
        first,
        last,
        number
    }
})

let bar = foo.reduce((sum, obj)=> {return sum + obj.number}, 0)

