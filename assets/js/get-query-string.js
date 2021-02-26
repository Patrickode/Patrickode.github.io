"use strict";

let resumes = [
    { name: "default", code: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u" }
];

window.addEventListener("load", init);

function init() {
    let queryString = window.location.href.split("?", 2)[1];
    if (queryString) {
        for (let i = 0; i < resumes.length; i++) {
            if (queryString.includes(`r=${resumes[i].name}`)) {
                replaceResume(resumes[i].code);
                break;
            }
        }
    }
}

function replaceResume(code) {
    let buttonCode = document.querySelector("#resume-button").getAttribute("href");
    let embedCode = document.querySelector("#resume-iframe").getAttribute("src");
    if (buttonCode) {
        buttonCode.replace(`${resumes[0].code}`, code);
    }
    if (embedCode) {
        embedCode.replace(`${resumes[0].code}`, code);
    }
}