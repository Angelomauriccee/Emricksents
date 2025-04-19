document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const emptyCartMessage = document.querySelector(".empty-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            checkoutBtn.disabled = true;
            cartTotal.textContent = "₦0.00";
            return;
        }

        emptyCartMessage.style.display = "none";
        checkoutBtn.disabled = false;

        let total = 0;

        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            const imageSrc = product.image || product.images?.image1 || "images/placeholder.jpg";

            cartItem.innerHTML = `
                <img src="${imageSrc}" alt="${product.name}">
                <div class="cart-item-details">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                    <div class="quantity-container">
                        <button class="decrease-btn" data-index="${index}">-</button>
                        <span class="quantity" data-index="${index}">${product.quantity}</span>
                        <button class="increase-btn" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">&times;</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(product.price.replace(/₦|,/g, "")) * product.quantity;
        });

        cartTotal.textContent = `₦${total.toLocaleString()}`;
    }

    // ✅ Increase Quantity
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("increase-btn")) {
            const index = event.target.getAttribute("data-index");
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // ✅ Decrease Quantity (Minimum 1)
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("decrease-btn")) {
            const index = event.target.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    });

    // ✅ Remove item from cart with slide-out animation
    cartItemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // ✅ WhatsApp Checkout Functionality
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        let message = "Hello, I'm interested in purchasing the following items:\n\n";
        cart.forEach((product, index) => {
            message += `${index + 1}. ${product.name} - ₦${product.price} (Qty: ${product.quantity})\n`;
        });

        const whatsappURL = `https://wa.me/2349065988598?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappURL;
    });

    // ✅ Initial cart display
    updateCartDisplay();
});
