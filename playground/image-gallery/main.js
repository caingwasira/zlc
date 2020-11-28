const [ current, images, opacity ] = [ document.querySelector('#current'), document.querySelectorAll('.imgs img'), 0.4 ]

images[0].style.opacity = opacity

images.forEach(image => image.addEventListener('click', imgClick ))

function imgClick(e) {
    images.forEach(image => image.style.opacity = 1)
    current.src = e.target.src

    current.classList.add('fade-in')

    // Remove fadein class after n seconds
    setTimeout(() => current.classList.remove('fade-in'), 500)
    e.target.style.opacity = opacity
}



