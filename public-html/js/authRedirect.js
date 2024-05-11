let logged = localStorage.getItem("user");
if (logged == null) {
    window.location.href = "login.html";
}