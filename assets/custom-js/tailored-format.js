import { formats } from "./formats.js"



class DebugHelper
{
    constructor(enabled) { this.enabled = enabled; }

    tryLog(message, ...substitutions)
    {
        if (this.enabled) console.log(message, ...substitutions);
    }
}

// If using localhost, automatically activate the debug helper. No need to wait for load, the URL is fundamental
const debugHelper = new DebugHelper(window.location.href.indexOf("patrickode") < 0);
debugHelper.tryLog(`%cDebug helper automatically enabled; URL doesn't include "patrickode", so this is almost certainly localhost.`, "color:grey")



window.addEventListener("load", init);
function init()
{
    let format = getFormatFromURLQueryString() ?? formats.default;

    debugHelper.tryLog(`using resume code "%c${format.resumeID}%c" (default %c${formats.default.resumeID}%c)`, "color:#74b5ff", "", "color:#74b5ff", "color:white");

    replaceResume(format.resumeID);
    reorderFeatures(format.features);

    document.querySelector("#loading-box").setAttribute("finished", "");

    debugHelper.tryLog("tailoring finished!")
}

function getFormatFromURLQueryString()
{
    // Split the url at the first f query string param and grab the text after it (index 1, the latter half)
    let queryString = window.location.href.split("f=", 2)[1];
    if (!queryString) return undefined;

    // Split on non-text, non-numeral, non-spacing (like `-` and `_`) characters that are URL valid (see
    // https://stackoverflow.com/a/1547940); this leaves only the value of the query string param
    queryString = queryString.split(/[.~:/?#@!$&'()\[\]*+,;=]/)[0];

    debugHelper.tryLog(`query string found: %c${queryString}`, "color:#74b5ff");

    // Return the corresponding format. If no format was found, this will return undefined.
    return formats[queryString.toLowerCase()];
}



function replaceResume(resID)
{
    updateResumeElement("#resume-button", "href", resID);
    updateResumeElement("#resume-preview", "data", resID);
}

function updateResumeElement(selector, attributeName, resID)
{
    // Get the element found with selector, and the attribute with the supplied name
    // end early if either isn't found
    let elemWithCode = document.querySelector(selector);
    if (!elemWithCode) return;

    let targetAttrib = elemWithCode.getAttribute(attributeName);
    if (!targetAttrib) return;

    debugHelper.tryLog(`\telement and attribute found; applying %c${resID}%c to ${attributeName} attribute of element %c${selector}%c, %o`, "color:#74b5ff", "", "color:#74b5ff", "", elemWithCode);

    // Replace the intentionally invalid placeholder with the supplied code, and apply that change to the element
    targetAttrib = targetAttrib.replace(`${formats.default.resumeID}`, resID);
    elemWithCode.setAttribute(attributeName, targetAttrib);
}



function reorderFeatures(desiredFeatures = [])
{
    let featureContainer = document.querySelector("#featured-projects-container");

    // If the desired features are invalid as a whole,
    if (!desiredFeatures || !desiredFeatures.length || desiredFeatures.length <= 0)
    {
        // For each child of the container that isn't unfeatured, prepare for display.
        let i = 0;
        while (featureContainer.children[i] && !featureContainer.children[i].hasAttribute("unfeatured"))
        {
            prepareFeatureForDisplay(featureContainer.children[i]);
            i++;
        }
        return;
    }
    debugHelper.tryLog(`reordering feature section to match desired features...`);

    // Go through the desired features, find them in the DOM, then insert them on top of all else, in the order they were 
    // given in desiredFeatures.
    let featAtIndex = undefined;
    let placementIndex = 0;

    for (let index = 0; index < desiredFeatures.length; index++)
    {
        // Find the feature with this desired one's ID; if none found, skip this one, without incrementing the placement index.
        //      Say, for the sake of argument, index was 0. In that case, we haven't placed anything in slot 0 yet. Therefore, stay at 
        //      placement index 0. We'll try again next iteration.
        featAtIndex = document.querySelector(`#${desiredFeatures[index].id}`);
        if (!featAtIndex) continue;

        debugHelper.tryLog(`\t${index}: "${desiredFeatures[index].id}", %o`, featAtIndex)

        prepareFeatureForDisplay(featAtIndex, desiredFeatures[index].content);

        featureContainer.insertBefore(featAtIndex, featureContainer.children[placementIndex]);
        placementIndex++;
    }

    debugHelper.tryLog("hiding remaining features...");

    // Hide all features after the ones we just reordered. If we didn't place anything, hide all the ones after the third.
    if (placementIndex <= 0) placementIndex = 2;
    for (let index = placementIndex; index < featureContainer.children.length; index++)
    {
        featureContainer.children[index].setAttribute("unfeatured", "hidden");

        debugHelper.tryLog(`\t${index}: %o`, featureContainer.children[index]);
    }
}



function prepareFeatureForDisplay(feature, contentOverride = null)
{
    if (contentOverride)
    {
        let contentDestination = feature.querySelector(".details-content");

        // If the content override starts with "++", append that override instead of replacing.
        if (contentOverride.slice(0, 2) == "++")
        {
            contentOverride = contentDestination.innerHTML + contentOverride.slice(2)
        }

        contentDestination.innerHTML = contentOverride;
    }

    // For every giflike in this feature, add the "autoplay" and "controls" attributes (the giflikes that start unfeatured don't 
    // have these, to ensure they don't load/load lazily)
    let giflikes = feature.querySelectorAll(".giflike");
    for (let index = 0; index < giflikes.length; index++)
    {
        giflikes[index].setAttribute("autoplay", "");
        giflikes[index].setAttribute("controls", "");
    }

    feature.removeAttribute("unfeatured");
}