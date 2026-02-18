const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const profileNavSec = document.getElementById("profile-nav-section")
const navbarID = document.getElementById("navbar")


document.addEventListener("DOMContentLoaded", function () {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
        navbarID.classList.toggle("NO-navbar-radius")
    });
})

function loggedIn() {
    return getCookie("token") != "";

}

document.addEventListener("DOMContentLoaded", function () {
    if (loggedIn()) {
        profileNavSec.innerHTML = `<a href="./profile/" id="profile-a">Profilom</a>`
    }
    if (!loggedIn()) {
        profileNavSec.innerHTML = `<a href="./profile/login/" id="profile-a">Bejelentkezés</a>`
    }
})


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
