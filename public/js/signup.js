const validateInput = (e) => {
    e.preventDefault()
    const role = document.querySelector('.role')
    const dept = document.querySelector('.dept')
    if(role.value === '') {
        document.querySelector('div[role] > .invalid').classList.add('valid')
        return
    }
    if(dept.value === '') {
        document.querySelector('div[department] > .invalid').classList.add('valid')
        return
    }

    setInterval(() => {
        const message = document.querySelector('#message')
        console.log(message)
        message.classList.add('message')
        message.textContent = 'Success! You can now login'
        window.location.href = '/signup_home'
    },5000)
    const login = document.querySelector('#username')
    login.setAttribute = ['autofocus']
}

document.querySelector('.needs-validation').addEventListener('submit', (e) => validateInput(e))

document.querySelector('#account-user').innerHTML = `
<i class="fas fa-sign-in-alt signin"></i>
<b>Sign In </b>
`
document.querySelector('#account-user').addEventListener('click', (e) => {
    e.target.parentElement.classList.add('account-user-focus')
    window.location.href = '/signup_home'
})