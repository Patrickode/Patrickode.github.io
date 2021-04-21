"use strict";

const layouts = [
    { name: "default", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u" },
    {
        name: "test", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u",
        features: [
            "divinity.html",
            "vr-independent-study",
            "livewire-lifesaver"
        ]
    }
];
Object.freeze(layouts);

window.addEventListener("load", init);

function init() {
    let layout = findLayoutWithQueryString();
    if (layout) {
        replaceResume(layout.rCode);
        if (layout.features) {
            makeFeatureListRecursively(layout.features);
        }
    }
}

function findLayoutWithQueryString() {
    //Split the url at the first ? and grab the second part
    let queryString = window.location.href.split("?", 2)[1];
    if (queryString) {
        for (let i = 0; i < layouts.length; i++) {
            //If there's a layout with a name that matches the query string, return it
            if (queryString.includes(`r=${layouts[i].name}`)) {
                return layouts[i];
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
    //Get the element found with selector and its attribute entitled attribute, end early if either aren't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) { return; }
    let attribWithCode = elemWithCode.getAttribute(attribute);
    if (!attribWithCode) { return; }

    //Replace the default resume code with the supplied code
    attribWithCode = attribWithCode.replace(`${layouts[0].code}`, code);
    elemWithCode.setAttribute(attribute, attribWithCode);
}

function makeFeatureListRecursively(feats, index = 0, featsHTML = []) {
    //Base case; if at the end of the list, fill the featured projects container with the feats
    //we requested
    if (index >= feats.length) {
        let featureContainer = document.querySelector("#featured-projects-container");
        featureContainer.innerHTML = "";
        for (let feat of featsHTML) { featureContainer.innerHTML += feat; }
        return;
    }

    //Prepare to request this feature by setting what happens on failure/success
    const xhr = new XMLHttpRequest();
    xhr.onerror = () => {
        console.log("XHR network failure, cancelling custom feature list");
        return;
    };
    xhr.onload = (e) => {
        featsHTML.push(e.target.response.body.innerHTML);
        makeFeatureListRecursively(feats, index + 1, featsHTML);
    };

    //Build and send the request
    xhr.open("GET", `https://patrickode.github.io/features/${feats[index]}`);
    xhr.responseType = "document";
    xhr.send();
}