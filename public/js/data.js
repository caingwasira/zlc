$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

const show = () => {
    document.getElementById("myDropdown").classList.toggle("show");
}

//------------------ Data Loading------------------------------------------------------------\\

const showSpinner = (display) => {
    document.getElementById("loader").style.display = display;
    document.querySelector('.myInput').value = ''
}

//-------------------Search Table------------------------------------------------------------\\

const filterSearch = () => {
    input = document.querySelector('.myInput')
    filter = input.value.toUpperCase()
    div = document.querySelector('#myDropdown')
    option = div.getElementsByTagName('option')

    for(let i=0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = ''
        } else {
            option[i].style.display = 'none'
        }
    }
}

document.querySelector('#myDropdown').addEventListener('click', (e) => {
    if(e.target.value === 'clear') {
        show()
        document.querySelector('#stats').style.display = 'none'
        document.querySelector('table').classList.add('table')
    } else {
        fetchData(e.target.value)
        document.querySelector('table').classList.remove('table')
    }
})

document.querySelector('.myInput').addEventListener('keyup', filterSearch)

const searchData = (criteria) => {
    input = document.querySelector('#search_by_id')
    filter = input.value.toUpperCase().trim()
    table = document.getElementById('table')
    tr = table.getElementsByTagName('tr')

    let count = 0
    for(let i=0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[criteria]
        if(td) {
            txtValue = td.textContent || td.innerText
            if(txtValue.toUpperCase().trim().indexOf(filter) > -1) {
                tr[i].style.display = ''
                tr[i].classList.add('rows')
                count++
            } else {
                tr[i].style.display = 'none'
            }
        }
    }

    $('.counter').html(count).css('display', 'inline-block')
}

//-------------------Print Table------------------------------------------------------------\\
const printData = () => {
    const table = document.getElementById('table')
    let htmlToPrint = `
    <style type="text/css">
    table {
        color: #062F4F;
        background-color: #969494;
        border-collapse: collapse;
        width: 100%;
    }

    thead { border-bottom: 1px solid #062F4F}

    tbody tr:nth-child(even) { background-color: #adadad}
    tbody tr:nth-child(odd) { background-color: #969494}

    th, td {
        padding-right: 10px;
    }
    </style>`;
    htmlToPrint += table.outerHTML
    newWin = window.open("")
    newWin.document.write(htmlToPrint)
    newWin.print()
    setTimeout(() => newWin.close(), 2000)
}

document.querySelector('#print').addEventListener('click', (e) => {
    const passcord = document.querySelector('#recipient-name').value.trim()
    if(passcord !== 'cain') return
    printData()
})


//-------------------Fetch Table------------------------------------------------------------\\
const fetchData = value => {
    show()
    showSpinner('block')
    const thead = $("thead")
    const tbody = $("tbody")
    const searchParent = $('#search-criteria')
    const search_table = $('#search_table')
    thead.html('')
    tbody.html('')
    search_table.css('display', 'block')
    searchParent.html('')

    fetch(`/data/table?table=${value}`).then((response) => {
        response.json().then((info) => {

            localStorage.setItem('info', JSON.stringify(info))

            const table = JSON.parse(localStorage.getItem('info'))

            showSpinner('none')
            const headers = Object.keys(table[0])

            let tr = ''
            let option = '<option value="0" class="new-option">filter by:</option>'
            let searchValue = 0
            for(let i = 0; i < headers.length; i++) {
                let header = headers[i]
                tr += `<th> ${header} </th>`
                option += `<option value="${searchValue+i}" class="new-option">${header} </option>`
            }

            let rows = '<tr>'
            table.forEach((row) => {
                let data = ''
                for(let key in row) {
                    if(row[key] === null) {
                        data += `<td> </td>`
                    } else {
                        data += `<td> ${row[key]} </td>`
                    }
                    
                }
                rows += data + '</tr>'
            })

            thead.append('<tr>'+ tr + '</tr>')
            tbody.append(rows)
            searchParent.append(option)

            document.querySelector('#search-criteria').addEventListener('click', (data) => {
                document.querySelector('#search_by_id').addEventListener('keyup', (e) => {
                    searchData(data.target.value)
                })
            })

            $('.counter').html(table.length).css('display', 'inline-block')
            $('.table-name').html(value).css('display', 'inline-block')
            document.querySelector('.print').style.display = 'inline-block'
            document.querySelector('#stats').style.display = 'flex'

        }).catch((error) => {
            tbody.append(`<p> No data to display, try again... </p>`)
            document.querySelector('#stats').style.display = ''
        })
    })
}


