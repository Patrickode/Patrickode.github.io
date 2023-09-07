"use strict";

/**
 * Basically a for loop that concats all the noninterpolated parts with the interpolated parts, leaving the string unchanged. 
 * The ?? is for the end when index goes out of interpolated's bounds; no more interpolated things to insert.
 * 
 * See https://www.zachsnoek.com/blog/understanding-tagged-template-literals-in-javascript#tagged-template-literals.
 */
let html = (notInterpolated, ...interpolated) => notInterpolated.reduce(
    (total, current, index) => total += current + (interpolated[index] ?? ""),
    ""
);

let overlay;
let container;
let modalImgs;

window.addEventListener("load", init);

function init() {
    overlay = document.querySelector("#modal-overlay");
    modalImgs = document.querySelectorAll(".modal");

    overlay.addEventListener("click", (evt) => {
        if (evt.target == overlay)
            overlay.removeAttribute("active");
    })

    modalImgs.forEach(modalImage => {
        modalImage.addEventListener("click", () => {
            overlay.setAttribute("active", "");
            overlay.innerHTML = html`
                <img class="expanded-img" src="${modalImage.getAttribute("src")}" alt="${modalImage.getAttribute("alt")}"/>`;
        });
    });
}