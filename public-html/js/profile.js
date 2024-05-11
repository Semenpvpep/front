const username = document.getElementById("username");
const appointmentsEl = document.querySelector(".appointments");

async function getData() {
    try {
        let user = JSON.parse(localStorage.getItem("user"));
        username.textContent = user.username;
        const response = await fetch(`http://localhost:8080/appointments?userId=${user.userId}`, {
            headers: {
                "Authorization": "Basic " + user.authToken
            }
        });

        if (response.ok) {
            const appointments = await response.json();
            let strs = appointments.map((a) => {
                return `
                    <li class="appointment">
                        <div class="appointment-service">
                            <h5 class="appointment-service-name">${a.serviceItem.servicename} <span class="appointment-service-dep">(${a.serviceItem.department.depname})</span></h5>
                            <p>Цена: <span class="appointment-price">${a.serviceItem.price} р</span></p>
                        </div>
                        <p>Ваш барбер: <span class="appointment-doctor">${a.doctor.doctorname}</span></p>
                        <p>Время: <span class="appointment-datetime">${a.expectedAt.split('T').join(' ')}</span></p>
                    </li>`
            })

            appointmentsEl.innerHTML = strs.join('');
        } else {
            appointmentsEl.innerHTML = `<h4 style="color: grey;">Не удалось получить данные</h4>`
        }
    } catch (e) {
        console.error(e);
    }
}

getData();
