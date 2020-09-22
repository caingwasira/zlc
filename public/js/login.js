const validateSignin = (e) => {
    e.preventDefault()
    const form = document.querySelector('.form-signin')
    const code = form.querySelector('#code').value.trim()
    const password = form.querySelector('#inputPassword').value.trim()
    const inputs = form.querySelectorAll('.form-control')

    
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
        code,
        password
    }

    $.ajax({
        type: 'POST',
        url: '/login',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {
            console.log(result)
            if(result === 'success') window.location.href = '/data'
        },
        error: function(error) {
            console.log('Error, try back later')
        }
    })
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


document.querySelector('.form-signin').addEventListener('submit', (e) => validateSignin(e))