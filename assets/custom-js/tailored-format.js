import { formats } from "./formats.js"



window.addEventListener("load", init);

function init()
{
    let format = getFormatFromURLQueryString() ?? formats.default;

    replaceResume(format.resumeID);
    reorderFeatures(format.features);

    document.querySelector("#loading-box").setAttribute("finished", "");
}



function getFormatFromURLQueryString()
{
    //Split the url at the first f query string param and grab the text after it (index 1, the latter half)
    let queryString = window.location.href.split("f=", 2)[1];
    if (!queryString) return undefined;

    //Split on non-text, non-numeral, non-spacing (like `-` and `_`) characters that are URL valid (see
    //https://stackoverflow.com/a/1547940); this leaves only the value of the query string param
    queryString = queryString.split(/[.~:/?#@!$&'()\[\]*+,;=]/)[0];

    //Return the corresponding format. If no format was found, this will return undefined.
    return formats[queryString.toLowerCase()];
}

function replaceResume(resID)
{
    if (!resID) return;
    updateResumeElement("#resume-button", "href", resID);
    updateResumeElement("#resume-preview", "data", resID);
}

function updateResumeElement(selector, attributeName, resID)
{
    //Get the element found with selector, and the attribute with the supplied name
    //end early if either isn't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) return;

    let targetAttrib = elemWithCode.getAttribute(attributeName);
    if (!targetAttrib) return;

    //Replace the default resume code with the supplied code and apply that change to the element
    targetAttrib = targetAttrib.replace(`${formats.default.resumeID}`, resID);
    elemWithCode.setAttribute(attributeName, targetAttrib);
}



function reorderFeatures(desiredFeatures = [])
{
    let featureContainer = document.querySelector("#featured-projects-container");

    if (!desiredFeatures || !desiredFeatures.length || desiredFeatures.length <= 0)
    {
        let i = 0;
        while (featureContainer.children[i] && !featureContainer.children[i].hasAttribute("unfeatured"))
        {
            prepareFeatureForDisplay(featureContainer.children[i]);
            i++;
        }
        return;
    }

    let featAtIndex = undefined;
    let placementIndex = 0;
    for (let index = 0; index < desiredFeatures.length; index++)
    {
        //Find the feature with this desired one's ID; if none found, skip this one, without incrementing the placement 
        //index; say index was 0, we haven't placed anything in slot 0 yet. We'll try to do that next iteration.
        featAtIndex = document.querySelector(`#${desiredFeatures[index].id}`);
        if (!featAtIndex) continue;

        prepareFeatureForDisplay(featAtIndex, desiredFeatures[index].content);

        featureContainer.insertBefore(featAtIndex, featureContainer.children[placementIndex]);
        placementIndex++;
    }

    // Hide all features after the ones we just reordered. If we didn't place anything, hide all the ones after the third.
    if (placementIndex <= 0) placementIndex = 2;
    for (let index = placementIndex; index < featureContainer.children.length; index++)
    {
        featureContainer.children[index].setAttribute("unfeatured", "hidden");
    }
}

function prepareFeatureForDisplay(feature, contentOverride = null)
{
    if (contentOverride)
    {
        let contentDestination = feature.querySelector(".details-content");
        if (contentOverride.slice(0, 2) == "++")
        {
            contentOverride = contentDestination.innerHTML + contentOverride.slice(2)
        }
        contentDestination.innerHTML = contentOverride;
    }

    let giflikes = feature.querySelectorAll(".giflike");
    for (let index = 0; index < giflikes.length; index++)
    {
        giflikes[index].setAttribute("autoplay", "");
        giflikes[index].setAttribute("controls", "");
    }

    feature.removeAttribute("unfeatured");
}