const modal = document.getElementById('simpleModal')

const openBtn = document.getElementById('openModal')

const closeBtn = document.getElementById('closeBtn')

openBtn.addEventListener('click', openModal)

function openModal() {
    modal.style.display = 'block'
}

closeBtn.addEventListener('click', closeModal)

function closeModal() {
    modal.style.display = 'none'
}

document.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.style.display = 'none'
    }
})