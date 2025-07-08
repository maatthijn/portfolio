document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload

    const form = e.target;
    const formData = new FormData(form);

    fetch("https://formspree.io/f/xqaboogp", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Your message has been sent!");
            form.reset();
        } else {
            alert("Failed to send. Please try again.");
        }
    }).catch(error => {
        alert("Error occurred. Please check your connection.");
    });
});