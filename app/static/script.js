
document.addEventListener("DOMContentLoaded", function () {
    // POST DELETION!
    function attachDeleteButtonListeners() {
        const deleteButtons = document.querySelectorAll('.post-right-buttons');

        for (let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", function () {
                const postID = deleteButtons[i].getAttribute("data-post-id");

                const modal = document.getElementById(`post-confirmation-modal-${postID}`);

                if (modal){
                    modal.style.display = "block";
                }
            });

        }
    }

    function attachCloseButtonListeners() {
        const closeModalButtons = document.querySelectorAll('.cancel-delete');
        
        for (let i = 0; i < closeModalButtons.length; i++){
            closeModalButtons[i].addEventListener("click", function () {
                const postID = closeModalButtons[i].getAttribute("data-post-id");

                const modal = document.getElementById(`post-confirmation-modal-${postID}`);

                if (modal){
                    modal.style.display = "none";
                }
            });
        }
    }


    // Account Deletion Modal
    const accountDeleteBtn = document.getElementById("open-modal-btn");
    const accountModal = document.getElementById("account-confirmation-modal");
    const accountCloseBtn = document.getElementById("close-modal-btn");

    const modalContainer = document.querySelector(".account-modal-container");


    accountDeleteBtn.addEventListener("click", function () {
        modalContainer.classList.add('active');
        accountModal.classList.add('active');
    });


    accountCloseBtn.addEventListener("click", function() {
        modalContainer.classList.remove('active');
        accountModal.classList.remove('active');
    });

    // Close modal if clicked outside
    document.addEventListener("click", function(event) {
        if (!accountModal.contains(event.target) && !accountDeleteBtn.contains(event.target) && !modalContainer.contains(event.target)) {
            modalContainer.classList.remove('active');
            accountModal.classList.remove('active');
        }
    });

    // Logout Modal
    const logoutBtn = document.getElementById("logout-open-modal-btn");
    const logoutModal = document.getElementById("logout-confirmation-modal");
    const logoutCloseBtn = document.getElementById("logout-close-modal-btn");

    const logoutModalContainer = document.querySelector(".logout-modal-container");


    logoutBtn.addEventListener("click", function() {
        logoutModalContainer.classList.add('active');
        logoutModal.classList.add('active');
    });


    logoutCloseBtn.addEventListener("click", function() {
        logoutModalContainer.classList.remove('active');
        logoutModal.classList.remove('active');

    });

    // Close logout modal if clicked outside
    document.addEventListener("click", function(event) {
        if (!logoutModal.contains(event.target) && !logoutBtn.contains(event.target) && !logoutModalContainer.contains(event.target)) {
            logoutModalContainer.classList.remove('active');
            logoutModal.classList.remove('active');
        }
    });
});

$(document).ready(function() {
    
    // Set the token so that we are not rejected by server 
    var csrf_token = $('meta[name=csrf-token]').attr('content'); 

    // Configure ajaxSetup so that the CSRF token is added to the header of every request 
    $.ajaxSetup({ 
        beforeSend: function(xhr, settings) { 
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) { 
                xhr.setRequestHeader("X-CSRFToken", csrf_token); 
            } 
        } 
    });  


    $(document).on("click", "a.vote", function() {
        var clicked_obj = $(this);  
        var post_id = $(this).attr('id'); 
        var vote_type = $(this).children()[0].id;  
        console.log("Vote button clicked for post ID: " + post_id + ", Vote type: " + vote_type);   
        
        $.ajax({ 
            url: '/vote', 
            type: 'POST', 
            data: JSON.stringify({ post_id: post_id, vote_type: vote_type}), 
            contentType: "application/json; charset=utf-8",         
            dataType: "json", 
            success: function(response){ 
                console.log(response);  
                // Update the html rendered to reflect new count 
                // Check which count to update 
                if(vote_type == "up") { 
                    clicked_obj.children()[1].innerHTML = " " + response.upvotes; 
                }

                var thumbsUpIcon = clicked_obj.find('i');
        
                // If the thumbs up icon as 'far' and is pressed, go from filled to unfilled or opposite
                if (thumbsUpIcon.hasClass('far')) {
                    thumbsUpIcon.removeClass('far').addClass('fas');
                } else {
                    thumbsUpIcon.removeClass('fas').addClass('far');
                }
            }, 
            error: function(error){ 
                console.log(error); 
            } 
        }); 
    }); 

    // load the users posts in this function
    function loadPosts(username) {
        $.ajax({
            // send data to this url, which is defined as a path in views.py
            url: '/profile/' + username + '/posts',
            type: 'GET',
            // #content-area is a div in profile.html, this is saying to add to #content-area whatever views path returns
            // it then makes the button of which were on active to look different
            success: function(response) {
                $('#content-area').html(response);
                // this part changes the active state of each button which changes how it looks
                $('#posts-btn').addClass('active');
                $('#likes-btn').removeClass('active');
            },
            error: function(error) {
                console.log(error);
                $('#content-area').html('<p>Error loading posts</p>');
            }

        });
    }

    function loadLikes(username) {
        $.ajax({
            url: '/profile/' + username + '/likes',
            type: 'GET',
            success: function(response) {
                $('#content-area').html(response);
                $('#likes-btn').addClass('active');
                $('#posts-btn').removeClass('active');
                attachDeleteButtonListeners();
                attachCloseButtonListeners();
            },
            error: function(error) {
                console.log(error);
                $('#content-area').html('<p>Error loading liked posts</p>');
            }
        });
    }

    $('#posts-btn').on('click', function() {
        const username = $(this).data('username');
        loadPosts(username);
    });

    // if user presses like button, go to loadLikes function
    $('#likes-btn').on('click', function() {
        const username = $(this).data('username');
        loadLikes(username);
    });

    // makes posts appear straiht away as default
    const username = $('#posts-btn').data('username');
    if (username) {
        loadPosts(username);
    }

    // search bar functionality 
    // '#search_text' is the id for the seach textbox - every single time a key is pressed, data is sent to the URL provided
    $('#search_text').on("keyup", function() {
        let search_text = $(this).val().trim();
        
        // make the request using AJAX
        $.ajax({
            // set the URL the request is sent to (handled in views.py)
            url: "/search/" + encodeURIComponent(search_text),
            type: 'GET',
            // if succesful, the response it recieves from the URL is added to the div with id 'result' in search.html
            success: function(response) {
                $("#result").html(response);
            },
            // if error, add an error message to same div
            error: function(error) {
                console.log("Search error:", error);
                $("#result").html('<p>No results matching your search</p>');
            }

            
        });
    });

    const dropdowntoggle = document.getElementById('dropdown-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');



    dropdowntoggle.addEventListener('click', function(event) {
        if (dropdownMenu.classList.contains('active')) {

            dropdownMenu.classList.remove('active');
        } else {
            dropdownMenu.classList.add('active');
  
        }
    });

    document.addEventListener('click', function(event) {
        if (!dropdownMenu.contains(event.target) && !dropdowntoggle.contains(event.target)){
            dropdownMenu.classList.remove('active');
        }
    });
});



