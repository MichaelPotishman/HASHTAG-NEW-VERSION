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
            "dismiss": "Got it",
            "allow": "Accept all cookies",
            "deny": "Accept only mandatory cookies",
            "link": "Learn more",        
            "href": "https://ico.org.uk/for-the-public/online/cookies/" 
        },
        "type": "opt-in",
        "layout":"two-button",
        onStatusChange: function(status) {
            // Save the cookie consent status in localStorage when the user accepts cookies
            localStorage.setItem('cookieconsent_status', status);

            if (status === 'allow'){
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme){
                    document.body.classList.add(savedTheme + '-theme');
                }
            }
        }
    });

    document.getElementById('manage-cookies').addEventListener('click', function() {
        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#eaf7f7",
                    "text": "#5c7291"
                },
                "button": {
                    "background": "#56cbdb",
                    "text": "#ffffff"
                }
            },
            "content": {
                "message": "This website uses mandatory cookies as well as optional cookies. Choose your preference below.",
                "dismiss": "Got it",
                "allow": "Accept all cookies",
                "deny": "Accept only mandatory cookies",
                "link": "Learn more",
                "href": "https://ico.org.uk/for-the-public/online/cookies/"
            },
            "type": "opt-in",
            "layout": "two-button",
            onStatusChange: function(status) {
                // Save the cookie consent status in localStorage when the user accepts cookies
                localStorage.setItem('cookieconsent_status', status);
            }
        });
    });

    // get the element which has ID = 'theme-toggle' ==> this is the button for changing theme
    const themeOutput = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark'){
        document.body.classList.add('dark-theme');
        themeOutput.innerText = "Switch to Light Mode";
        
    } else {
        document.body.classList.remove('dark-theme');
        themeOutput.innerText = "Switch to Dark Mode";
    }

    document.getElementById('theme-toggle').addEventListener('click', function () {
        if (document.body.classList.contains('dark-theme')) {
            // Switch to light mode
            document.body.classList.remove('dark-theme');
            themeOutput.innerText = 'Switch to Dark mode';
            if (localStorage.getItem('cookieconsent_status') === 'allow'){
                localStorage.setItem('theme', 'light'); 
            }
            
        } else {
            // Switch to dark mode
            document.body.classList.add('dark-theme');
            themeOutput.innerText = 'Switch to Light mode';
            if (localStorage.getItem('cookieconsent_status') === 'allow'){
                localStorage.setItem('theme', 'dark'); 
            }  
        }
    });
});

