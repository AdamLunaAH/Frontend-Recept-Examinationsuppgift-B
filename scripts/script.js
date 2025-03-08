// JavaScript for the recipe page

// Portion scaling function
// The recipe is originally for 8 portions.
const basePortions = 8;
// Maximum number of portions
const maxPortions = 200;
// Get the input field for portions and its display element.
const portionInput = document.getElementById("portions");
const portionDisplay = document.getElementById("portion-display");

// Listen for changes in the portion input
portionInput.addEventListener("input", updateIngredients);
portionInput.addEventListener("change", updateIngredients);

/*
 * - Reads the new portion value from the input field.
 * - Validates the input (non-negative and within max limits).
 * - Updates the displayed number of portions.
 * - Calculates amount based on the original recipe.
 * - Iterates over each ingredient amount in the recipe and update its quantity.
 */
function updateIngredients() {
    let newPortions = parseFloat(portionInput.value);
    // If the value is not a positive number, default to 0.
    if (isNaN(newPortions) || newPortions <= 0) {
        newPortions = 0;
    }
    // Check so the portions does not exceed the maximum
    if (newPortions > maxPortions) {
        newPortions = maxPortions;
        portionInput.value = maxPortions;
    }
    // Update the displayed number of portions
    portionDisplay.textContent = newPortions + " portioner";
    // Calculate the scaling factor based on the base number of portions.
    const factor = newPortions / basePortions;
    const amounts = document.querySelectorAll(".amount");
    amounts.forEach((span) => {
        const base = parseFloat(span.getAttribute("data-base"));
        const newAmount = base * factor;
        // Round to an integer if possible, or round to 2 decimals.
        const rounded = Number.isInteger(newAmount)
            ? newAmount
            : parseFloat(newAmount.toFixed(2));
        // Update the ingredient amount
        span.textContent = rounded;
    });
}

// Star Rating and Review Counter function
document.addEventListener("DOMContentLoaded", function () {
    // Get elements for star rating display and review counter
    const starRating = document.querySelector(".star-rating");
    const starsInner = document.querySelector(".stars-inner");
    const reviewCounter = document.querySelector(".review-counter");

    // Initial state is two 2-star reviews = 4 total stars from 2 reviews
    let totalStars = 4;
    let reviewCount = 2;
    // Maximum stars that can be given
    const maxStars = 5;

    // Function to update the displayed rating
    // It sets the width (in percentage) of .stars-inner.
    function updateRatingDisplay(rating) {
        const starPercentage = (rating / maxStars) * 100;
        starsInner.style.width = starPercentage + "%";

        starRating.setAttribute("data-rating", rating.toFixed(1));
    }

    // Calculate the initial average rating.
    let averageRating = totalStars / reviewCount;
    updateRatingDisplay(averageRating);

    // On mousemove over the star rating, show the hovered rating.
    /**
     * - Calculates the hovered rating based on the mouse X position.
     * - Updates the display to show the hovered rating.
     */
    starRating.addEventListener("mousemove", function (e) {
        const rect = starRating.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        // Mouse position relative to the star rating container.
        const relativeX = Math.max(0, Math.min(offsetX, rect.width));
        // Get the width of the star rating container.
        let divWidthValue = starRating.clientWidth;

        // Determine hovered rating by dividing the container into segments.
        if (relativeX < divWidthValue * 0.2) {
            hoveredRating = 1;
        } else if (relativeX < divWidthValue * 0.4) {
            hoveredRating = 2;
        } else if (relativeX < divWidthValue * 0.6) {
            hoveredRating = 3;
        } else if (relativeX < divWidthValue * 0.8) {
            hoveredRating = 4;
        } else {
            hoveredRating = 5;
        }
        // Update the display to show the hovered rating.
        updateRatingDisplay(hoveredRating);
    });

    // On mouse leave, revert back to the current average rating.
    starRating.addEventListener("mouseleave", function () {
        updateRatingDisplay(averageRating);
    });

    /**
     * When a star is clicked, treat it as a new review:
     * - Determines the rating based on click position.
     * - Updates the total stars and review count.
     * - Recalculates and displays the new average rating.
     * - Updates the review counter text.
     */
    starRating.addEventListener("click", function (e) {
        const rect = starRating.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const relativeX = Math.max(0, Math.min(offsetX, rect.width));
        // Round the new rating to the nearest whole star
        let selectedRating = Math.ceil((relativeX / rect.width) * maxStars);

        // Update the total and count then compute the new average.
        totalStars += selectedRating;
        reviewCount++;
        averageRating = totalStars / reviewCount;
        updateRatingDisplay(averageRating);

        // Update the review counter text.
        reviewCounter.textContent =
            reviewCount + (reviewCount === 1 ? " review" : " reviews");
    });
});

// Carousel/Scrolling for Recipe Images
document.addEventListener("DOMContentLoaded", function () {
    // Get the grid container containing the carousel images.
    const grid = document.querySelector(".food-images-grid");
    // Get the next and previous buttons.
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    // Use the width of the carousel container to calculate scroll width
    const scrollAmount = grid.offsetWidth;

    // On clicking "next", scroll the grid to the right.
    nextBtn.addEventListener("click", function () {
        grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // On clicking "previous", scroll the grid to the left.
    prevBtn.addEventListener("click", function () {
        grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
});

// Set Footer Year
// Get the element with ID "year" and set its content to the current year.
document.getElementById("year").innerHTML = new Date().getFullYear();

