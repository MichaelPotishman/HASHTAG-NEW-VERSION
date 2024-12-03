window.addEventListener("load", function() {
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#eaf7f7",    // Popup background color
                "text": "#5c7291"            // Popup text color
            },
            "button": {
                "background": "#56cbdb",     // Button background color
                "text": "#ffffff"            // Button text color
            }
        },
        "content": {
            "message": "This website uses mandatory cookies as well as optional cookies. Choose your preference below.",
            "dismiss": "Accept all cookies",
            "link": "Learn more",        // Link to your cookies policy
            "href": "https://ico.org.uk/for-the-public/online/cookies/"  // Link to your cookies policy page
        }
    });
});
