const { listenerCount } = require("nodemailer/lib/mailer")

const numbers = () => {
    let arr = []
    const random = Math.floor(Math.random() * 100000000)
    for (let i = 0; i < random; i++) {
        let salary = Math.floor(Math.random() * 10000)
        arr.push(salary >= 800 ? salary : 800)
    }
    return arr
}

const min = arr => {
    let min = +Infinity
    arr.forEach(val => {
        if (val < min) return min = val
    })
    console.log("Minimum Salary = " + min)
}

const max = arr => {
    let max = -Infinity
    arr.forEach(val => {
        if (val > max) return max = val
    })
    console.log("Maximum Salary = " + max)
}

const avg = arr => {
    let total = 0, avg
    arr.forEach(val => {
        return total += val
    })
    avg = total / (arr.length)
    console.log("Average Salary = " + avg)
}

const total = arr => {
    let total = 0
    arr.forEach(val => {
        return total += val
    })
    console.log("Total Salary = " + total)
}

const totalEmployees = () => console.log("Total Employees = " + numbers().length)

const employeesEarningAbove5000 = arr => console.log("Total employees earning above 5000: " + arr.filter(val => val > 5000).length)

function main(salary) {
    min(salary)
    max(salary)
    avg(salary)
    total(salary)
    employeesEarningAbove5000(salary)
    totalEmployees()
}

const salaries = numbers()
main(salaries)

const algo = () => {
    setTimeout( () => {
        console.log('Cain')
        algo()
    }, 1000)
}