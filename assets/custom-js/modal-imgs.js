"use strict";

let overlay;
let container;
let modalImgs;
let overlayIsFading = false;

window.addEventListener("load", init);

function init()
{
    overlay = document.querySelector("#modal-overlay");
    modalImgs = document.querySelectorAll(".modal");

    overlay.addEventListener("click", (evt) =>
    {
        //If overlay was clicked but wasn't the target, or it's currently fading out, don't do anything.
        if (evt.target != overlay || overlayIsFading) return;

        overlay.setAttribute("active", "fading");
        overlayIsFading = true;

        //Wait a bit before deactivating, to give the fade out transition time to play
        //(Should be equal to the delay time of the modal's transition property in main.css)
        setTimeout(() =>
        {
            overlay.removeAttribute("active");
            overlayIsFading = false;
            setTimeout(() => overlay.firstElementChild.setAttribute("src", "media/loading-spinner.gif", 10));
        }, 150);
    })

    modalImgs.forEach(modalImage =>
    {
        modalImage.addEventListener("click", () =>
        {
            overlay.setAttribute("active", "");
            // If this image has a full-size version, use that. Otherwise, use the image as is.
            let targetPath = modalImage.getAttribute("full-size") ?? modalImage.getAttribute("src");
            overlay.firstElementChild.setAttribute("src", targetPath);
        });
    });
}