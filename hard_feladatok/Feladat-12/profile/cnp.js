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

function getTeam() {
    $.ajax({
        url: '../../api.php',
        type: 'POST',
        data: {
            username: getCookie("username"),
            hash: getCookie("token"),
            type: 'team',
            password: "CnP_a_best_trust",
        },
        success: function (result) {
            let data = JSON.parse(result)
            getSec.innerHTML = "<h1>Csapatnév:</h1>";
            let p = document.createElement("p");
            p.textContent = data.csapat;
            getSec.appendChild(p);
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
