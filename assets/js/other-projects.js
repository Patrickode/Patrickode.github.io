"use strict";

window.addEventListener("load", init);

function init() {
    //If local storage isn't supported, send an xhr
    if (typeof (Storage) !== "undefined") {
        sendItchXHR();
    }
    //If it is supported and there's no retrieval data cached/the cached data is a day old or more, send an xhr
    //  (We don't have to parse the cached date if there is one; the Date ctor takes a string)
    else if (!localStorage.itchXHRDate
        || new Date(localStorage.itchXHRDate) < new Date().setHours(0, 0, 0, 0)) {
        sendItchXHR();
    }
    //If we got this far, there is valid data cached; we can use the cached data instead of sending an xhr
    else {
        document.querySelector("#other-project-grid").innerHTML = localStorage.itchXHRContents;
    }
}

function sendItchXHR() {
    //Set up the request
    const xhr = new XMLHttpRequest();
    xhr.onerror = () => console.log("XHR network failure, other project grid will remain empty");
    xhr.onload = populateOtherProjectsGrid;
    //Send the request
    xhr.open("GET", "https://itch.io/api/1/KEY_GOES_HERE/my-games");
    xhr.send();
}

function populateOtherProjectsGrid(e) {
    let response = e.target;
    let results = JSON.parse(response.responseText);

    if (results.games) {
        results = results.games;

        //Sort the results by their date, most recent first
        results.sort((a, b) => {
            let aDate = new Date(a.published_at);
            let bDate = new Date(b.published_at);
            return bDate - aDate;
        });
        //slice off any results past the 12th
        results = results.length > 12 ? results.slice(0, 12) : results;

        let grid = document.querySelector("#other-project-grid");
        grid.innerHTML = "";
        for (const result of results) {
            grid.innerHTML += `<a href="${result.url}" class="other-project">
                <img src="${result.cover_url}" alt="">
                <h5>${result.title}</h5>
                <h6>${result.short_text}</h6>
            </a>`;
        }

        localStorage.itchXHRDate = new Date().setHours(0, 0, 0, 0);
        localStorage.itchXHRContents = grid.innerHTML;
    }
}