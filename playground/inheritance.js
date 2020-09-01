function Book(title, author, year) {
    this.title = title
    this.author = author
    this.year = year
}

// Get Summary
Book.prototype.getSummary = function() {
    return `${this.title} was written by ${this.author} in ${this.year}`
}

// Get Age
Book.prototype.getAge = function() {
    const years = new Date().getFullYear() - this.year
    return `${this.title} is ${years} years old`
}


// Magazine Constructor
function Magazine(title, author, year, month) {
    Book.call(this, title, author, year)
    this.month = month
}

// Inherit Prototype
Magazine.prototype = Object.create(Book.prototype)

// Instantiate Magazine Object
const mag1 = new Magazine('Mag One', 'John Craig', '2010', 'Jan')


// Use Magazine Constructor
Magazine.prototype.constructor = Magazine


console.log(mag1)