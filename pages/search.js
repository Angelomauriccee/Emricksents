// === DOM SELECTION ===
const select = document.getElementById("sort");
const label = document.getElementById("sort-label");
const container = document.querySelector(".sort-container");
const filterBtn = document.getElementById("filter-btn");
const filterOptions = document.getElementById("filter-options");
const filterIcon = filterBtn?.querySelector("i");
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");

// === GLOBAL VARIABLES ===
let currentSearchResults = [];
let originalSearchResults = [];

// === FILTERS & SORTING ===
filterBtn?.addEventListener("click", () => {
    filterOptions.style.display = filterOptions.style.display === "block" ? "none" : "block";
    filterIcon.style.transform = filterOptions.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
});

select?.addEventListener("change", function () {
    container.classList.add("active");
    label.textContent = `Sort By: ${this.options[this.selectedIndex].text}`;
});

// === Apply Filters and Sorting ===
function applyFiltersAndSort() {
    const sizeFilter = document.getElementById("size-filter")?.value;
    const maxPrice = parseFloat(priceRange?.value);
    const sortBy = select?.value;

    let filteredProducts = [...originalSearchResults];

    // Price Filter
    if (!isNaN(maxPrice)) {
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.numericPrice);
            return !isNaN(price) && price <= maxPrice;
        });
    }

    // Size Filter
    if (sizeFilter && sizeFilter !== "All") {
        filteredProducts = filteredProducts.filter(product => {
            const sizeMatch = product.size?.match(/\d+/);
            const sizeValue = sizeMatch ? parseInt(sizeMatch[0]) : null;
            if (!sizeValue) return false;

            switch (sizeFilter) {
                case "20ml":
                    return sizeValue >= 20 && sizeValue <= 90;
                case "50ml":
                    return sizeValue >= 100 && sizeValue <= 150;
                case "200ml":
                    return sizeValue === 200;
                default:
                    return true;
            }
        });
    }

    // Sorting
    if (sortBy === "low-high") {
        filteredProducts.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === "high-low") {
        filteredProducts.sort((a, b) => b.numericPrice - a.numericPrice);
    }

    // Display Filtered and Sorted Results
    displaySearchResults(filteredProducts);
}

// === Perform Search & Fetch Results ===
function performSearch(query) {
    if (!query.trim()) return;

    // Redirect to search.html with query if not already there
    if (!window.location.pathname.includes("/pages/search.html")) {
        window.location.href = `/pages/search.html?query=${encodeURIComponent(query)}`;
    } else {
        fetchSearchResults(query);
    }
}

function fetchSearchResults(query) {
    fetch("/data/products.json")
        .then(response => response.json())
        .then(products => {
            currentSearchResults = products
                .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
                .map(product => ({
                    ...product,
                    numericPrice: parseFloat(product.price.replace(/[^0-9.]/g, "")) || 0
                }));

            originalSearchResults = [...currentSearchResults];
            updatePageContent(query, currentSearchResults);
            applyFiltersAndSort();
        })
        .catch(error => console.error("Error fetching products:", error));
}

// === Update Page Content (Breadcrumbs, Title, Count) ===
function updatePageContent(query, searchResults) {
    if (!window.location.pathname.includes("/pages/search.html")) return;

    let resultCount = searchResults.length;
    document.title = `Search Results: ${resultCount} found for "${query}"`;

    let breadcrumbNav = document.querySelector(".breadcrumb");
    let productHeading = document.querySelector(".headings-display h1");
    let productCountDisplay = document.getElementById("product-count");

    if (breadcrumbNav) {
        breadcrumbNav.innerHTML = `<a href="/index.html">Home</a> > Search Results for "<strong>${query}</strong>"`;
    }

    if (productHeading) {
        productHeading.textContent = `Search Results for "${query}"`;
    }

    if (productCountDisplay) {
        productCountDisplay.textContent = `Showing ${resultCount} result(s) for "${query}"`;
    }
}

// === Display Search Results ===
function displaySearchResults(products) {
    if (!window.location.pathname.includes("/pages/search.html")) return;

    let productsContainer = document.querySelector(".products-display");
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (products.length === 0) {
        productsContainer.innerHTML = `<p class="no-product">No products found</p>`;
        return;
    }

    products.forEach(product => {
        const image1 = product.images?.image1 || "images/placeholder.jpg";
        const image2 = product.images?.image2;

        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <a href="${product.link}" class="product-link">
                <div class="product">
                    <div class="image-display ${image2 ? "has-hover" : ""}">
                        <img src="${image1}" alt="${product.name}" class="product-img front">
                        ${image2 ? `<img src="${image2}" alt="${product.name}" class="product-img back">` : ""}
                    </div>
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                </div>
            </a>
        `;
        productsContainer.appendChild(productItem);
    });
}

// === Suggestions Logic ===
function initializeSearch() {
    const searchInput = document.querySelector(".search-box input[type='search']");
    const searchButton = document.querySelector(".search-box button.search");

    if (!searchInput || !searchButton) {
        setTimeout(initializeSearch, 100);
        return;
    }

    // === Suggestions ===
    let suggestionsContainer = document.createElement("ul");
    suggestionsContainer.classList.add("search-suggestions");
    searchInput.parentElement.appendChild(suggestionsContainer);

    function showSuggestions(query) {
        if (!query.trim()) {
            suggestionsContainer.innerHTML = "";
            return;
        }

        fetch("/data/products.json")
            .then(response => response.json())
            .then(products => {
                let filteredProducts = products
                    .filter(product => product.name.toLowerCase().includes(query.toLowerCase()))
                    .slice(0, 5);

                suggestionsContainer.innerHTML = "";

                if (filteredProducts.length === 0) {
                    suggestionsContainer.innerHTML = `<li class="no-result">No matches found</li>`;
                    return;
                }

                filteredProducts.forEach(product => {
                    let suggestionItem = document.createElement("li");
                    suggestionItem.textContent = product.name;
                    suggestionItem.classList.add("suggestion-item");

                    suggestionItem.addEventListener("click", () => {
                        searchInput.value = product.name;
                        performSearch(product.name);
                        suggestionsContainer.innerHTML = "";
                    });

                    suggestionsContainer.appendChild(suggestionItem);
                });
            })
            .catch(error => console.error("Error fetching suggestions:", error));
    }

    // === Event Listeners ===
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    searchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            performSearch(searchInput.value);
            suggestionsContainer.innerHTML = "";
        }
    });

    searchInput.addEventListener("input", () => showSuggestions(searchInput.value));

    // === Only trigger full search logic if on search.html ===
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("query");

    if (searchQuery && window.location.pathname.includes("/pages/search.html")) {
        searchInput.value = searchQuery;
        performSearch(searchQuery);
    }
}

// === Initial Setup ===
document.addEventListener("presetLoaded", initializeSearch);
if (document.readyState === "complete") {
    initializeSearch();
} else {
    document.addEventListener("DOMContentLoaded", initializeSearch);
}

// === Enable filters ONLY on search page ===
if (window.location.pathname.includes("/pages/search.html")) {
    select?.addEventListener("change", applyFiltersAndSort);
    priceRange?.addEventListener("input", () => {
        priceValue.textContent = `Up to ₦${priceRange.value}`;
        applyFiltersAndSort();
    });
    document.getElementById("size-filter")?.addEventListener("change", applyFiltersAndSort);
}
