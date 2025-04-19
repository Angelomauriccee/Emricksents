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









fetch("/data/products.json")
  .then(response => response.json())
  .then(products => {
        // ⛔ Skip everything if live search is active
        if (window.searchActive) return;
    let allProducts = products;
    let filteredProducts = [...allProducts];

    const productsContainer = document.querySelector(".products-display");
    const countDisplay = document.querySelector(".headings-display p"); 
    const paginationContainer = document.querySelector(".pagination");

    const sizeFilter = document.getElementById("size-filter");
    const priceRange = document.getElementById("price-range");
    const priceValue = document.getElementById("price-value");
    const sortDropdown = document.getElementById("sort");

    let currentPage = 1;
    const productsPerPage = 20;
    let totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    function displayFilteredProducts(productsToDisplay) {
      totalPages = Math.ceil(productsToDisplay.length / productsPerPage);
      const start = (currentPage - 1) * productsPerPage;
      const end = start + productsPerPage;
      const paginatedProducts = productsToDisplay.slice(start, end);

      countDisplay.textContent = `Showing ${paginatedProducts.length} of ${productsToDisplay.length} products`;

      productsContainer.innerHTML = "";

      if (paginatedProducts.length === 0) {
        productsContainer.innerHTML = `<p class="no-product">No product found</p>`;
        return;
      }

      paginatedProducts.forEach(product => {
        let image1 = "images/placeholder.jpg";
        let image2 = "";

        if (typeof product.images === "string") {
          image1 = product.images;
        } else if (typeof product.images === "object" && product.images !== null) {
          image1 = product.images.image1 || "images/placeholder.jpg";
          image2 = product.images.image2 || "";
        } else if (product.image) {
          image1 = product.image;
        }

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

      updatePagination();
    }

    function updatePagination() {
      paginationContainer.innerHTML = ""; 

      const prevButton = document.createElement("button");
      prevButton.textContent = "«";
      prevButton.classList.add("page-btn", "prev-btn");
      prevButton.disabled = currentPage === 1;
      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          displayFilteredProducts(filteredProducts);
        }
      });
      paginationContainer.appendChild(prevButton);

      const firstPage = document.createElement("button");
      firstPage.textContent = "1";
      firstPage.classList.add("page-btn");
      if (currentPage === 1) firstPage.classList.add("active");
      firstPage.addEventListener("click", () => {
        currentPage = 1;
        displayFilteredProducts(filteredProducts);
      });
      paginationContainer.appendChild(firstPage);

      if (currentPage > 2) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationContainer.appendChild(dots);
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        const currentPageBtn = document.createElement("button");
        currentPageBtn.textContent = currentPage;
        currentPageBtn.classList.add("page-btn", "active");
        paginationContainer.appendChild(currentPageBtn);
      }

      if (currentPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationContainer.appendChild(dots);
      }

      const lastPage = document.createElement("button");
      lastPage.textContent = totalPages;
      lastPage.classList.add("page-btn");
      if (currentPage === totalPages) lastPage.classList.add("active");
      lastPage.addEventListener("click", () => {
        currentPage = totalPages;
        displayFilteredProducts(filteredProducts);
      });
      paginationContainer.appendChild(lastPage);

      const nextButton = document.createElement("button");
      nextButton.textContent = "»";
      nextButton.classList.add("page-btn", "next-btn");
      nextButton.disabled = currentPage === totalPages;
      nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          displayFilteredProducts(filteredProducts);
        }
      });
      paginationContainer.appendChild(nextButton);
    }

    function applyFilters() {
      let selectedSize = sizeFilter.value;
      let maxPrice = parseInt(priceRange.value);

      filteredProducts = allProducts.filter(product => {
        const productSize = parseInt(product.size) || 0;
        const productPrice = parseFloat(product.price.replace(/₦|,/g, "")) || 0;

        let sizeMatch = true;
        if (selectedSize === "20ml") {
          sizeMatch = productSize >= 20 && productSize <= 90;
        } else if (selectedSize === "50ml") {
          sizeMatch = productSize >= 100 && productSize <= 150;
        } else if (selectedSize === "200ml") {
          sizeMatch = productSize === 200;
        }

        let priceMatch = productPrice <= maxPrice;

        return sizeMatch && priceMatch;
      });

      currentPage = 1;
      sortProducts();
    }

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

    displayFilteredProducts(filteredProducts);

    sizeFilter.addEventListener("change", applyFilters);
    priceRange.addEventListener("input", () => {
      priceValue.textContent = priceRange.value;
      applyFilters();
    });
    sortDropdown.addEventListener("change", sortProducts);
  })
  .catch(error => console.error("Error loading products:", error));
