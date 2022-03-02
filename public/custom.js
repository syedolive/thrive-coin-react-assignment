try {
    var password_selector = document.getElementById("password_toggle");
    var menuOpen = document.getElementById("open_menu");
    var closeMenu = document.getElementById("close-menu");
    var menuMain = document.querySelector(".nav-right");
    var overlay = document.querySelector(".overlay-content");

    menuOpen.addEventListener("click", () => {
        
        menuMain.classList.add("open");
        overlay.classList.add("show");
    });
    closeMenu.addEventListener("click",()=>{
        menuMain.classList.remove("open");
        overlay.classList.remove("show");
    })

    password_selector.addEventListener("click", (e) => {
        let target = e.target;
        let box = target.previousElementSibling;
        target.children[0].classList.toggle("fa-eye-slash");
        if (box.type === "password") {
            box.type = "text";
        } else {
            box.type = "password";
        }
    });
} catch (error) { }
