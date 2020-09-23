const validateInput = async (e) => {
    e.preventDefault()

    const form = e.target.parentElement
    const values = form.querySelectorAll('.form-control')
    document.querySelector('#message').textContent = ''

    let errors = [];
    values.forEach((input) => {
        if(input.value.trim() === '') {
            errors.push(input)
            return input.nextElementSibling.classList.add('valid');
        }

        input.nextElementSibling.classList.remove('valid')
    })


    const name = form.querySelector('#fullName')
    const zlc_code = form.querySelector('#zlc_code')
    const email = form.querySelector('#email')
    const role = form.querySelector('#role')
    const dept = form.querySelector('#dept')
    const mobile_number = form.querySelector('#mobile_number')
    const password = form.querySelector('#password')
    const confirm_password = form.querySelector('#confirm_password')
    const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const match = reg.test(password.value)

    if(name.value.trim().length < 4 ) {
        errors.push(name)
        return name.nextElementSibling.classList.add('valid')
    } else {
        name.nextElementSibling.classList.remove('valid')
    }

    if(mobile_number.value.trim().length !== 10 
       || mobile_number.value.trim().substring(0,2) !== '07' 
       || isNaN(parseInt(mobile_number.value))) {
        errors.push(mobile_number)
        return mobile_number.nextElementSibling.classList.add('valid')
    } else {
        mobile_number.nextElementSibling.classList.remove('valid')
    }

    if(!match) {
        errors.push('Weak password')
        password.nextElementSibling.innerHTML = `
        Length should be greater than 6 characters \n
        Password should contain at least one special character\n
        Password should contain at least one character and number`
        return password.nextElementSibling.classList.add('valid')
    } else {
        password.nextElementSibling.innerHTML = ''
        password.nextElementSibling.classList.remove('valid')
    }

    if(password.value.trim() !== confirm_password.value.trim()) {
        errors.push('No Match')
        return confirm_password.nextElementSibling.classList.add('valid')
    } else {
        confirm_password.nextElementSibling.classList.remove('valid')
    }
    

    if(errors.length > 0) return false

    const data = {
        fullName: name.value,
        email: email.value,
        role: role.value,
        department: dept.value,
        zlc_code: zlc_code.value,
        mobile_number: mobile_number.value,
        password: password.value
    }

    $.ajax({
        type: 'POST',
        url: '/signup',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {
            if(result.status === 200) {
                const message = document.querySelector('#message')
                message.classList.add('message')
                message.textContent = result.message
                message.style.backgroundColor = result.background
                clearFields()
                setTimeout(() => window.location.href = '/users/login', 6000)
            } else {
                const message = document.querySelector('#message')
                message.classList.add('message')
                message.textContent = result.message
                message.style.backgroundColor = result.background
                clearFields()

                setInterval(() => message.style.display = 'none', 8000)
                message.style.display = ''
            }
        },
        error: function( jqXHR, exception) {
            const msg = 'Ooops! error on our side, try back later'
            if(exception) {
                const message = document.querySelector('#message')
                message.classList.add('message')
                message.textContent = msg
                message.style.backgroundColor = '#e74'
                clearFields()  
                setTimeout(() => message.style.display = 'none', 8000)
            }
            
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

document.querySelector('.needs-validation').addEventListener('submit', (e) => validateInput(e))