const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Search places from states.json and filter it
const searchPlaces =  async place => {
    const res = await fetch('./data/states.json');
    const places = await res.json();

    // Get matches to current text input
    let matches = places.filter( plc => {
        const regex = new RegExp(`^${place}`, 'gi')
        return plc.name.match(regex) || plc.abbr.match(regex)
    })

    if(place.length === 0) {
        matches = []
        matchList.textContent = ''
        return
    }

    if(matches.length < 1) {
        matchList.textContent = 'No match found'
        setTimeout(() => matchList.textContent = '', 3000)
    }

    outputHtml(matches)
} 

// Show results in html
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map( match => `
        <div class="card card-body mb-1">
           <p>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span> </p>
        </div>
        `).join('')

        matchList.innerHTML = html
    }
}

search.addEventListener('input', () => searchPlaces(search.value))