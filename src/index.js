const BASE_URL = `http://api.tvmaze.com`;

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('shows').addEventListener('click', getShows)
    getShows()
})

function bindEventListeners(){
    document.querySelector('#shows').addEventListener('click', renderShows)
}

async function renderShows(){
    const shows = await apiService.fetchShows();
    let main = document.getElementById('main')
    main.innerHTML = ""
    shows.map(show => {
        `
        <li>
            <a href="#" data-id="${show.id}">${show.name}</a>
        </li>
        `
    })
    attachClicksToLinks()
}


function getShows() {
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetchShows()
    .then(shows => {
        shows.map(show => {
        main.innerHTML += `
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
    let main = document.getElementById('main')
    main.innerHTML = ""
    fetchShow(e.target.dataset.id)
    .then(show => {
         main.innerHTML = `
        <h1>${show.name}</h1><br/>
        <h3>Summary:</h3>
        ${show.summary}
        <h3>Network:</h3>
        ${show.network.name}
        <h3>Genres:</h3>
        ${show.genres.join(", ")}
        <h3>url:</h3>
        ${show.url}`
    })
}

async function fetchShow(id){
    let res = await fetch(BASE_URL + `/shows/${id}`)
    let data = await res.json()
    return data
}


