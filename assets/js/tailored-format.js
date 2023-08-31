import { formats } from "./formats.js"



window.addEventListener("load", init);

function init() {
    let format = getFormatFromURLQueryString();
    if (!format) return;

    replaceResume(format.rCode);

    if (format.features) {
        reorderFeatures(format.features);
    }
}



function getFormatFromURLQueryString() {
    //Split the url at the first f query string param and grab the text after it (index 1, the latter half)
    let queryString = window.location.href.split("f=", 2)[1];
    if (!queryString) return undefined;

    //Split on non-text, non-numeral, non-spacing (like `-` and `_`) characters that are URL valid (see
    //https://stackoverflow.com/a/1547940); this leaves only the value of the query string param
    queryString = queryString.split("/[.~:/?#@!$&'()\[\]*+,;=]/")[0];

    //Return the corresponding format. If no format was found, this will return undefined.
    return formats[queryString];
}

function replaceResume(code) {
    if (!code) return;
    updateResumeElement("#resume-button", "href", code);
    updateResumeElement("#resume-iframe", "src", code);
}

function updateResumeElement(selector, attributeName, code) {
    //Get the element found with selector, and the attribute with the supplied name
    //end early if either isn't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) return;

    let targetAttrib = elemWithCode.getAttribute(attributeName);
    if (!targetAttrib) return;

    //Replace the default resume code with the supplied code and apply that change to the element
    targetAttrib = targetAttrib.replace(`${formats.default.rCode}`, code);
    elemWithCode.setAttribute(attributeName, targetAttrib);
}

function reorderFeatures(desiredFeatures = []) {
    let featureContainer = document.querySelector("#featured-projects-container");
    let featAtIndex = undefined;
    let placementIndex = 0;

    for (let index = 0; index < desiredFeatures.length; index++) {
        //Find the feature with this desired one's ID; if none found, skip this one, without incrementing the placement 
        //index; say index was 0, we haven't placed anything in slot 0 yet. We'll try to do that next iteration.
        featAtIndex = document.querySelector(`#${desiredFeatures[index].id}`);
        if (!featAtIndex) continue;

        if (desiredFeatures[index].content) {
            featAtIndex.querySelector(".details-content").innerHTML = desiredFeatures[index].content;
        }

        featureContainer.insertBefore(featAtIndex, featureContainer.children[placementIndex]);
        placementIndex++;
    }
}