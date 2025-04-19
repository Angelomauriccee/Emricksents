const buttons = document.querySelectorAll("[data-carousel-button]");
const slides = document.querySelector("[data-slides]");
let autoSlideInterval;
let autoSlideTimeout;

function changeSlide(offset) {
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
}

// Function to start auto-sliding
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 2000);
}

// Function to pause and restart auto-sliding
function resetAutoSlide() {
    clearTimeout(autoSlideTimeout); // Clear previous timeout
    clearInterval(autoSlideInterval); // Stop the auto-slide

    autoSlideTimeout = setTimeout(() => {
        startAutoSlide(); // Restart auto-slide after 2s of inactivity
    }, 2000);
}

// Manual button navigation with auto-slide pause
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        changeSlide(offset);
        resetAutoSlide(); // Pause and restart auto-slide
    });
});

// Start auto-slide when page loads
startAutoSlide();
