const form = document.getElementById("formLog");
const errMsg = document.getElementById("errMsg");

async function sendData() {
    const formData = new FormData(form);
    let requestBody = {}
    formData.forEach(function (value, key) {
        requestBody[key] = value;
    });

    try {
        const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "profile.html";
        } else {
            errMsg.style.display = "block";
        }
    } catch (e) {
        console.error(e);
    }
}

// Take over form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});