const getSec = document.getElementById("getSection")
const getFullnameSec = document.getElementById("fullnameSec")
const getLoginError = document.getElementById("loginError")

function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (username != "" && password != "") {
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
                        if (result == "No, no Mr. Database nem lenni itthon!" || result == "No, no Mr. User nem lenni itthon!") {
                            setCookie("token", result, -1);
                            setCookie("username", username, -1);
                            getLoginError.innerHTML = `<p class="text-center">Nem jó felhasználónevet és/vagy jelszót adtál meg!<br>Kérjük próbáld újra!</p>`;
                        }
                        else {
                            window.location.href = "../";
                        }
                    }
                })
            }
        });
    }
    else {
        if (username == "" && password == "") {
            getLoginError.innerHTML = `<p class="text-center">Nem adtál meg felhasználónevet és jelszót sem!<br>Kérjük próbáld újra!</p>`;
        }
        else {
            if (username == "") {
                getLoginError.innerHTML = `<p class="text-center">Nem adtál meg felhasználónevet!<br>Kérjük próbáld újra!</p>`;
            }
            if (password == "") {
                getLoginError.innerHTML = `<p class="text-center">Nem adtál meg jelszót!<br>Kérjük próbáld újra!</p>`;
            }
        }
    }
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
    if (window.location.pathname.endsWith("/cnp/profile/login/")) {
        if (loggedIn()) {
            window.location.href = "/cnp/profile/";
            return;
        }
        if (getCookie("tokenError") == "True") {
            getLoginError.innerHTML = `<p class="text-center">Sajnáljuk!<br>Hiba történt a sütikkel!<br>Kérjük próbáld újra a bejelentkezést!</p>`;
            setCookie("tokenError", "", -1);
        }
    }
})

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("/cnp/profile/")) {
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
                let gotAnyError = result
                if (gotAnyError == "No, no Mr. Database nem lenni itthon!" || gotAnyError == "No, no Mr. User nem lenni itthon!") {
                    setCookie("token", "", -1);
                    setCookie("username", "", -1)
                    setCookie("tokenError", "True", 1)
                    window.location.href = "/cnp/profile/login/";
                }
                else {
                    let fullname = JSON.parse(result).user
                    getFullnameSec.innerHTML = `<div class="row"><div class="col-12 text-white text-center my-4"><h1>Üdvözlünk<br>${fullname}!</h1></div></div>`
                }
            }
        })
    }
})


function getStat(type) {
    if (getCookie("tokenError") != "True") {

        $.ajax({
            url: '../../../api.php',
            type: 'POST',
            data: {
                username: getCookie("username"),
                hash: getCookie("token"),
                type: type,
                password: "CnP_a_best_trust",
            },
            success: function (result) {
                if (result == "No, no Mr. User nem lenni itthon!" || result == "No, no Mr. Database nem lenni itthon!") {
                    setCookie("tokenError", "True", 1);
                    setCookie("token", "", -1);
                    setCookie("username", "", -1);
                    window.location.href = "./login/";
                }
                let data = JSON.parse(result)

                if (type == "team") {
                    getSec.innerHTML = `<div class="dashboard-card"><div class="dashboard-header"><h2>Csapat adatok</h2><p>${data.user}</p></div><div class="dashboard-grid"><div class="stat-box"><span>Csapat</span><strong>${data.csapat}</strong></div><div class="stat-box"><span>Csoport</span><strong>${data.csoport}</strong></div><div class="stat-box"><span>Pozíció</span><strong>${data.pozíció}</strong></div><div class="stat-box"><span>Pont</span><strong>${data.pont}</strong></div><div class="stat-box"><span>Osztály</span><strong>${data.osztály}</strong></div></div></div>`;
                }

                if (type == "score") {
                    getSec.innerHTML = `<div class="row"><div class="col-12"><h3 class="text-white">Csapatok összesített adatai:</h3><p class="text-white">Rendezés: pontszám szerinti</p><div class="table-responsive"><table class="table table-padding table-striped table-hover table-dark"><thead><tr><th>Helyezés</th><th>Csapatneve</th><th>Pontszám</th><th>Osztály</th></tr></thead><tbody id="tableLeaderboardBody"></tbody></table>`
                    let tLBbody = document.getElementById("tableLeaderboardBody");
                    data.forEach((score, index) => {
                        if (score.team != "Tesztike") {
                            tLBbody.innerHTML += `<tr><td>${index + 1}.</td><td>${score.team}</td><td>${score.pont}</td><td>${score.osztály}</tr>`;
                        }
                    }
                    )

                }
                if (type == "task") {
                    getSec.innerHTML = `<div class="col-12"><h3 class="text-white">Felvett feladatok listája:</h3>
                <p class="text-white">Rendezés: felvétel szerinti</p><div class="table-responsive"><table class="table table-padding text-center table-striped table-hover table-dark"><thead><tr><th>Sorszám</th><th>Cím</th><th>Nehézség</th><th>Megszerezhető pontszám</th><th>Lejárat</th><th>Rövid leírás</th><th>Státusz</th></tr></thead><tbody id="tableActiveTasksBody"></tbody></table>`;
                    let tATbody = document.getElementById("tableActiveTasksBody");

                    data.forEach((task, index) => {
                        tATbody.innerHTML += `<tr><td>${index + 1}.</td><td>${task.cim}</td><td>${task.lvl}</td><td>${task.megszerezheto_pont}</td><td>${task.lejarat}</td><td>${task.rövid_leiras}</td><td>${task.state}</td></tr>`;
                    }
                    )
                }
                if (type == "able_task") {
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
    else {
        setCookie("token", "", -1);
        setCookie("username", "", -1);
        window.location.href = "./login/";
    }
}


function logout() {
    setCookie("token", "", -1);
    setCookie("username", "", -1);
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
