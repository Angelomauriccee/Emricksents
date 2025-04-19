document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-box input[type='search']");
    const searchButton = document.querySelector(".search-box button.search");

    if (!searchInput || !searchButton) return;

    // Suggestion box
    const suggestionsContainer = document.createElement("ul");
    suggestionsContainer.classList.add("search-suggestions");
    searchInput.parentElement.appendChild(suggestionsContainer);

    function showSuggestions(query) {
        if (!query.trim()) {
            suggestionsContainer.innerHTML = "";
            return;
        }

        fetch("/data/products.json")
            .then(res => res.json())
            .then(products => {
                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                ).slice(0, 5);

                suggestionsContainer.innerHTML = "";

                if (filtered.length === 0) {
                    suggestionsContainer.innerHTML = `<li class="no-result">No matches found</li>`;
                    return;
                }

                filtered.forEach(product => {
                    const li = document.createElement("li");
                    li.textContent = product.name;
                    li.classList.add("suggestion-item");
                    li.addEventListener("click", () => {
                        searchInput.value = product.name;
                        handleSearch();
                        suggestionsContainer.innerHTML = "";
                    });
                    suggestionsContainer.appendChild(li);
                });
            })
            .catch(err => console.error("Suggestion error:", err));
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Redirect to search.html with the query as a URL parameter
            window.location.href = `/pages/search.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Handle search triggers
    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        handleSearch();
    });

    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    });

    searchInput.addEventListener("input", () => showSuggestions(searchInput.value));
});
