const validateSignin = (e) => {
    const form = document.querySelector('.form-signin')
    const code = form.querySelector('#code').value.trim()
    const password = form.querySelector('#inputPassword').value.trim()
    const inputs = form.querySelectorAll('.form-control')
    const stringID = form.querySelector('#id').value.trim()
    
    let errors = [];
    inputs.forEach((input) => {
        if(input.value.trim() === '') {
            errors.push(input)
            return input.nextElementSibling.classList.add('valid');
        }

        input.nextElementSibling.classList.remove('valid')
    })

    if(errors.length > 0) {
        e.preventDefault()
        return false
    }
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
