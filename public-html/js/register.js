const form = document.getElementById("formReg");
const errMsg = document.getElementById("errMsg");

async function sendData() {
    const formData = new FormData(form);
    let requestBody = {}
    formData.forEach(function (value, key) {
        requestBody[key] = value;
    });

    try {
        const response = await fetch("https://back-06ez.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            form.innerHTML = `<h4 style="color: green;">Регистрация прошла успешно</h4>`
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