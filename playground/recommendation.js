
const companies = [
    {
        name: 'Econet',
        location: '1223 Msasa Road',
        likes: 4357,
        comments: 500
    },
    {
        name: 'Steward Bank',
        location: '122 Avondale',
        likes: 10365,
        comments: 237
    },
    {
        name: 'Cassava Smartech',
        location: '734 Borrowdale Road',
        likes: 789,
        comments: 45
    },
    {
        name: 'Telone',
        location: '4453 Belvedere',
        likes: 23459,
        comments: 478
    }
]


const sorted = companies.sort((a, b) => (b.likes > a.likes? 1 : -1) )


// console.log(`${sorted[0].name} [${sorted[0].likes}] 
// \n${sorted[1].name} [${sorted[1].likes}] \n${sorted[2].name} [${sorted[2].likes}]`)

const table ="SELECT * FROM plot_farm_identification LIMIT 20000" 

const arr = table.split('')
console.log(arr.length)
