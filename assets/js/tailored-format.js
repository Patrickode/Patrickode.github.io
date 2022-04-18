"use strict";

// #region Format Declaration
const formats = [
    { name: "default", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u" },
    { name: "changeling", rCode: "1ZyPJy2a4LXnooWwJhXeA-SSlaDCACC4G" },
    {
        name: "epicgames", rCode: "1dYwGAgilw0cqN1pPJpA-ZtiJ-VjymPBr",
        features: [
            { src: "changeling.html", override: undefined },
            { src: "livewire-lifesaver.html", override: undefined },
            { src: "vr-independent-study.html", override: undefined },
            { src: "divinity.html", override: undefined }
        ]
    },
    {
        name: "thatdamngoat", rCode: "1C8_CPWsFKx2K4GbutkKKHkIX3CqqLrI7",
        features: [
            { src: "livewire-lifesaver.html", override: undefined },    //Unity/C#/3D Expertise
            { src: "vr-independent-study.html", override: undefined },  //Code optimization
            { src: "changeling.html", override: undefined },            //Design/Artist Communication
        ]
    },
    // #region Test Format
    {
        name: "test", rCode: "1hYX119ocKAYXRaFw7V9kkYdolafDP59u",
        features: [
            {
                src: "divinity.html",
                override: `<p>This is a test of detail overriding. Now resuming your regularly scheduled content.</p>
                <p>Divinity is a fantasy story series about gods, angels, demons, and the war between
                them. <strong>I write it in my spare time out of passion.</strong> Divinity was initially
                conceived some time in 2012, and it's grown just as much as I have since. <strong> I built 
                this website from the ground up so I could put Divinity's chapters online, to share them with 
                others more easily.</strong></p>
                <ul>
                    <li>
                        <strong>
                            I got fed up with the lack of customization I had on WordPress and other
                            website builders,
                        </strong>
                        so using my designs from those sites as my specification,
                        <strong>I built this website starting from an empty html file.</strong>
                    </li>
                    <li>
                        I didn't want to copy and paste my work into the website every time I updated a
                        chapter, so I embedded the source google doc into the site.
                        <strong>
                            While trying to figure out how to style that embedded doc with CSS, I
                            discovered a way to extract that doc's contents and insert it into the
                            website by itself with a CORS request;
                        </strong>
                        this allows for live updates <em>and</em> full freedom with CSS.
                    </li>
                    <li>
                        I added Bookmark and Light/Dark mode buttons, programmed with JavaScript, to
                        make reading as convenient as I could for visitors.
                    </li>
                </ul>`
            },
            { src: "vr-independent-study.html", override: undefined },
            { src: "livewire-lifesaver.html", override: undefined }
        ]
    }
    // #endregion
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
    //If we don't actually have a code, there's nothing to do, so bail.
    if (!code) { return; }

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
    xhr.onerror = () => console.log(`XHR network failure on loop #${index + 1}, ${feats[index].src}; aborting tailored format/feature list`);
    xhr.onload = (e) => {
        //If we're here, the request succeeded!
        let newFeat = e.target.response.body;
        //First, alter the details of the feature we got if there's an override for it...
        if (feats[index].override) {
            newFeat.querySelector(".details-content").innerHTML = feats[index].override;
        }
        //...then push the HTML we got into featsHTML and pass featsHTML down.
        featsHTML.push(newFeat.innerHTML);
        makeFeatureListRecursively(feats, index + 1, featsHTML);
    };

    //Build and send the request
    xhr.open("GET", `https://patrickode.github.io/features/${feats[index].src}`);
    xhr.responseType = "document";
    xhr.send();
}