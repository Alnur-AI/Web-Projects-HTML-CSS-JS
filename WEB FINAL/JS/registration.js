let database;


function enterAsGuest() {
  sessionStorage.setItem("Username", "Guest");
  window.location.href = './Pages/home.html';
}


async function loadDatabase() {
  try {
      const response = await fetch('Data/db.json');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      localStorage.removeItem("database");
      localStorage.setItem("database", JSON.stringify(data));
      return data;
  } catch (error) {
      console.error('Failed to fetch database: ', error);
      return null;
  }
}

function toggleForms(formId) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  if (formId === 'loginForm') {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
  } else if (formId === 'registerForm') {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
  }
}









async function saveDatabase(username, password) {
  try {
      
      const newId = database.accounts.length.toString();
      const Username = username;
      const Password = password;

      console.log(username);
      const newAccount = {
          id: newId,
          username: Username,
          password: Password
      };

      const url = 'http://localhost:3000/accounts'
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              Accept: "application/json",
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAccount)
      });

      if (!response.ok) {
          throw new Error('Failed to save database: ' + response.statusText);
      }

      localStorage.setItem("database", JSON.stringify(database));

      toastr.success("Account is registered!");

  } catch (error) {
      console.error('Failed to save database: ', error);
      toastr.error("Failed to register account. Please try again later.");
  }
}


// Function for checking the existence of an account by user name
function isUsernameTaken(username) {
  return database.accounts.some(account => account.username === username);
}











registerForm.addEventListener("submit", (e) => {

  
  
  if (registerForm.style.display === 'none') {
    return; 
  }
  e.preventDefault();
  
  /*if(!e.isDefaultPrevented()){
    e.returnValue = false;
  }*/


  const username = e.target.querySelector("#registerUsername").value;
  const password = e.target.querySelector("#registerPassword").value;
  
  registerAccount(username, encrypt(password));

});
function registerAccount(username, password) {

  if(username.trim() === '' ){
    toastr.error("Please, fill out username field");
    return;
  }
  if(password.trim() === ''){
    //console.log(password.trim());
    toastr.error("Please, fill out password field");
    return;
  }

  if (isUsernameTaken(username)) {
    toastr.error("Name of user is already used");
    return;
  }

  toastr.success("Account is registered!");
  database.accounts.push({ username, password });
  saveDatabase(username,password); 
}













// Event handler for sending the authorization form
loginForm.addEventListener("submit", (e) => {
  
  
  e.preventDefault();
  

  if (loginForm.style.display === 'none') {
    return; 
  }
  loadDatabase();
  const username = e.target.querySelector("#loginUsername").value;
  const password = e.target.querySelector("#loginPassword").value;

  loginAccount(username, password);
  
});
function loginAccount(username, password) {

  const account = database.accounts.find(accounts => accounts.username === username && decrypt(accounts.password) === password);

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
  }
}













  
  





  function encrypt(plainText) {
    let key = "key";
    let encrypted = CryptoJS.AES.encrypt(plainText, key);
    console.log( encrypted.toString() );
    return encrypted.toString();
  } 
  function decrypt(encryptedText) {
    let key = "key";
    let decrypted = CryptoJS.AES.decrypt(encryptedText, key);
    console.log( decrypted.toString(CryptoJS.enc.Utf8));
    return decrypted.toString(CryptoJS.enc.Utf8);
  }




  document.addEventListener("DOMContentLoaded", function() {

    sessionStorage.removeItem("Username");
    sessionStorage.removeItem("UserID");

    loadDatabase();
    toastr.info('1) loadDatabase(): Database loaded!');
    
    database = JSON.parse(localStorage.getItem("database"));
    toastr.info('2) Database localstorage initialized!');

    
});