const validateSignin = (e) => {
    e.preventDefault()
    const form = document.querySelector('.form-signin')
    const code = form.querySelector('#code').value.trim()
    const password = form.querySelector('#inputPassword').value.trim()
    const inputs = form.querySelectorAll('.form-control')
    const stringID = form.querySelector('#id').value.trim()
    const id = parseInt(stringID)
    
    let errors = [];
    inputs.forEach((input) => {
        if(input.value.trim() === '') {
            errors.push(input)
            return input.nextElementSibling.classList.add('valid');
        }

        input.nextElementSibling.classList.remove('valid')
    })

    if(errors.length > 0) return false

    const data = {
        id,
        code,
        password
    }

    $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {

            if(result.code === 200) {
                localStorage.setItem('token', JSON.stringify(result.token))

                const token = JSON.parse(localStorage.getItem('token'))

                if(!token) window.location.href = '/data'
            }

            if(result === 401) {
                inputs.forEach((input) => {
                    input.nextElementSibling.classList.add('valid');
                    input.nextElementSibling.textContent = 'Wrong credentials!'
                })
            }
        },
        error: function(error) {
            if(error) {
                inputs.forEach((input) => {
                    input.nextElementSibling.classList.add('valid');
                    input.nextElementSibling.textContent = 'Error on our side, try back later'
                })
            }
        }
    })

    fetch(`/data?token=${JSON.parse(localStorage.getItem('token'))}`)
    .then( res => res.json())
}

const sentToken = (token) => {
    fetch(`/data?token=${token}`)
    .then( res => res.json())
}


const clearFields = () => {

    document.querySelector('#fullName').value = ''
    document.querySelector('#zlc_code').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#role').value = ''
    document.querySelector('#dept').value = ''
    document.querySelector('#mobile_number').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#confirm_password').value = ''
}

const authenticateToken = () => {
    const token = localStorage.getItem('token')

    fetch('/data').then( res => {
        if(!token) window.location.href = '/users/login'
    })
}


document.querySelector('.form-signin').addEventListener('submit', (e) => validateSignin(e))
document.onload.authenticateToken()
