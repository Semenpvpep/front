const inputDepartmentName = document.getElementById("inputDepartmentName");
const inputServiceItem = document.getElementById("inputServiceItem");
const inputDoctorName = document.getElementById("inputDoctorName");
const inputDatetime = document.getElementById("inputDatetime");

async function loadDeps() {
    let response = await fetch("http://localhost:8080/departments");
    let deps = await response.json();

    let strs = [];
    strs.push(`<option hidden disabled selected value="0">Вид стрижки</option>`);
    for (let dep of deps) {
        strs.push(`<option value="${dep.id}">${dep.depname}</option>`)
    }

    inputDepartmentName.innerHTML = strs.join('');
}

async function updateOptions(depId) {
    let response = await fetch(`http://localhost:8080/service-items?depId=${depId}`);
    let services = await response.json();

    let strs = [];
    strs.push(`<option hidden disabled selected value="0">Тип услуги</option>`);
    for (let service of services) {
        strs.push(`<option value="${service.id}">${service.servicename}</option>`)
    }

    inputServiceItem.innerHTML = strs.join('');

    response = await fetch(`http://localhost:8080/doctors?depId=${depId}`);
    let doctors = await response.json();

    strs = [];
    strs.push(`<option hidden disabled selected value="0">Выберите парикхмахера</option>`);
    for (let doctor of doctors) {
        strs.push(`<option value="${doctor.id}">${doctor.doctorname}</option>`)
    }

    inputDoctorName.innerHTML = strs.join('');
}

loadDeps();
inputDepartmentName.onchange = (event) => {
    updateOptions(event.target.value);
}

const form = document.getElementById("formApp");
const errMsg = document.getElementById("errMsg");

async function sendData() {
    const formData = new FormData(form);
    let fields = {}
    formData.forEach(function (value, key) {
        fields[key] = value;
    });
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedUser);

    let requestBody = {
        serviceItem: {
            id: Number(fields["service"])
        },
        expectedAt: fields["datetime"],
        doctor: {
            id: Number(fields["doctor"])
        },
        user: {
            id: Number(loggedUser.userId)
        }
    }

    console.log(requestBody);

    try {
        const response = await fetch("http://localhost:8080/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${loggedUser.authToken}`
            },
            body: JSON.stringify(requestBody),
        });

        

        if (response.ok) {
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