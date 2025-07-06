var modal = document.getElementById("image-modal");
var bodyVar = document.querySelector("body");
var images = document.getElementsByClassName("img-image");
var modalImg = document.getElementById("img01");

// Opening modal by clicking on image
for (var i = 0; i < images.length; i++) {
    var img = images[i];
    img.onclick = function(evt) {
        modal.style.display = "flex";
        modalImg.src = this.src;

        for (var j = 0; j < images.length; j++) {
            images[j].style.pointerEvents = "none !important";
        }

        async function delayFadeIn() {
            modal.classList.add('fade-in-modal');
            bodyVar.classList.add('body-overflow-off');
            await sleep(600);
            modal.classList.remove('fade-in-modal');
        }
        delayFadeIn();
    }
}

// Closing modal
var span = document.getElementById("image-close");
span.onclick = function() {
    for (var j = 0; j < images.length; j++) {
        images[j].style.pointerEvents = "all !important";
    }
    async function delayFadeIn() {
        modal.classList.add('fade-out-modal');
        await sleep(600);
        modal.classList.remove('fade-out-modal');
        bodyVar.classList.remove('body-overflow-off');
        modal.style.display = "none";
    }
    delayFadeIn();
}

// Prevent right-click when modal is shown
document.querySelectorAll(".img-image").forEach(myImage => {
    myImage.addEventListener("contextmenu", e => e.preventDefault())
})

// Additional scroll reveal
const startImages = document.querySelectorAll(".img-image");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // console.log("Observed:", entry.target, "Visible:", entry.isIntersecting);
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

startImages.forEach(img => {
    observer.observe(img);
});