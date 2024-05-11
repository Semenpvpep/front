const serviceWrap = document.getElementById("service-wrap");

async function getData() {
    try {
        const response = await fetch("http://localhost:8080/departments");

        if (response.ok) {
            const deps = await response.json();
            let strs = [];
            for (let dep of deps) {
                let innerResp = await fetch(`http://localhost:8080/service-items?depId=${dep.id}`);
                let services = await innerResp.json();

                let innerStrs = services.map((service) => {
                    return `
                    <li class="service">
                        <h5 class="service-name">${service.servicename}</h5>
                        <p class="service-desc">
                        ${service.serdesc}
                        </p>
                        <p>Цена: <span class="price">${service.price} р</span></p>
                    </li>`
                })

                strs.push(`
                <div>
                <div class="box ">
                  <div class="img-box">
                    <img src="images/t1.png" alt="">
                  </div>
                  <div class="detail-box">
                    <h4>
                      ${dep.depname}
                    </h4>
                    <p>
                      ${dep.depdesc}
                    </p>
                  </div>
                  <ul class="services">
                    ${innerStrs.join('')}
                  </ul>
                </div>
              </div>`);
            }

            serviceWrap.innerHTML = strs.join('');
        } else {
            serviceWrap.innerHTML = `<h4 style="color: red;">Не удалось получить данные</h4>`
            return
        }
    } catch (e) {
        console.error(e);
    }
}

getData();