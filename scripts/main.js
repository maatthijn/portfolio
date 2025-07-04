// Sleeping function to delaying
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Events for each time a page's loaded
window.addEventListener("load", () => {
    // Timeout for no clicking due to opening animation
    setTimeout(() => {
        const blocker = document.getElementById("content-blocker");
        if (blocker) blocker.remove();
    }, 2000);

    // Setting up contents to 0 opacity
    var animations = this.document.getElementsByClassName("seq-anim");
    for (var i = 0; i < animations.length; i++) {
        animations[i].style.opacity = "0%";
    }

    // Create an opening animation in sequences
    async function delayTime() {
        for (var i = 0; i < animations.length; i++) {
            animations[i].classList.add('seq-anim-run');
            await sleep(2000/(animations.length));
        }
    }
    delayTime()
});

// Refreshing to the top of the page
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});