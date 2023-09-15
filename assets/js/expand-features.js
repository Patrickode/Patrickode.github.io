"use strict";

window.addEventListener("load", init);
let showMore;
let showLess;
let featureContainer;

function init() {
    showMore = document.querySelector("#show-more");
    showLess = document.querySelector("#show-less");
    featureContainer = document.querySelector("#featured-projects-container");

    showMore.addEventListener("click", showMoreFeatures);
    showLess.addEventListener("click", showLessFeatures);
}

function showMoreFeatures(evt) {
    if (evt.target != showMore) return;

    let sectionsShown = 0;
    for (let index = 0; index < featureContainer.children.length; index++) {
        // If we've shown 3 sections already, leave the rest unexpanded until the button's clicked again
        if (sectionsShown >= 3) {
            showMore.parentElement.setAttribute("expanded", "some");
            return;
        }
        // If this isn't a hidden unfeatured section, move to the next one
        if (featureContainer.children[index].getAttribute("unfeatured") !== "hidden") continue;

        featureContainer.children[index].setAttribute("unfeatured", "shown");
        sectionsShown++;
    }

    // If we got this far, we expanded everything; reflect that in the expanded attribute
    showMore.parentElement.setAttribute("expanded", "all");
}

function showLessFeatures(evt) {
    if (evt.target != showLess) return;

    for (let index = 0; index < featureContainer.children.length; index++) {
        if (featureContainer.children[index].getAttribute("unfeatured")) {
            featureContainer.children[index].setAttribute("unfeatured", "hidden");
        }
    }

    showLess.parentElement.setAttribute("expanded", "none");
}