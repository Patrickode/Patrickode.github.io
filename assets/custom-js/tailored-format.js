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
    let featAtIndex = undefined;
    let placementIndex = 0;

    for (let index = 0; index < desiredFeatures.length; index++)
    {
        // Find the feature with this desired one's ID; if none found, skip this one, without incrementing the placement index.
        //      Say, for the sake of argument, index was 0. In that case, we haven't placed anything in slot 0 yet. Therefore, stay at 
        //      placement index 0. We'll try again next iteration.
        featAtIndex = document.querySelector(`#${desiredFeatures[index].id}`);
        if (!featAtIndex) continue;

        condConsole.group(`${index}: "${desiredFeatures[index].id}", %o`, featAtIndex);

        prepareFeatureForDisplay(featAtIndex, desiredFeatures[index].content);

        featureContainer.insertBefore(featAtIndex, featureContainer.children[placementIndex]);
        placementIndex++;

        condConsole.groupEnd();
    }

    condConsole.groupFresh("hiding remaining features...");

    // Hide all features after the ones we just reordered. If we didn't place anything, hide all the ones after the third.
    if (placementIndex <= 0) placementIndex = 2;
    for (let index = placementIndex; index < featureContainer.children.length; index++)
    {
        featureContainer.children[index].setAttribute("unfeatured", "hidden");

        condConsole.log(`${index}: %o`, featureContainer.children[index]);
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

function resolveOverride(override, destination,
    loggedPreviewCharLimit = 200, logFormatterRegex = /[\n\r]+|([^\S\n\r])\s+/g, logFormatterReplaceVal = "$1")
{
    if (!override) return;
    if (!destination)
    {
        console.error("Content override doesn't have a destination!", override, destination);
        return;
    }
    condConsole.log(`Content override present and starts with ${override.slice(0, 2)};`);

    // Check for prepend/append flags, capturing them, any non-newline spaces after them till the first non-space, and everything from there on.
    let flagMatch = /^([+<>]{2})?(?:[\n\r]+)?([^\S\n\r]+)?([\S\s]*)/d.exec(override);

    if (flagMatch)
    {
        // Take the third section (first non-space, non-flag character onward), remove trailing whitespace, and check the leading whitespace we
        // captured; this is our baseline indentation. Remove every instance of exactly that much non-newline space, preserving deeper indentation
        override = flagMatch[3].trimEnd().replaceAll(
            new RegExp(`^[^\\S\\n\\r]{${flagMatch.indices[2]?.[1] - flagMatch.indices[2]?.[0] || '$'}}(?:\\s*$)?`, "gm"),
            ""
        )
    }

    // If the content override starts with valid flags, append/prepend accordingly, instead of replacing.
    switch (flagMatch?.[1])
    {
        case "+<":
            condConsole.groupCollapsed("PREPENDING to details section: %c%o", "color:#ce9178", override
                .replaceAll(logFormatterRegex, logFormatterReplaceVal).slice(0, loggedPreviewCharLimit)
            );
            condConsole.groupFinish("%c%o", "color:#ce9178", override);

            override = override + destination.innerHTML;
            break;

        case "+>":
        case "++":
            condConsole.groupCollapsed("APPENDING to details section: %c%o", "color:#ce9178", override
                .replaceAll(logFormatterRegex, logFormatterReplaceVal).slice(0, loggedPreviewCharLimit)
            );
            condConsole.groupFinish("%c%o", "color:#ce9178", override);

            override = destination.innerHTML + override;
            break;

        default:
            condConsole.groupCollapsed("REPLACING details section: %c%o", "color:#ce9178", override
                .replaceAll(logFormatterRegex, logFormatterReplaceVal).slice(0, loggedPreviewCharLimit)
            );
            condConsole.groupFinish("%c%o", "color:#ce9178", override);
            break;
    }

    destination.innerHTML = override;
}