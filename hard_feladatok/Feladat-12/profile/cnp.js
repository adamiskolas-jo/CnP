const getSec = document.getElementById("getSection")


function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    $.ajax({
        url: '../../api.php',
        type: 'POST',
        data: {
            username: username,
            password: password,
            type: 'login'
        },
        success: function (result) {
            setCookie("token", result);
            setCookie("username", username);
            window.location.href = "./";

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

function getTeam(tipus) {
    $.ajax({
        url: '../../api.php',
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
                getSec.innerHTML = `<div class="row"><div class="col-12 col-md-4 col-lg-6"><h1>Üdvözlünk ${data.user}!</h1></div><div class="col-12 col-md-8 col-lg-6"><h3>Csapat adatok:</h3><div class="table-responsive"><table class="table table-striped table-hover table-success rounded"><tbody><tr><th>Csapat</th><td>${data.csapat}</td></tr><tr><th>Csoport</th><td>${data.csoport}</td></tr><tr><th>Pozíciód</th><td>${data.pozíció}</td></tr><tr><th>Pont</th><td>${data.pont}</td></tr><tr><th>Osztály</th><td>${data.osztály}</td></tr></tbody></table></div></div></div>`;

                /* Old approach
                    let h3 = document.createElement("h3");
                    h3.textContent = data.csapat;
                    getSec.appendChild(h3);   */

            }
            if (tipus == "score") {
                getSec.innerHTML = `<div class="row"><div class="col-12"><h3>Csapat adatok:</h3><div class="table-responsive"><table class="table table-striped table-hover table-success round"><thead><tr><th>Helyezés</th><th>Csapatneve</th><th>Pontszám</th><th>Osztály</th></tr></thead><tbody><tr><td>1</td><td>${data[0].team}</td><td>${data[0].pont}</td><td>${data[0].osztály}</td></tr><tr><td>2</td><td>${data[1].team}</td><td>${data[1].pont}</td><td>${data[1].osztály}</td></tr><tr><td>3</td><td>${data[2].team}</td><td>${data[2].pont}</td><td>${data[2].osztály}</td></tr><tr><td>4</td><td>${data[3].team}</td><td>${data[3].pont}</td><td>${data[3].osztály}</td></tr><tr><td>5</td><td>${data[4].team}</td><td>${data[4].pont}</td><td>${data[4].osztály}</td></tr><tr><td>6</td><td>${data[5].team}</td><td>${data[5].pont}</td><td>${data[5].osztály}</td></tr><tr><td>7</td><td>${data[6].team}</td><td>${data[6].pont}</td><td>${data[6].osztály}</td></tr><tr><td>8</td><td>${data[7].team}</td><td>${data[7].pont}</td><td>${data[7].osztály}</td></tr><tr><td>9</td><td>${data[8].team}</td><td>${data[8].pont}</td><td>${data[8].osztály}</td></tr><tr><td>10</td><td>${data[9].team}</td><td>${data[9].pont}</td><td>${data[9].osztály}</td></tr><tr><td>11</td><td>${data[10].team}</td><td>${data[10].pont}</td><td>${data[10].osztály}</td></tr><tr><td>12</td><td>${data[11].team}</td><td>${data[11].pont}</td><td>${data[11].osztály}</td></tr><tr><td>13</td><td>${data[12].team}</td><td>${data[12].pont}</td><td>${data[12].osztály}</td></tr><tr><td>14</td><td>${data[13].team}</td><td>${data[13].pont}</td><td>${data[13].osztály}</td></tr><tr><td>15</td><td>${data[14].team}</td><td>${data[14].pont}</td><td>${data[14].osztály}</td></tr><tr><td>16</td><td>${data[15].team}</td><td>${data[15].pont}</td><td>${data[15].osztály}</td></tr><tr><td>17</td><td>${data[16].team}</td><td>${data[16].pont}</td><td>${data[16].osztály}</td></tr></tbody></table></div></div></div>`;
            }
        }
    })
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
