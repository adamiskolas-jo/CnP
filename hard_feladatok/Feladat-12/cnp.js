function login() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const tartalom  = document.getElementById("tartalom")

    $.ajax({
        url: '../../api.php',
        type: 'POST',
        data: {
            username: username,
            password: password,
            type: 'login'
        },
        success: function (result) {
            console.log(result);
            const token = result;
            $.ajax({
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
                    let bekezdes = document.createElement("p");
                    bekezdes.textContent=eredmeny.user;
                    tartalom.appendChild(bekezdes);
                }
            })
        }
    });
}

