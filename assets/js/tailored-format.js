"use strict";

// #region Format Declaration
const formats = [
    { name: "default", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u" },
    { name: "changeling", rCode: "1ZyPJy2a4LXnooWwJhXeA-SSlaDCACC4G" },
    {
        name: "epicgames", rCode: "1dYwGAgilw0cqN1pPJpA-ZtiJ-VjymPBr",
        features: [
            "changeling.html",
            "livewire-lifesaver.html",
            "vr-independent-study.html",
            "divinity.html"
        ]
    },
    {
        name: "test", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u",
        features: [
            "divinity.html",
            "vr-independent-study.html",
            "livewire-lifesaver.html"
        ]
    }
];
Object.freeze(formats);
// #endregion

window.addEventListener("load", init);

function init() {
    let format = findFormatWithQueryString();
    if (format) {
        replaceResume(format.rCode);
        if (format.features) {
            makeFeatureListRecursively(format.features);
        }
    }
}

function findFormatWithQueryString() {
    //Split the url at the first ? and grab the second part, i.e., the stuff after the ?.
    let queryString = window.location.href.split("?", 2)[1];
    if (queryString) {
        for (let i = 0; i < formats.length; i++) {
            //If there's a layout with a name that matches the query string, return it
            if (queryString.includes(`f=${formats[i].name}`)) {
                return formats[i];
            }
        }
    }
    //If we got here there's no matching layout
    return undefined;
}

function replaceResume(code) {
    updateResumeElement("#resume-button", "href", code);
    updateResumeElement("#resume-iframe", "src", code);
}
function updateResumeElement(selector, attribute, code) {
    //Get the element found with selector and its attribute entitled attribute, end early if either isn't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) { return; }
    let attribWithCode = elemWithCode.getAttribute(attribute);
    if (!attribWithCode) { return; }

    //Replace the default resume code with the supplied code
    attribWithCode = attribWithCode.replace(`${formats[0].rCode}`, code);
    elemWithCode.setAttribute(attribute, attribWithCode);
}

function makeFeatureListRecursively(feats, index = 0, featsHTML = []) {
    //Base case. If at the end of feats, we've gotten all the html we want; fill the featured projects
    //container with that HTML, contained in featsHTML, which we passed down from the beginning
    if (index >= feats.length) {
        let featureContainer = document.querySelector("#featured-projects-container");
        featureContainer.innerHTML = "";
        for (let feat of featsHTML) { featureContainer.innerHTML += feat; }
        return;
    }

    //To take local html files and place them into the DOM, we need to send an XHR request to *ourselves*

    //Prepare to request nth feature (see index) by setting what happens on failure/success
    const xhr = new XMLHttpRequest();
    xhr.onerror = () => console.log("XHR network failure, aborting tailored format/feature list");
    xhr.onload = (e) => {
        //If we're here, the request succeeded; push the HTML we got into featsHTML and pass featsHTML down
        featsHTML.push(e.target.response.body.innerHTML);
        makeFeatureListRecursively(feats, index + 1, featsHTML);
    };

    //Build and send the request
    xhr.open("GET", `https://patrickode.github.io/features/${feats[index]}`);
    xhr.responseType = "document";
    xhr.send();
}