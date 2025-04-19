



document.addEventListener("DOMContentLoaded", function () {
    const pathArray = window.location.pathname.split("/");
    const productSlug = pathArray[pathArray.length - 1].replace(".html", "").toLowerCase();

    fetch("/data/products.json")
        .then(response => response.json())
        .then(products => {
            console.log("Page URL slug:", productSlug);

            function convertToSlug(name) {
                return name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-") // Replace spaces with hyphens
                    .replace(/[^\w-]/g, ""); // Remove special characters except hyphens
            }

            // Print all slugs for debugging
            products.forEach(p => console.log("Converted JSON Slug:", convertToSlug(p.name)));

            const product = products.find(p => convertToSlug(p.name) === productSlug);

            if (product) {
                console.log("Matched Product:", product);
                document.title = product.name;
                
                document.getElementById("product-name").textContent = product.name;
                document.getElementById("product-price").textContent = product.price;
                document.getElementById("product-description").textContent = product.description;
                
                // ✅ Set Product Type
                document.getElementById("product-type").textContent = `Type: ${product.type}` || "Fragrance";

                // ✅ Fix for Image Selection
                const image1 = product.images?.image1 || product.image || "images/placeholder.jpg";
                const image2 = product.images?.image2 || "";

                document.getElementById("main-image").src = image1;
                document.getElementById("main-image").alt = product.name;

                if (image2) {
                    document.getElementById("secondary-image").src = image2;
                    document.getElementById("secondary-image").style.display = "block";
                }

                // ✅ Set Breadcrumb Navigation
                const breadcrumb = document.querySelector(".breadcrumb");
                breadcrumb.innerHTML = `
                    <a href="/">Home</a> &gt; 
                    <a href="/pages/allproducts.html">All Products</a> &gt; 
                    <span>${product.name}</span>
                `;
            } else {
                console.warn("No matching product found for:", productSlug);
                document.querySelector("main").innerHTML = "<p>Product not found.</p>";
            }
        })
        .catch(error => console.error("Error loading product:", error));
});


// fetch("/data/products.json")
//   .then(response => response.json())
//   .then(products => {
//     // Get product slug from URL
//     const pathArray = window.location.pathname.split('/');
//     const productSlug = pathArray[pathArray.length - 1].replace(".html", "");

//     // Find the matching product in the JSON
//     const product = products.find(p => 
//       p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === productSlug
//     );

//     if (!product) {
//       console.error("No matching product found for:", productSlug);
//       return;
//     }

//     // Populate product details
//     document.getElementById("product-name").textContent = product.name;
//     document.getElementById("product-title").textContent = product.name;
//     document.getElementById("product-name-heading").textContent = product.name;
//     document.getElementById("product-type").textContent = product.type;
//     document.getElementById("product-price").textContent = product.price;
//     document.getElementById("product-description").textContent = product.description;

//     // Handle different image structures in the JSON
//     let imageUrl = product.image || product.images?.image1 || "images/placeholder.jpg";
//     document.getElementById("main-image").src = imageUrl;

//     // Update breadcrumb navigation
//     document.querySelector(".breadcrumb span").textContent = product.name;
//   })
//   .catch(error => console.error("Error loading product:", error));



//tabs

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const target = this.getAttribute("data-tab");

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to the clicked tab and its content
            this.classList.add("active");
            document.getElementById(target).classList.add("active");
        });
    });
});


//carousel for related poducts
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    fetch("/data/products.json")
        .then(response => response.json())
        .then(products => {
            const currentProductSlug = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();

            function convertToSlug(name) {
                return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            }

            const currentProduct = products.find(p => convertToSlug(p.name) === currentProductSlug);

            if (currentProduct) {
                const currentPrice = parseFloat(currentProduct.price.replace(/₦|,/g, ""));
                const priceRange = 5000; // Adjust as needed

                // Filter related products
                const relatedProducts = products.filter(p => {
                    const productPrice = parseFloat(p.price.replace(/₦|,/g, ""));
                    return p !== currentProduct && Math.abs(productPrice - currentPrice) <= priceRange;
                });

                // Populate carousel
                relatedProducts.forEach(product => {
                    const productItem = document.createElement("div");
                    productItem.classList.add("related-product-item");

                    const productImage = product.images?.image1 || product.image || "images/placeholder.jpg";

                    productItem.innerHTML = `
                        <a href="${product.link}">
                            <img src="${productImage}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                        </a>
                    `;
                    carousel.appendChild(productItem);
                });

                // ✅ Ensure all items are inside the carousel
                const totalItems = document.querySelectorAll(".related-product-item").length;
                if (totalItems === 0) return;

                // ✅ Function to calculate scroll values dynamically
                function calculateScrollLimits() {
                    const productWidth = document.querySelector(".related-product-item").offsetWidth;
                    const gap = 55; // Match CSS gap
                    const scrollStep = productWidth + gap;
                    const visibleItems = Math.floor(carousel.offsetWidth / scrollStep);
                    const maxScroll = Math.max(0, (totalItems - visibleItems) * scrollStep);

                    return { scrollStep, maxScroll };
                }

                let scrollAmount = 0;
                let { scrollStep, maxScroll } = calculateScrollLimits();

                function updateButtons() {
                    prevBtn.classList.toggle("disabled", scrollAmount <= 0);
                    nextBtn.classList.toggle("disabled", scrollAmount >= maxScroll);
                }

                nextBtn.addEventListener("click", () => {
                    if (scrollAmount < maxScroll) {
                        scrollAmount += scrollStep;
                        carousel.style.transform = `translateX(-${scrollAmount}px)`;
                    }
                    updateButtons();
                });

                prevBtn.addEventListener("click", () => {
                    if (scrollAmount > 0) {
                        scrollAmount -= scrollStep;
                        carousel.style.transform = `translateX(-${scrollAmount}px)`;
                    }
                    updateButtons();
                });

                // ✅ Update scrolling limits on window resize
                window.addEventListener("resize", () => {
                    const prevMaxScroll = maxScroll;
                    ({ scrollStep, maxScroll } = calculateScrollLimits());

                    // Adjust scroll amount to prevent empty space when resizing
                    if (scrollAmount > maxScroll) {
                        scrollAmount = maxScroll;
                        carousel.style.transform = `translateX(-${scrollAmount}px)`;
                    }

                    updateButtons();
                });

                // ✅ Initialize button state
                updateButtons();
            }
        })
        .catch(error => console.error("Error loading related products:", error));
});


document.addEventListener("DOMContentLoaded", function () {
    const buyNowButton = document.getElementById("buy-now-btn");

    if (buyNowButton) {
        buyNowButton.addEventListener("click", function () {
            const productName = document.getElementById("product-name").textContent.trim();
            const quantity = document.getElementById("quantity").value || 1;
            const whatsappNumber = "2349065988598";
            
            const message = `Hi, I would like to purchase an order for ${productName} (Quantity: ${quantity}).`;
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.location.href = whatsappLink;
        });
    }
});
