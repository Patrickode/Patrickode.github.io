"use strict";

/** @type {Element} */
let showMore;
/** @type {Element} */
let showLess;
/** @type {Element} */
let featureContainer;
/** @type {Set} */
let previouslyShownFeatures;

window.addEventListener("load", init);

function init()
{
    showMore = document.querySelector("#show-more");
    showLess = document.querySelector("#show-less");
    featureContainer = document.querySelector("#featured-projects-container");
    previouslyShownFeatures = new Set();

    showMore.addEventListener("click", showMoreFeatures);
    showLess.addEventListener("click", showLessFeatures);
}

function showMoreFeatures(evt)
{
    if (evt.target != showMore) return;

    let sectionsShown = 0;
    for (let index = 0; index < featureContainer.children.length; index++)
    {
        // Once we've shown 3 sections, leave the rest unexpanded until the button's clicked again
        if (sectionsShown >= 3)
        {
            showMore.parentElement.setAttribute("expanded", "some");
            return;
        }
        // If this isn't a hidden unfeatured section, move to the next one
        if (featureContainer.children[index].getAttribute("unfeatured") !== "hidden") continue;

        showAndInitFeature(featureContainer.children[index]);
        sectionsShown++;
    }

    // If we got this far, we expanded everything; reflect that in the expanded attribute
    showMore.parentElement.setAttribute("expanded", "all");
}

function showAndInitFeature(featureToShow)
{
    featureToShow.setAttribute("unfeatured", "shown");
    
    if (previouslyShownFeatures.has(featureToShow)) return;

    let giflikes = featureToShow.querySelectorAll(".giflike");
    for (let index = 0; index < giflikes.length; index++)
    {
        giflikes[index].setAttribute("autoplay", "");
        giflikes[index].setAttribute("controls", "");
    }

    previouslyShownFeatures.add(featureToShow);
}

function showLessFeatures(evt)
{
    if (evt.target != showLess) return;

    for (let index = 0; index < featureContainer.children.length; index++)
    {
        if (featureContainer.children[index].getAttribute("unfeatured"))
        {
            featureContainer.children[index].setAttribute("unfeatured", "hidden");
        }
    }

    showLess.parentElement.setAttribute("expanded", "none");
}