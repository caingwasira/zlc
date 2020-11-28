const button = document.querySelector('button')
const messageIn = document.querySelector('#messageIn')
const messageOut = document.querySelector('#messageOut')


button.addEventListener('click', sendMsg) 

function sendMsg() {
    let content = messageIn.value;
    messageOut.innerHTML = content
    messageIn.value = ''
    setTimeout( () => messageOut.innerHTML = '', 3000)
}