//-------------------Initial Data Loaded------------------------------------------------------------\\
const initLoad = (sql) => {
    showSpinner('block')
    const thead = $("thead")
    const tbody = $("tbody")
    const searchParent = $('#search-criteria')
    const search_table = $('#search_table')
    thead.html('')
    tbody.html('')
    search_table.css('display', 'block')
    searchParent.html('')

    fetch(`/data/query?sql=${sql}`).then((response) => {
        response.json().then((info) => {
            localStorage.setItem('info', JSON.stringify(info))

            const table = JSON.parse(localStorage.getItem('info'))

            showSpinner('none')
            const headers = Object.keys(table[0])

            let tr = ''
            let option = '<option class="new-option">filter by:</option>'
            let searchValue = 0
            for(let i = 0; i < headers.length; i++) {
                let header = headers[i]
                tr += `<th> ${header} </th>`
                option += `<option value="${searchValue+i}" class="new-option">${header} </option>`
            }

            let rows = '<tr>'
            table.forEach((row) => {
                let data = ''
                for(let key in row) {
                    if(row[key] === null) {
                        data += `<td> </td>`
                    } else {
                        data += `<td> ${row[key]} </td>`
                    }
                    
                }
                rows += data + '</tr>'
            })

            thead.append('<tr>'+ tr + '</tr>')
            tbody.append(rows)
            searchParent.append(option)

            document.querySelector('#search-criteria').addEventListener('click', (data) => {
                document.querySelector('#search_by_id').addEventListener('keyup', (e) => {
                    searchData(data.target.value)
                })
            })
        
            document.querySelector('#stats').style.display = 'flex'
            $('.counter').html(table.length).css('display', 'inline-block')
            $('.table-name').html('Null').css('display', 'inline-block')
            document.querySelector('.print').style.display = 'inline-block'

        }).catch((error) => {
            tbody.append(`<p> No data to display, try again... </p>`)
            document.querySelector('#stats').style.display = ''
        })
    })
}

document.querySelector('#run').addEventListener('click', (e) => {
    e.preventDefault()
    const sql = 'select * from employees'                             
    initLoad(sql)
})


//------------------ Download Table ------------------------------------------------------------\\
function download() {
    var rows = document.querySelectorAll('tbody > tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td,th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(','));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_'+ new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.querySelector('.printer').addEventListener('click', () => document.querySelector('#recipient-name').value = '')
document.querySelector('.download').addEventListener('click', () => document.querySelector('#recipient-name').value = '')
document.querySelector('#download').addEventListener('click', (e) => {
    const passcord = document.querySelector('#recipient-name').value.trim()
    if(passcord !== 'cain') return
    download()
    console.log('Document printed')
})

//------------------ Sign out ------------------------------------------------------------\\
setTimeout(() => {
    window.location.href = '/users/login'
}, 1000*60*1000)

document.querySelector('#account-user').innerHTML = `
<a href="/logout" class="btn btn-secondary btn-sm logout">Logout</a>
`

//------------------ Table Views ------------------------------------------------------------\\

const changeView = (view, remove1, remove2) => {
    const row = document.querySelectorAll('tbody > tr')
    for(let i=0; i < row.length; i ++) {
        row[i].classList.add(view)
        row[i].classList.remove(remove1)
        row[i].classList.remove(remove2)
    }
}

document.querySelector('#view-default').addEventListener('click', () => changeView('view-default', 'view-light', 'view-dark') )
document.querySelector('#view-light').addEventListener('click', () => changeView('view-light', 'view-default', 'view-dark') )
document.querySelector('#view-dark').addEventListener('click', () => changeView('view-dark', 'view-light', 'view-default') )


//-------------------------------Load Table Names------------------------------------------\\

const tableNames = () => {
    const username = document.querySelector(".username").innerHTML
    const adduser = document.querySelector(".adduser");
    if(username !== 'Cain Gwasira') adduser.classList.add('hide')
     else adduser.classList.remove('hide')

    fetch('/data/table_names')
    .then( res => res.json())
    .then( tableNames => {
        const names = tableNames.filter( nam => {
            if(nam.table_name !== 'users' && nam.table_name !== 'user') {
                return nam
            }
        })
        names.forEach(name => {
            const list = document.querySelector('#myDropdown')
            const clear = document.querySelector('#clear')
            const option = document.createElement('option')
            option.value = name.table_name
            option.appendChild(document.createTextNode(name.table_name))
            clear.parentNode.insertBefore(option, clear.nextSibling)
        })
    })
    .catch( err => console.log(err))

}

document.addEventListener('loadeddata', tableNames())
