import { formats } from "./formats.js"



class ConditionalConsole
{
    constructor(enabled) { this.enabled = enabled; }
    #tryAny(fn, ...args)
    {
        if (this.enabled)
        {
            return fn.apply(this, args);
        }
        return;
    }

    assert(condition, ...data) { this.#tryAny(console.assert, condition, ...data) }
    clear() { this.#tryAny(console.clear) }
    count(label = "") { this.#tryAny(console.count, label) }
    countReset(label = "") { this.#tryAny(console.countReset, label) }
    debug(...data) { this.#tryAny(console.debug, ...data) }
    dir(item, options) { this.#tryAny(console.dir, item, options) }
    dirxml(...data) { this.#tryAny(console.dirxml, ...data) }
    error(...data) { this.#tryAny(console.error, ...data) }
    group(...data) { this.#tryAny(console.group, ...data) }
    groupCollapsed(...data) { this.#tryAny(console.groupCollapsed, ...data) }
    groupEnd() { this.#tryAny(console.groupEnd) }
    groupFinish(...data) { this.#tryAny(console.log, ...data); this.#tryAny(console.groupEnd); } // extra: log+end combo
    groupFresh(...data) { this.#tryAny(console.groupEnd); this.#tryAny(console.group, ...data); } // extra: end+start combo
    info(...data) { this.#tryAny(console.info, ...data) }
    log(...data) { this.#tryAny(console.log, ...data) }
    table(tabularData, properties = [""]) { this.#tryAny(console.table, tabularData, properties) }
    time(label = "") { this.#tryAny(console.time, label) }
    timeEnd(label = "") { this.#tryAny(console.timeEnd, label) }
    timeLog(label = "", ...data) { this.#tryAny(console.timeLog, label, ...data) }
    timeStamp(label = "") { this.#tryAny(console.timeStamp, label) }
    trace(...data) { this.#tryAny(console.trace, ...data) }
    warn(...data) { this.#tryAny(console.warn, ...data) }
}

// If using localhost, automatically activate the debug helper. No need to wait for load, the URL is fundamental
const condConsole = Object.freeze(new ConditionalConsole(window.location.href.indexOf("patrickode") < 0));
condConsole.log(`%cDebug helper automatically enabled; URL doesn't include "patrickode", ` +
    `so this is almost certainly localhost.`, "color:#AAA");



window.addEventListener("load", init);
function init()
{
    let format = getFormatFromURLQueryString() ?? formats.default;

    condConsole.group(
        `using resume code "%c${format.resumeID}%c" (default %c${formats.default.resumeID}%c)`,
        "color:#74b5ff", "", "color:#74b5ff", "color:white"
    );

    replaceResume(format.resumeID);
    condConsole.groupEnd();

    reorderFeatures(format.features);
    document.querySelector("#loading-box").setAttribute("finished", "");

    condConsole.log("tailoring finished!")
}

function getFormatFromURLQueryString()
{
    // Split the url at the first f query string param and grab the text after it (index 1, the latter half)
    let queryString = window.location.href.split("f=", 2)[1];
    if (!queryString) return undefined;

    // Split on non-text, non-numeral, non-spacing (like `-` and `_`) characters that are URL valid (see
    // https://stackoverflow.com/a/1547940); this leaves only the value of the query string param
    queryString = queryString.split(/[.~:/?#@!$&'()\[\]*+,;=]/)[0];

    condConsole.log(`query string found: %c${queryString}`, "color:#74b5ff");

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

    condConsole.log(
        `element and attribute found; applying %c${resID}%c to ${attributeName} attribute of element %c${selector}%c,\n%o`,
        "color:#74b5ff", "", "color:#74b5ff", "", elemWithCode
    );

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
    condConsole.group(`reordering feature section to match desired features...`);

    // Go through the desired features, find them in the DOM, then insert them on top of all else, in the order they were 
    // given in desiredFeatures.
    let featWithID = undefined;
    let placementIndex = 0;

    for (let current = 0; current < desiredFeatures.length; current++)
    {
        // Find the feature with this desired one's ID; if none found, skip this one, without incrementing placementIndex (we haven't
        // placed anything this iteration).
        featWithID = document.querySelector(`#${desiredFeatures[current].id}`);
        if (!featWithID) continue;

        condConsole.group(`${current}: "${desiredFeatures[current].id}",%o`, featWithID);

        prepareFeatureForDisplay(featWithID, desiredFeatures[current].content);

        // Since we DID find the desired ID, put it at placementIndex, then increment.
        //     Our positioning isn't screwed up by this change to the list; what USED to be current is now at placementIndex, and
        //     whatever `current - 1` was is now at current. That is to say, everything ahead is unchanged.
        featureContainer.insertBefore(featWithID, featureContainer.children[placementIndex]);
        placementIndex++;

        condConsole.groupEnd();
    }

    condConsole.groupFresh("hiding remaining features...");

    // Hide all features after the ones we just reordered. If we didn't place anything, hide all features after the third (index 2).
    if (placementIndex <= 0) placementIndex = 2;

    for (let index = placementIndex; index < featureContainer.children.length; index++)
    {
        featureContainer.children[index].setAttribute("unfeatured", "hidden");

        condConsole.log(`${index}:%o`, featureContainer.children[index]);
    }

    condConsole.groupEnd();
}



function prepareFeatureForDisplay(feature, contentOverride = null)
{
    resolveOverride(contentOverride, feature.querySelector(".details-content"));

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

function resolveOverride(override, destination)
{
    if (!override) return;
    if (!destination)
    {
        console.error("Content override doesn't have a destination!", override, destination);
        return;
    }

    const flags = override.slice(0, 2);
    condConsole.log(`Content override present and starts with ${flags};`);

    // If we have flags, insert everything after them. Otherwise, use override as is.
    const overrideHTML = document.createElement("template");
    overrideHTML.innerHTML = flags.match(/[\+<>]{2}/) ? override.slice(2) : override;

    switch (flags)
    {
        case "+<":
            destination.insertBefore(overrideHTML.content, destination.firstChild);
            condConsole.log("PREPENDED to details section of%o", destination)
            break;

        case "+>":
        case "++":
            destination.insertBefore(overrideHTML.content, null);
            condConsole.log("APPENDED to details section of%o", destination)
            break;

        default:
            destination.innerHTML = overrideHTML.innerHTML;
            condConsole.log("REPLACED details section of%o", destination)
            break;
    }
}