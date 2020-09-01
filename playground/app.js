// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

        list.appendChild(row)
    }

    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static deleteBook(book) {
        if(book.classList.contains('delete')) {
            const tr = book.parentElement.parentElement
            tr.style.display = 'none'
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)

        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
}

// Store Class: Handle Storage
class Store {
    static getBooks() {
        let books
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach((book, index) => {
            if(book.isbn === isbn) books.splice(index, 1)
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    const list = document.querySelector('#book-list')
    const tr = list.getElementsByTagName('tr')

    for(let i=0; i < tr.length; i++) {
        let txtValue = tr[i].getElementsByTagName('td')[0].textContent.trim().toUpperCase()
        if(title.trim().toUpperCase() === txtValue) {
            UI.showAlert('Book Aready Exists!', 'danger')
            return
        }
    }

    if(!title || !author || !isbn) return UI.showAlert('Please fill in all fields', 'danger')

    const book = new Book(title, author, isbn)

    UI.addBookToList(book)

    Store.addBook(book)

    UI.showAlert('Book Added!', 'success')

    UI.clearFields()
})

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert('Book Removed!', 'success')
})