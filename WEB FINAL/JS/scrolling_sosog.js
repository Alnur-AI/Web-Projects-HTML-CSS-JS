window.addEventListener('scroll', function() {
    // Getting the page scroll position
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Setting a new background-position value depending on the scroll position
    var topvar = -scrollTop/2;
    var newPosition = "left " + 0 + "px top " + (topvar) + "px";
    
    // Applying a new value to the element .sign_sosog
    document.querySelector('.sign_sosog').style.backgroundPosition = newPosition;
});