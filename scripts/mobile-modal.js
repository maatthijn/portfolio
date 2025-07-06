// Displaying the mobile menu instead of desktop (using the same code as the modal in galleries)
const toggleBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('menu-modal');

// Opening modal
toggleBtn.onclick = function(evt) {
    mobileMenu.style.display = "flex";
    async function delayFadeIn() {
        mobileMenu.classList.add('fade-in-modal');
        await sleep(600);
        mobileMenu.classList.remove('fade-in-modal');
    }
    delayFadeIn();
}

// Closing modal
var menuSpan = document.getElementById("menu-close");
menuSpan.onclick = function() {
    async function delayFadeIn() {
        mobileMenu.classList.add('fade-out-modal');
        await sleep(600);
        mobileMenu.classList.remove('fade-out-modal');
        mobileMenu.style.display = "none";
    }
    delayFadeIn();
}
