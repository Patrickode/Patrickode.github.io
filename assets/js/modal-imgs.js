"use strict";

// Method 1
//Get all images with modal class or similar identifier
//when any of these are clicked, append their src to the current url
    //this will take the user to a page where they can view the img in full
    //When the user clicks the exit button, cut the img's source from the URL

//End result: regardless of query strings, the exit button of any img will lead to wherever the user was last

//Method 2
//Make div with display none, but otherwise at the front of everything
//Show overlay div when image is clicked, replace its content with the image that was clicked
    //image is max-width: 100%, height = auto
//When close button is pressed, or any part of the overlay that isn't the image ic clicked, set the display of the div to none again