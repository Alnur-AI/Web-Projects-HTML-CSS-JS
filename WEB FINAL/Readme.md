## How to open

At the time of reporting, according to subjective perception, the task was completed by 95%. 
1) json-server --port 3000 Data/db.json  
2) open index.html with liveserver

## The following types of work were carried out:

1) The html, css format contained in the figma prototype was completely recreated, located at the following link: https://www.figma.com/design/S2XdLxDJu9A1N3jcrIsyMh/Group-16-Term-Web-Project?m=dev&node-id= 0%3A1&t=lEBOh2HkiVk8PYjM-1

2) Partially implemented JS and JSON functionality:
2.1) User registration and authorization (currently works regardless of JSON and the functionality is partially broken)
2.2) Parsing data from db.json containing information on articles. Articles stored in the db.json database appear on the home page
2.3) Functioning nav_bar and other interactive interface elements
2.4) Animated wallpapers from the following authors were used:

2.4.1) BACKGROUND LOGIN SOURCE 6) Basic Landscape Background Animation
https://alvarotrigo.com/blog/animated-backgrounds-css/

2.4.2) NAVBAR ORIGINAL <a href="https://dribbble.com/shots/5844983-Sub-Nav-Interaction-Concept" class="signature" target="_blank">
Designed by Carson Monroe</a>

2.5) The main and secondary colors were used #ffffff and #bdbdbd respectively. Black color was used exclusively for text. Also, to highlight information, bright colors were used, which did not merge with the white background due to the strong brightness.

## What work still needs to be done:

1) Improve the visual style of the navbar
2) Perhaps start storing photos in the database in base64 format (I avoided this method because the string size was too large)
3) Fix choosing photo for article
4) Add more functionality depending on the next task


# Work that was complited after Deliverable #2: 

1. Overview: - In this part Your project must be functional i.e everything is working perfectly
	1.1 You can login, register in index.html page (registration.js)
	1.2 You can CRUD every post if you write it (sessionUsername and postUsername should 	be equal)
	1.3 You can open every page in site
2. File Structure:
	2.1 Used recommended file structure 
3. JS Instructions:
	3.1 Used json-server –-watch ./db.json  in port 3000
	3.2 Used fetch api from javascript for CRUD 
	(article.js, registration.js, parse_json.js, new_article.js)

# CREATE
```
async function saveDatabase(username, password) {}
async function publishArticle(){}
async function loadDatabase() {}
```
# UPDATE
```
async function handleEditButtonClick(postId) {}
```
# DELETE
```
async function handleDeleteButtonClick(postId) {}
```
## AUTHENTICATION 
Instructions for Basic Authentication Using JSON-Server 

# 4. Handle Form Submission
4.1 Write JavaScript to capture the form's submit event.
	In index.html:
```
	<form id="loginForm" class="form">
	<button onclick="toggleForms('registerForm')">Register</button>
	<form id="registerForm" class="form" style="display: none;">
	<button type="submit" id = "submitLog">Register now!</button>
```
4.2 Prevent the default form submission behavior to handle it with JavaScript
	In registration.js:
 ```
	registerForm.addEventListener("submit", (e) => {
	e.preventDefault();
	loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
```	
4.3 Try encoding with base64 or any other one available.
```
	function encrypt(plainText) {
		let key = "key";
 		let encrypted = CryptoJS.AES.encrypt(plainText, key);
 		console.log( encrypted.toString() );
 		return encrypted.toString();
 	function decrypt(encryptedText) {
 		let key = "key";
 		let decrypted = CryptoJS.AES.decrypt(encryptedText, key);
 		console.log( decrypted.toString(CryptoJS.enc.Utf8));
 		return decrypted.toString(CryptoJS.enc.Utf8);
```
4.4 Find a way to hash the user password before saving to database (Security)
```
	function loginAccount(username, password) {
		const account = database.accounts.find(accounts => 
		accounts.username === username 		
		&& decrypt(accounts.password) === password);
	registerForm.addEventListener("submit", (e) => {
		registerAccount(username, encrypt(password));
```
# 5. Perform Authentication Check
5.1 Send a GET request to the JSON-Server to retrieve the list of users.
   ```
	async function loadDatabase()
```
5.2 Verify the submitted username and password against the user data from the server.
```
	function loginAccount(username, password) {
	  const account = database.accounts.find(accounts => 
		accounts.username === username && 	
		decrypt(accounts.password) === password);
	  if (account) {
 	   	toastr.success("Access granted!");
 	 	  sessionStorage.setItem("Username", username);
  	 	 sessionStorage.setItem("UserID", account.id);
 	 	  window.location.href='./Pages/home.html'
 	   	return;
 	 }else if(username.trim() === '' || password.trim() === ''){
 	 	  toastr.error("Please, fill out all required fields");
  	  return;
  	}
  	else{
    		toastr.error("Wrong username or password!");
    	return;
     ```
# 6. Store Session Information 
If authentication is successful, use either `localStorage` or `sessionStorage` to store session information. Store relevant session data such as the user's ID or username. 
```
	sessionStorage.setItem("Username", username);
   	sessionStorage.setItem("UserID", account.id);
	database = JSON.parse(localStorage.getItem("database"));
```
# 7. Access Protected Content
7.1 Use the stored session data to manage user access to protected pages or content.
	- You can’t access “new_atricle.html” legally if you are enter on site as a guest
	- You can’t edit or delete other’s posts in “article.html”. Only your own posts
7.2 Redirect the user to a protected page or display a success message upon successful login
	In registration.js
```
	function loginAccount(username, password)
		window.location.href='./Pages/home.html'
```
	In new_article.js
 ```
	document.querySelector('.fa-paper-plane').closest('.article_button').addEventListener('click', 		(e) => {
		e.preventDefault();
 		publishArticle();
 		window.location.href='./home.html';
```
# 8. Handle Authentication Failures 
8.1 If authentication fails, display an error message to the user.
8.2 Ensure the form is ready for the user to try logging in again.
   ```
	function loginAccount(username, password) {
		toastr.error("Please, fill out all required fields");
		toastr.error("Wrong username or password!");
	function registerAccount(username, password) {
		toastr.error("Please, fill out username field");
		toastr.error("Please, fill out password field");
		toastr.error("Name of user is already used");
```

# 9 End Session
9.1 Implement functionality to clear the session information from `localStorage` or `sessionStorage` when the user logs out.
	In registration.js
	document.addEventListener("DOMContentLoaded", function() {
		sessionStorage.removeItem("Username");
 		sessionStorage.removeItem("UserID");
 	async function loadDatabase() {
		localStorage.removeItem("database");
9.2 Redirect the user to the login page or display a logout confirmation message.
	In every page in navbar:
	<ul class="subnavigation">
 	<li><a class="link" id = "navSignInOut" href="../index.html">Sign In</a></li>
