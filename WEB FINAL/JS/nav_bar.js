let Username = sessionStorage.getItem("Username") || "Guest";
var services = document.getElementById('signin');

services.addEventListener('click', function() {
  $(services).toggleClass("active");
  $(".parent:not(#signin)").toggleClass("invisible");
}, false);





document.addEventListener("DOMContentLoaded", () => {

  const navAccNameElement = document.getElementById("navAccName");
  const navSignInOutElement = document.getElementById("navSignInOut");
  const navNewPostElement = document.getElementById("navNewPost");

  /*
  if (Username && Username.trim() !== "") {
    navAccNameElement.textContent = `${Username} `;
    navAccNameElement.innerHTML += '<i class="fas fa-user"></i>';
    navSignInOutElement.textContent = "Sign Out";
  } else{
    navAccNameElement.textContent =  `${Username} `;
    navAccNameElement.innerHTML += '<i class="fas fa-user"></i>';
    navSignInOutElement.textContent = "Sign In";
    navNewPostElement.style.display = "none";
  }
  */

  if (Username !== "Guest") {
    navAccNameElement.textContent = `${Username} `;
    navAccNameElement.innerHTML += '<i class="fas fa-user"></i>';
    navSignInOutElement.textContent = "Sign Out";
  } else {
    navAccNameElement.textContent = "Guest ";
    navAccNameElement.innerHTML += '<i class="fas fa-user"></i>';
    navSignInOutElement.textContent = "Sign In";
    navNewPostElement.style.display = "none";
  }

  //toastr.info(`Signed in as ${Username}`);

});