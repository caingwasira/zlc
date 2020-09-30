class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.type()
    }

    type() {
        const current = this.wordIndex % this.words.length

        const fullText = this.words[current]

        if(this.isDeleting) {
            this.txt = fullText.substring(0, this.txt.length - 1)
        } else {
            this.txt = fullText.substring(0, this.txt.length + 1)
        }

        this.txtElement.innerHTML = `<span class="text"> ${this.txt} </span>`

        let typeSpeed = 200

        if(this.isDeleting) {
            typeSpeed /= 2
        }

        if(!this.isDeleting && this.txt === fullText) {
            this.isDeleting = true;
            typeSpeed = this.wait
        }

        if(this.isDeleting && this.txt === '') {
            typeSpeed = 2000
            this.isDeleting = false
            this.wordIndex++
        }

        setTimeout(() => this.type(), typeSpeed)
    }
}


document.addEventListener('DOMContentLoaded', init)

function init() {
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')

    new TypeWriter(txtElement, words, wait)
}