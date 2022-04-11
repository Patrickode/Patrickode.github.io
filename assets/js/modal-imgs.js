"use strict";

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

    modalImgs.forEach(moImg => {
        moImg.addEventListener("click", () => {
            overlay.setAttribute("active", "");
            overlay.innerHTML = `<img class="expanded-img" src="${moImg.getAttribute("src")}" alt="${moImg.getAttribute("alt")}" />`;
        });
    });
}