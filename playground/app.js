// Class: Create a User
class User {
    constructor(name, email, role) {
        const today = new Date()
        this.name = name
        this.email = email
        this.role = role
        this.id = Math.floor(Math.random() * 1037000) 
        this.date = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()} Time 
        ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    } 
}

// Class: Represents a User
class UI {
    static displayUsers() {
        const users = Store.getUsers()

        users.forEach((user) => UI.addUser(user))
    }

    static addUser(user) {
        const list = document.getElementById('user-list')
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td> ${user.name} </td>
        <td> ${user.email} </td>
        <td> ${user.role} </td>
        <td> ${user.id} </td>
        <td> ${user.date} </td>
        <td><i class="fas fa-trash-alt text-danger delete">X</i></td>
        `
        list.appendChild(tr)
    }

    static deleteUser(user) {
        if(user.classList.contains('delete')) user.parentElement.parentElement.style.display = 'none'
    }

    static clearFields() {
        document.querySelector('#name').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#role').value = ''
    }

    static showAlerts(message, className) {
        const container = document.querySelector('.container')
        const form = document.querySelector('#users-form')
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        container.insertBefore(div, form)

        setTimeout( () => div.style.display = 'none', 2000)
    } 
}

// Class: Storage for all Users
class Store {
    static getUsers() {
        let users
        if(localStorage.getItem('users') === null) return users = []
        users = JSON.parse(localStorage.getItem('users'))
        return users
    }

    static addUser(user) {
        const users = Store.getUsers()
        users.push(user)

        localStorage.setItem('users', JSON.stringify(users))
    }

    static removeUser(user) {
        const users = Store.getUsers()

        for(let i=0; i < users.length; i++) {
            if(users[i].email === user) users.splice(i, 1)
        }

        // users.forEach((myuser, index) => {
        //     if(myuser.email == user) {
        //         users.splice(index, 1)
        //     }
        // })

        localStorage.setItem('users', JSON.stringify(users))
    }
}

// Event: Display a User
document.addEventListener('DOMContentLoaded', UI.displayUsers())

// Event: Add a User
document.querySelector('#users-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const role = document.querySelector('#role').value
    const list = document.querySelector('#user-list')
    const tr = list.getElementsByTagName('tr')

    if(tr) {
        for(i=0; i < tr.length; i++) {
            let txtValue = tr[i].getElementsByTagName('td')[1].textContent.trim().toUpperCase()
            if(email.trim().toUpperCase() === txtValue) {
                UI.showAlerts('Email already taken!', 'danger')
                return
            }
        }
    }

    if( name === '' || email === '' || role === '') {
        UI.showAlerts('Please fill in the form!', 'danger')
        return
    }

    const user = new User(name, email, role)
    UI.addUser(user)
    UI.clearFields()
    UI.showAlerts('User Added', 'success')
    Store.addUser(user)
})

// Event: Remove a User
document.querySelector('#user-list').addEventListener('click', (e) => {
    const user = e.target.parentElement.parentElement.children[1].textContent 
    Store.removeUser(user)
    UI.deleteUser(e.target)
})