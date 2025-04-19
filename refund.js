
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