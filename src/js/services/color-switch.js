const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");

let getMode = localStorage.getItem("mode");

if (getMode && getMode === "dark") {
    body.classList.add("dark");
    toggle.classList.add("active");
}


toggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (!body.classList.contains("dark")) {

        return localStorage.setItem("mode", "light");
    }
    localStorage.setItem("mode", "dark");
});



toggle.addEventListener("click", () => toggle.classList.toggle("active"));


// Mobile switcher


const toggleMobile = document.querySelector(".mobile__toggle");

if (getMode && getMode === "dark") {
    body.classList.add("dark");
    toggleMobile.classList.add("active");
    
}


toggleMobile.addEventListener("click", () => {
    body.classList.toggle("dark");
    
    
    if (!body.classList.contains("dark")) {
        return localStorage.setItem("mode", "light");
        
    }
    localStorage.setItem("mode", "dark");

});

toggleMobile.addEventListener("click", () => toggleMobile.classList.toggle("active"));



