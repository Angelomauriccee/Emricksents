const hamburger_open = document.getElementById('open');
const hamburger_close = document.getElementById('close');
const menu = document.getElementById('menu');


// Open menu
hamburger_open.addEventListener('click', () => {
    menu.classList.add("show");
});

// Close menu
hamburger_close.addEventListener("click", () => {
    menu.classList.remove("show");
});


const dropDownTrigger = document.getElementById('drop-down');
const drop_down = document.getElementById('drop-down-list');

dropDownTrigger.addEventListener('click', () => {
    drop_down.classList.toggle("drop");
})






const initBrandShowcase = () => {
    document.querySelectorAll(".showcase-wrapper").forEach((showcase) => {
        const showcaseTrack = showcase.querySelector(".showcase-track");
        const prevButton = showcase.querySelector("#showcase-prev");
        const nextButton = showcase.querySelector("#showcase-next");
        const images = showcase.querySelectorAll(".showcase-item");

        if (!showcaseTrack || !prevButton || !nextButton) return;

        let isDragging = false;
        let startX, scrollLeft;

        // Prevent default image dragging behavior
        images.forEach((img) => img.addEventListener("dragstart", (e) => e.preventDefault()));

        // Button click to scroll images
        prevButton.addEventListener("click", () => {
            showcaseTrack.scrollBy({ left: -showcaseTrack.clientWidth, behavior: "smooth" });
        });

        nextButton.addEventListener("click", () => {
            showcaseTrack.scrollBy({ left: showcaseTrack.clientWidth, behavior: "smooth" });
        });

        // Dragging functionality
        showcaseTrack.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX - showcaseTrack.offsetLeft;
            scrollLeft = showcaseTrack.scrollLeft;
            showcaseTrack.style.cursor = "grabbing";
        });

        showcaseTrack.addEventListener("mouseleave", () => {
            isDragging = false;
            showcaseTrack.style.cursor = "grab";
        });

        showcaseTrack.addEventListener("mouseup", () => {
            isDragging = false;
            showcaseTrack.style.cursor = "grab";
        });

        showcaseTrack.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - showcaseTrack.offsetLeft;
            const walk = (x - startX) * 2;
            showcaseTrack.scrollLeft = scrollLeft - walk;
        });

        // Touch event support for mobile
        showcaseTrack.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - showcaseTrack.offsetLeft;
            scrollLeft = showcaseTrack.scrollLeft;
        });

        showcaseTrack.addEventListener("touchend", () => {
            isDragging = false;
        });

        showcaseTrack.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - showcaseTrack.offsetLeft;
            const walk = (x - startX) * 2;
            showcaseTrack.scrollLeft = scrollLeft - walk;
        });
    });
};

// Ensure script runs only once
window.removeEventListener("load", initBrandShowcase);
window.addEventListener("load", initBrandShowcase);










const initSliders = () => {
    document.querySelectorAll(".slide-wrapper").forEach((carousel) => {
        const imageList = carousel.querySelector(".image-list");
        const prevButton = carousel.querySelector(".prev-slide");
        const nextButton = carousel.querySelector(".next-slide");
        const images = carousel.querySelectorAll(".image-item");
        
        if (!imageList || !prevButton || !nextButton) return; // Ensure elements exist

        let isDragging = false;
        let startX, scrollLeft;

        // Prevent default image dragging behavior
        images.forEach((img) => {
            img.addEventListener("dragstart", (e) => e.preventDefault());
        });

        // Slides images according to the slide button clicks
        prevButton.addEventListener("click", () => {
            imageList.scrollBy({ left: -imageList.clientWidth, behavior: "smooth" });
        });

        nextButton.addEventListener("click", () => {
            imageList.scrollBy({ left: imageList.clientWidth, behavior: "smooth" });
        });

        // Show or hide slide buttons based on scroll position
        const handleSlideButtons = () => {
            const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
            prevButton.style.display = imageList.scrollLeft <= 0 ? "none" : "block";
            nextButton.style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
        };

        // Dragging functionality
        imageList.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.pageX - imageList.offsetLeft;
            scrollLeft = imageList.scrollLeft;
            imageList.style.cursor = "grabbing";
        });

        imageList.addEventListener("mouseleave", () => {
            isDragging = false;
            imageList.style.cursor = "grab";
        });

        imageList.addEventListener("mouseup", () => {
            isDragging = false;
            imageList.style.cursor = "grab";
        });

        imageList.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - imageList.offsetLeft;
            const walk = (x - startX) * 2;
            imageList.scrollLeft = scrollLeft - walk;
        });

        // Touch event support for mobile
        imageList.addEventListener("touchstart", (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - imageList.offsetLeft;
            scrollLeft = imageList.scrollLeft;
        });

        imageList.addEventListener("touchend", () => {
            isDragging = false;
        });

        imageList.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - imageList.offsetLeft;
            const walk = (x - startX) * 2;
            imageList.scrollLeft = scrollLeft - walk;
        });

        // Update button visibility when scrolling
        imageList.addEventListener("scroll", handleSlideButtons);
        
        // Run once on load
        handleSlideButtons();
    });
};

// Initialize sliders on load
window.addEventListener("load", initSliders);

