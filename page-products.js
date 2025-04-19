
  document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/products.json') // 👈 Replace with your actual path
      .then(response => response.json())
      .then(products => {
        const popularContainer = document.getElementById('popular-products-list');
        const newContainer = document.getElementById('new-products-list');

        const popularProducts = products
          .filter(product => product.currentStatus === 'popular-products')
          .slice(0, 8);

        const newProducts = products
          .filter(product => product.status === 'new')
          .slice(0, 8);

        const createProductCard = (product) => {
          return `
            <a href="${product.link}">
              <div class="image-item">
                <div class="image-wrapper">
                  <img src="${product.images.image1}" alt="${product.name}" class="main-img" />
                  ${product.images.image2 ? `<img src="${product.images.image2}" alt="${product.name}" class="hover-img" />` : ''}
                </div>
                <div class="description">
                  <p>${product.name}</p>
                  <p class="price">${product.price}</p>
                </div>
              </div>
            </a>
          `;
        };

        // Populate the popular products
        popularProducts.forEach(product => {
          popularContainer.innerHTML += createProductCard(product);
        });

        // Populate the new products
        newProducts.forEach(product => {
          newContainer.innerHTML += createProductCard(product);
        });
      })
      .catch(error => {
        console.error('Failed to load products:', error);
      });
  });

