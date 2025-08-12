const select = document.getElementById("sort");
const label = document.getElementById("sort-label");
const container = document.querySelector(".sort-container");

select.addEventListener("change", function () {
    container.classList.add("active");
    label.textContent = `Sort By: ${this.options[this.selectedIndex].text}`;
});






const filterBtn = document.getElementById("filter-btn");
const filterOptions = document.getElementById("filter-options");
const filterIcon = filterBtn.querySelector("i");
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");

// Toggle dropdown
filterBtn.addEventListener("click", () => {
    filterOptions.style.display = filterOptions.style.display === "block" ? "none" : "block";
    filterIcon.style.transform = filterOptions.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
});











//JSON FILE

fetch("/data/products.json")
  .then(response => response.json())
  .then(products => {
    let amouroudProducts = products.filter(product => 
      product.name.toLowerCase().includes("clive")
    );

    const productsContainer = document.querySelector(".products-display");
    const countDisplay = document.querySelector(".headings-display p"); 
    const sizeFilter = document.getElementById("size-filter");
    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    const sortDropdown = document.getElementById("sort");

    let filteredProducts = [...amouroudProducts]; // Track filtered products

    // Function to display products
    function displayFilteredProducts(productsToDisplay) {
      // Update product count text
      countDisplay.textContent = `Showing ${productsToDisplay.length} of ${amouroudProducts.length} products`;

      // Clear previous content
      productsContainer.innerHTML = "";

      if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = `<p class="no-product">No product found</p>`;
        return;
      }

      productsToDisplay.forEach(product => {
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

 
    // Function to apply all filters (Size + Price)
    function applyFilters() {
      let selectedSize = sizeFilter.value;
      let maxPrice = parseInt(priceRange.value);

      filteredProducts = amouroudProducts.filter(product => {
        const productSize = parseInt(product.size) || 0; // Handle missing sizes
        const productPrice = parseFloat(product.price.replace(/₦|,/g, "")) || 0; // Handle missing prices

        // ✅ Size filter (works with "All" option)
        let sizeMatch = true;
        if (selectedSize === "20ml") {
          sizeMatch = productSize >= 20 && productSize <= 90;
        } else if (selectedSize === "50ml") {
          sizeMatch = productSize >= 100 && productSize <= 150;
        } else if (selectedSize === "200ml") {
          sizeMatch = productSize === 200;
        } else {
          sizeMatch = true; // Show all products if "All" is selected
        }

        // ✅ Price filter
        let priceMatch = productPrice <= maxPrice;

        return sizeMatch && priceMatch;
      });

      sortProducts(); // Apply sorting after filtering
    }

    // Function to sort products
    function sortProducts() {
      const sortValue = sortDropdown.value;
      let sortedProducts = [...filteredProducts];

      if (sortValue === "low-high") {
        sortedProducts.sort((a, b) => parseFloat(a.price.replace(/₦|,/g, "")) - parseFloat(b.price.replace(/₦|,/g, "")));
      } else if (sortValue === "high-low") {
        sortedProducts.sort((a, b) => parseFloat(b.price.replace(/₦|,/g, "")) - parseFloat(a.price.replace(/₦|,/g, "")));
      }

      displayFilteredProducts(sortedProducts);
    }

    // ✅ Initial display
    displayFilteredProducts(filteredProducts);

    // ✅ Event listeners
    sizeFilter.addEventListener("change", applyFilters);
    priceRange.addEventListener("input", () => {
      priceValue.textContent = priceRange.value;
      applyFilters();
    });
    sortDropdown.addEventListener("change", sortProducts);
  })
  .catch(error => console.error("Error loading products:", error));
