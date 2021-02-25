const BASE_URL = `http://api.tvmaze.com`;

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shows').addEventListener('click', getShows)
    getShows()
})

function getShows() {
    let main = document.getElementById('main ul')
    let info = document.getElementById('info')
    let showLis = document.getElementById('show-list')
    info.innerHTML = ""
    showLis.innerHTML = ""
    fetchShows()
    .then(shows => {
        shows.map(show => {
        showLis.innerHTML += `
        <li>
            <a href="#" data-id="${show.id}">${show.name}</a>
        </li>
        `
        })
        attachClicksToLinks()
    })
}

async function fetchShows(){
    let res = await fetch(BASE_URL + '/shows')
    let data = await res.json()
    return data
}

function attachClicksToLinks(){
    const shows = document.querySelectorAll("li a")
    shows.forEach(show => {
        show.addEventListener('click', displayShow)
    })
}

async function displayShow(e){
    console.log(e.target)
    let info = document.getElementById('info')
    let showLis = document.getElementById('show-list')
    showLis.innerHTML = ""
    fetchShow(e.target.dataset.id)
    .then(show => {
         info.innerHTML = `
        <h1>${show.name}</h1><br/>
        <h3>Summary:</h3>
        
        <p>${show.summary}</p>
        <h3>Network:</h3>
        <p>${show.network.name}</p>
        <h3>Genres:</h3>
        <p>${show.genres.join(", ")}</p>
        <h3>url:</h3>
        <p>${show.url}</p>
        `
    })
}

async function fetchShow(id){
    let res = await fetch(BASE_URL + `/shows/${id}`)
    let data = await res.json()
    return data
}


