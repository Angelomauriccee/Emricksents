document.addEventListener("DOMContentLoaded", async () => {
    async function loadHTML(url, selector) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            
            const data = await response.text();
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element ${selector} not found!`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Load header and footer
    await Promise.all([
        loadHTML("/pages/header.html", "header"),
        loadHTML("/pages/footer.html", "footer")
    ]);

    console.log("Header & Footer loaded!");
});
