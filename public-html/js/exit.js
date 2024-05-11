const exitBtn = document.getElementById("exitBtn");
exitBtn.onclick = () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}