let numArr = [ [1, 'one'], [2, '2'], [3, 'three']]

let valMap = new Map(numArr)

for(let [key, value] of valMap.entries()) {
    //console.log(`${key} ${value}`)
}


let numbers = [2,0,7,3,1,5,6,7,7,8,4,'cain',34,65,12,44]

let a = new Set(numbers)

//console.log(a)

let string = 'awufgfhkejnvbfhfgehehccvvbdhdhwpqislq'

let letters = new Map();
for(let i=0; i<string.length; i++) {
    let letter = string[i]
    if(!letters.has(letter)) {
        letters.set(letter, 1)
    } else {
        letters.set(letter, letters.get(letter) +1)
    }
}

////////////////////////////////////////////

console.log(letters)

const product = x => y => x * y;

let mult5 = product(5)
//console.log(mult5(2))


///////////////////////////////////////////Private Methods

// const budget = () => {
//     let balance = 0;
//     const deposit = val => balance += val
//     const withdraw = val => balance -= val
//     const check = () => balance;

//     return {
//         deposit,
//         withdraw,
//         check
//     }
// }

class Wallet {
    constructor() {
        this.balance = 0;
    }

    deposit(amount) {

        if(amount < 5) return 'Minimum deposit is 500, try again'
        if(amount > 20000) return 'Deposit limit for the day exceeded!'
        if(this.balance > 20000) return 'Maximum limit for the day exceeded!'
        this.balance += amount;
    }

    withdraw(amount) {
        
        if(this.balance < amount) return 'Insufficient funds'
        this.balance -= amount;
    }

    checkBal() {
        return this.balance
    }
}

const myWallet = new Wallet()
myWallet.withdraw(200)
myWallet.deposit(200)
myWallet.deposit(458)
myWallet.withdraw(200)

console.log(myWallet.checkBal())


/////////////////////////////////////////Generators

function* arrayIterator() {
    yield* arguments
}

// const it = arrayIterator(2,4,5,6,7)

// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)
// console.log(it.next().value)

function arrayIterator(array) {
    let index = 0
    return {
        next: () => {
            if(index < array.length) {
                let val = array[index]
                index += 1;
                return val;
            }
        }
    }
}

const it = arrayIterator([2,4,9,3,4,5,1,7,2])

console.log(it.next())
console.log(it.next())
console.log(it.next())
