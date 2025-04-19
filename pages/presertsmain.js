document.addEventListener("DOMContentLoaded", () => {
    function loadHTML(url, selector) {
        return fetch(url)
            .then(response => response.text())
            .then(data => {
                let element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                    return true; // Return success
                } else {
                    console.error(`Element ${selector} not found!`);
                    return false;
                }
            });
    }

    Promise.all([
        loadHTML("/pages/header.html", "header"),
        loadHTML("/pages/footer.html", "footer")
    ]).then(() => {
        console.log("Header & Footer loaded! Now loading scripts...");

        // ✅ Fire event to signal that header & footer are fully loaded
        document.dispatchEvent(new Event("presetLoaded"));

        // ✅ Now that the header is loaded, update the cart badge
        updateCartBadge();

        // ✅ Load other scripts
        loadScript("/pages/allproducts.js");
        loadScript("/script.js");
        loadScript("/pages/presertsmain.js");
    });

    function loadScript(src) {
        let script = document.createElement("script");
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    }

    function updateCartBadge() {
        let cartBadge = document.querySelector(".cart-badge");
        if (!cartBadge) {
            console.error("Cart badge not found!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = "block";
        } else {
            cartBadge.style.display = "none";
        }
    }

    // ✅ Also update the cart badge when an item is added or removed
    document.addEventListener("cartUpdated", updateCartBadge);
});
