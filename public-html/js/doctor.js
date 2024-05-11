const doctorsContainer = document.getElementById("doctors-container");

async function getData() {
    try {
        const response = await fetch("http://localhost:8080/doctors");
    
        if (response.ok) {
            const doctors = await response.json();
            let strs = doctors.map((doctor) => {
                return `
                    <div class="doctor-card ">
                        <span class="doctor-avatar">🩺</span>
                        <h4 class="doctor-name">${doctor.doctorname}</h4>
                        <p><b>Направление: </b><span class="doctor-dep">${doctor.department.depname}</span></p>
                    </div>`
            })
    
            doctorsContainer.innerHTML = strs.join('');
        } else {
            doctorsContainer.innerHTML = `<h4 style="color: red;">Не удалось получить данные</h4>`
        }
    } catch (e) {
        console.error(e);
    }
}

getData();