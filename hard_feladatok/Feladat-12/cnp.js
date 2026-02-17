const username = document.getElementById("username").value
const password = document.getElementById("password").value


$.ajax({
    url: '../api.php',
    type: 'POST',
    data: {
        username: username,
        password: password,
        type: 'login'
    },
    success: function (result) {
        console.log(result);
    }
});