document.addEventListener("DOMContentLoaded", function () {
    const addToCartBtn = document.querySelector(".add-to-cart");
    const quantityInput = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");
    const cartPopup = document.getElementById("cart-popup");
    const cartBadge = document.querySelector(".cart-badge"); // Cart badge (should be present on all pages)

    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (cartBadge) { // Check if the element exists before modifying it
            if (totalQuantity > 0) {
                cartBadge.textContent = totalQuantity;
                cartBadge.style.display = "block";
            } else {
                cartBadge.style.display = "none";
            }
        }
    }

    // ✅ Ensure badge updates on every page load
    updateCartBadge();

    if (!addToCartBtn) return; // Stop execution if not on a product page

    // ✅ Extract product slug from URL
    const pathArray = window.location.pathname.split("/");
    const productSlug = pathArray[pathArray.length - 1].replace(".html", "").toLowerCase();

    fetch("/data/products.json")
        .then(response => response.json())
        .then(products => {
            function convertToSlug(name) {
                return name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            }

            // ✅ Find product based on URL slug
            const product = products.find(p => convertToSlug(p.name) === productSlug);

            if (!product) {
                console.error("Product not found in JSON.");
                return;
            }

            function showPopup(message) {
                cartPopup.textContent = message;
                cartPopup.style.display = "block";
                cartPopup.style.opacity = "1";

                setTimeout(() => {
                    cartPopup.style.opacity = "0";
                    setTimeout(() => {
                        cartPopup.style.display = "none";
                    }, 500);
                }, 1500); // Pop-up disappears after 1.5 seconds
            }

            // ✅ Update quantity on button clicks
            increaseBtn.addEventListener("click", () => {
                let currentValue = parseInt(quantityInput.value, 10) || 1;
                quantityInput.value = Math.min(currentValue + 1, 99); // Max 99
            });

            decreaseBtn.addEventListener("click", () => {
                let currentValue = parseInt(quantityInput.value, 10) || 1;
                quantityInput.value = Math.max(currentValue - 1, 1); // Min 1
            });

            // ✅ Ensure only one event listener is attached to the button
            addToCartBtn.replaceWith(addToCartBtn.cloneNode(true));
            const newAddToCartBtn = document.querySelector(".add-to-cart");

            // ✅ Add event listener for "Add to Cart" button
            newAddToCartBtn.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent default link behavior

                let selectedQuantity = parseInt(quantityInput.value, 10) || 1; // Get selected quantity

                // ✅ Retrieve existing cart from localStorage
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                // ✅ Check if product already exists in cart
                let existingProduct = cart.find(item => item.name === product.name);
                if (existingProduct) {
                    if (existingProduct.quantity + selectedQuantity > 99) {
                        showPopup("You can't add more than 99 of this item.");
                        return; // Stop further execution
                    }
                    existingProduct.quantity += selectedQuantity; // Increase quantity correctly
                } else {
                    if (selectedQuantity > 99) {
                        showPopup("You can't add more than 99 of this item.");
                        return; // Stop further execution
                    }
                    cart.push({
                        name: product.name,
                        price: product.price,
                        image: product.image || product.images?.image1 || "images/placeholder.jpg",
                        quantity: selectedQuantity
                    });
                }

                // ✅ Save cart to localStorage
                localStorage.setItem("cart", JSON.stringify(cart));

                // ✅ Update Cart Badge immediately
                updateCartBadge();

                // ✅ Show the pop-up message
                showPopup(`${product.name} (${selectedQuantity}) added to cart!`);
            });

        })
        .catch(error => console.error("Error loading products:", error));
});





document.addEventListener("DOMContentLoaded", function () {
    function openPopover() {
        const popover = document.getElementById("policy-popover");
        const overlay = document.getElementById("overlay");

        if (popover && overlay) {
            popover.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("no-scroll"); // Prevent scrolling
        }
    }

    function closePopoverFunc() {
        const popover = document.getElementById("policy-popover");
        const overlay = document.getElementById("overlay");

        if (popover && overlay) {
            popover.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("no-scroll"); // Restore scrolling
        }
    }

    // Event delegation for dynamically loaded "Terms / policy" link
    document.addEventListener("click", function (event) {
        if (event.target.matches("a[href='#']")) {
            event.preventDefault(); // Prevent default link behavior
            openPopover();
        }
    });

    // Close popover when clicking overlay or close button
    document.addEventListener("click", function (event) {
        if (event.target.matches(".close-popover") || event.target.matches("#overlay")) {
            closePopoverFunc();
        }
    });
});







//BONUS SECTION
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("bonus-popup");
    const triggerSection = document.querySelector("#bonus-trigger"); // 👈 Make sure to add this ID to the section that should trigger the pop-up
    let popupShown = false;
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }
  
    function fireSideConfetti() {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
  
      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
  
      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
  
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
  
        confetti({
          ...defaults,
          particleCount: 5,
          origin: { x: 0, y: randomInRange(0.3, 0.7) }
        });
  
        confetti({
          ...defaults,
          particleCount: 5,
          origin: { x: 1, y: randomInRange(0.3, 0.7) }
        });
      }, 200);
    }
  
    window.addEventListener("scroll", () => {
      if (!popupShown && isInViewport(triggerSection)) {
        popup.classList.remove("hidden");
        popup.classList.add("show");
        popupShown = true;
        fireSideConfetti();
  
        setTimeout(() => {
          popup.classList.remove("show");
        }, 10000); // Hide after 10s
      }
    });
  });
  