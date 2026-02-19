const getSec = document.getElementById("getSection")
const getFullnameSec = document.getElementById("fullnameSec")

function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    $.ajax({
        url: '../../../api.php',
        type: 'POST',
        data: {
            username: username,
            password: password,
            type: 'login'
        },
        success: function (result) {
            setCookie("token", result);
            setCookie("username", username);
            window.location.href = "../";

            /*$.ajax({
                url: '../../api.php',
                type: 'POST',
                data: {
                    username: username,
                    hash: token,
                    type: "team",
                    password: "1234565"
                },
                success: function (result) {
                    console.log(result);
                    eredmeny = JSON.parse(result);
                    let team = document.createElement("p");
                    document.cookie = team
                    team.textContent = team.team;
                    tartalom.appendChild(team);
                }
            })*/
        }

    });
}

function loggedIn() {
    return getCookie("token") != "";
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("/cnp/profile/")) {
        if (!loggedIn()) {
            window.location.href = "/cnp/profile/login/";
            return;
        }
    }
})

document.addEventListener("DOMContentLoaded", function () {
    if (loggedIn()) {
        $.ajax({
            url: '../../../api.php',
            type: 'POST',
            data: {
                username: getCookie("username"),
                hash: getCookie("token"),
                type: "team",
                password: "CnP_a_best_trust",
            },
            success: function (result) {
                let fullname = JSON.parse(result).user
                getFullnameSec.innerHTML = `<div class="row"><div class="col-12 text-white text-center my-4"><h1>Üdvözlünk<br>${fullname}!</h1></div></div>`
            }
        })
    }
})


function getStat(tipus) {
    $.ajax({
        url: '../../../api.php',
        type: 'POST',
        data: {
            username: getCookie("username"),
            hash: getCookie("token"),
            type: tipus,
            password: "CnP_a_best_trust",
        },
        success: function (result) {
            let data = JSON.parse(result)

if (tipus == "team") {
    getSec.innerHTML = `<div class="dashboard-card"><div class="dashboard-header"><h2>Csapat adatok</h2><p>${data.user}</p></div><div class="dashboard-grid"><div class="stat-box"><span>Csapat</span><strong>${data.csapat}</strong></div><div class="stat-box"><span>Csoport</span><strong>${data.csoport}</strong></div><div class="stat-box"><span>Pozíció</span><strong>${data.pozíció}</strong></div><div class="stat-box"><span>Pont</span><strong>${data.pont}</strong></div><div class="stat-box"><span>Osztály</span><strong>${data.osztály}</strong></div></div></div>`;
}

                /* Old approach
                    let h3 = document.createElement("h3");
                    h3.textContent = data.csapat;
                    getSec.appendChild(h3);   */

            
            if (tipus == "score") {
                getSec.innerHTML = `<div class="row"><div class="col-12"><h3 class="text-white">Csapatok összesített adatai:</h3><p class="text-white">Rendezés: pontszám szerinti</p><div class="table-responsive"><table class="table table-padding table-striped table-hover table-dark"><thead><tr><th>Helyezés</th><th>Csapatneve</th><th>Pontszám</th><th>Osztály</th></tr></thead><tbody id="tableLeaderboardBody"></tbody></table>`
                let tLBbody = document.getElementById("tableLeaderboardBody");
                data.forEach((task, index) => {
                    tLBbody.innerHTML += `<tr><td>${index + 1}.</td><td>${data[index + 1].team}</td><td>${data[index + 1].pont}</td><td>${data[index + 1].osztály}</tr>`;
                }
                )

            }
            if (tipus == "task") {
                getSec.innerHTML = `<div class="col-12"><h3 class="text-white">Felvett feladatok listája:</h3>
                <p class="text-white">Rendezés: felvétel szerinti</p><div class="table-responsive"><table class="table table-padding text-center table-striped table-hover table-dark"><thead><tr><th>Sorszám</th><th>Cím</th><th>Nehézség</th><th>Megszerezhető pontszám</th><th>Lejárat</th><th>Rövid leírás</th><th>Státusz</th></tr></thead><tbody id="tableActiveTasksBody"></tbody></table>`;
                let tATbody = document.getElementById("tableActiveTasksBody");

                data.forEach((task, index) => {
                    tATbody.innerHTML += `<tr><td>${index + 1}.</td><td>${task.cim}</td><td>${task.lvl}</td><td>${task.megszerezheto_pont}</td><td>${task.lejarat}</td><td>${task.rövid_leiras}</td><td>${task.state}</td></tr>`;
                }
                )
            }
            if (tipus == "able_task") {
                getSec.innerHTML = `<div class="col-12"><h3 class="text-white">Elérhető feladatok listája:</h3>
                <p class="text-white">Rendezés: hozzáadás szerinti</p><div class="table-responsive"><table class="table text-center table-padding table-striped table-hover table-dark"><thead><tr><th>Sorszám</th><th>Cím</th><th>Nehézség</th><th>Megszerezhető pontszám</th><th>Lejárat</th><th>Rövid leírás</th></tr></thead><tbody id="tableAvailableTasksBody"></tbody></table>`;
                let tATbody = document.getElementById("tableAvailableTasksBody");

                data.forEach((task, index) => {
                    tATbody.innerHTML += `<tr><td>${index + 1}.</td><td>${task.cim}</td><td>${task.lvl}</td><td>${task.megszerezheto_pont}</td><td>${task.lejarat}</td><td>${task.rövid_leiras}</td></tr>`;
                }
                )
            }
        }
    });
}


function logout() {
    hash = getCookie("token")
    username = getCookie("username")
    user = username
    token = hash
    setCookie("token", hash, -1);
    setCookie("username", username, -1);
    setCookie("user", username, -1);
    setCookie("hash", hash, -1);
    window.location.href = "../";
}

function setCookie(cname, cvalue, exdays = 1) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
