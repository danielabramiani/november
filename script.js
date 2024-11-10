async function load(elementId, path){
  const response = await fetch(path);
  const template = await response.text();
  document.getElementById(elementId).innerHTML = template;
}

load("nav", "nav.html");

function register(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (name && email && password){
    const user = JSON.parse(localStorage.getItem("users")) || [];
    user.push({name, email, password});
    localStorage.setItem("users", JSON.stringify(user));
    alert("Registration Done");
    window.location.href = "login.html";
  }
  else{
    alert("fill all fields");
  }
}

function login(){
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user  = users.find(u => u.email === email && u.password === password);

  if (user){
    localStorage.setItem("currentUSer", JSON.stringify(user));
    window.location.href = user.isAdmin ? "admin.html" : "index.html";
  }
  else{
    alert("invalid email or password");
  }
}

function checkAdminAcces() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || !currentUser.isAdmin){
    alert("Access denied. Admins only.");
    window.location.href = "index.html";
  }
}

if (window.location.pathname.includes("admin.html")) {
  checkAdminAcces();
}

async function fetchExchange(){
  const currencyPair = document.getElementById("currencyPair").value;
  try{
    const response = await fetch("");

    if (!response.ok) {
      throw new Error("failef fetch");
    }
    const data = await response.json();
    const echangeRate = data.conversation_rate;
    document.getElementById("exchangeRate").textCOntent = "Exchange Rate: 1 ${base} = ${exchangeRate} ${target}";
  } catch (error){
    console.log(error);
    document.getElementById("echangeRate").textContent = "Error fetching exchange rate. Please try again later.";
  }
}