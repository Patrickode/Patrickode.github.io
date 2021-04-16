"use strict";

const resumes = [
    { name: "default", code: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u" }
];
Object.freeze(resumes);

window.addEventListener("load", init);

function init() {
    //Split the url at the first ? and grab the second part
    let queryString = window.location.href.split("?", 2)[1];
    if (queryString) {
        for (let i = 0; i < resumes.length; i++) {
            //If the query string matches this resume name, replace the website resume with this one and end the loop
            if (queryString.includes(`r=${resumes[i].name}`)) {
                replaceResume(resumes[i].code);
                break;
            }
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.onerror = (e) => console.log("XHR network failure");
    xhr.onload = (e) => { feature1.innerHTML = e.target.response.body.innerHTML; };

    xhr.open("GET", "https://patrickode.github.io/feat-divinity.html");
    xhr.responseType = "document";
    xhr.send();
}

function replaceResume(code) {
    updateResumeElement("#resume-button", "href", code);
    updateResumeElement("#resume-iframe", "src", code);
}

function updateResumeElement(selector, attribute, code) {
    //Get the element found with selector and its attribute entitled attribute, end early if either aren't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) { return; }
    let attribWithCode = elemWithCode.getAttribute(attribute);
    if (!attribWithCode) { return; }

    //Replace the default resume code with the supplied code
    attribWithCode = attribWithCode.replace(`${resumes[0].code}`, code);
    elemWithCode.setAttribute(attribute, attribWithCode);
}