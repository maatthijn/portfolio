// Prevent right-click
document.querySelectorAll(".img-image").forEach(myImage => {
    myImage.addEventListener("contextmenu", e => e.preventDefault())
})

// Reading time estimator
function estimateReadingTime(paragraphs) {
    const text = paragraphs.join(" ");
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.floor(wordCount / 250);
    return { wordCount, readingTime };
}

// Fetching blog data
fetch("data/blog.json")
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector(".blog-table tbody");

        const sortedBlogs = Object.entries(data).sort((a, b) => {
            return new Date(b[1].datetime) - new Date(a[1].datetime);
        });

        sortedBlogs.forEach(([key, blog], index) => {
            // Create table row
            const row = document.createElement("tr");
            const date_1 = dayjs(blog.datetime);
            const { wordCount, readingTime } = estimateReadingTime(blog.paragraphs);

            row.classList.add("blog-row");
            row.setAttribute("data-blog-id", key);
            row.innerHTML = `
                <td>${date_1.format("MMM D YYYY")}</td>
                <td><span data-bs-toggle="offcanvas" data-bs-target="#demo" class="table-blog-title">${blog.title}</span></td>
                <td>${blog.author}</td>
                <td>${readingTime} min</td>

            `;

            tbody.appendChild(row);

        });

        // Add click handler to table rows
        document.querySelectorAll(".blog-row").forEach(row => {
            row.addEventListener("click", () => {
                const blogId = row.getAttribute("data-blog-id");
                const blog = data[blogId];
                const date_2 = dayjs(blog.datetime);
                const blogContent = document.querySelector(".offcanvas-body");
                
                // Fill offcanvas
                document.getElementById("blog-title").innerText = blog.title;
                document.getElementById("blog-meta").innerText = `By ${blog.author} • ${date_2.format("MMM D YYYY, h:mm A")}`;
                
                const content = document.getElementById("blog-para");
                content.innerHTML = "";
                blog.paragraphs.forEach(p => {
                    const para = document.createElement("p");
                    para.textContent = p;
                    content.appendChild(para);
                });

                blogContent.scrollTo({top:0, behavior:"auto"});
            });
        });
    })
    .catch(err => console.error("Failed to load blog data:", err));
