// The recipe is originally for 8 portions.
const basePortions = 8;
const maxPortions = 200;
const portionInput = document.getElementById("portions");
const portionDisplay = document.getElementById("portion-display");

// Update amounts on input changes
portionInput.addEventListener("input", updateIngredients);
portionInput.addEventListener("change", updateIngredients);

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
    portionDisplay.textContent = newPortions + " portioner";
    const factor = newPortions / basePortions;
    const amounts = document.querySelectorAll(".amount");
    amounts.forEach((span) => {
        const base = parseFloat(span.getAttribute("data-base"));
        const newAmount = base * factor;
        // Round to integer if possible, otherwise 2 decimals.
        const rounded = Number.isInteger(newAmount)
            ? newAmount
            : parseFloat(newAmount.toFixed(2));
        span.textContent = rounded;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const starRating = document.querySelector(".star-rating");
    const starsInner = document.querySelector(".stars-inner");
    const reviewCounter = document.querySelector(".review-counter");

    // Initial state: two 2-star reviews = 4 total stars from 2 reviews.
    let totalStars = 4;
    let reviewCount = 2;
    const maxStars = 5;

    // Function to update the displayed rating in the filled layer.
    // It sets the width (in percentage) of .stars-inner.
    function updateRatingDisplay(rating) {
        const starPercentage = (rating / maxStars) * 100;
        starsInner.style.width = starPercentage + "%";
        // Also update the data attribute if needed (for debugging or CSS use)
        starRating.setAttribute("data-rating", rating.toFixed(1));
    }

    // Calculate the initial average rating.
    let averageRating = totalStars / reviewCount;
    updateRatingDisplay(averageRating);

    // On mousemove over the star rating, show the hovered rating.
    starRating.addEventListener("mousemove", function (e) {
        const rect = starRating.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const relativeX = Math.max(0, Math.min(offsetX, rect.width));
        console.log(relativeX);

        let divWidthValue = document.querySelector(".star-rating").clientWidth;
        console.log(divWidthValue);

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
        // const hoveredRating = (relativeX / rect.width) * maxStars;
        console.log(hoveredRating);
        updateRatingDisplay(hoveredRating);
    });

    // On mouse leave, revert back to the current average rating.
    starRating.addEventListener("mouseleave", function () {
        updateRatingDisplay(averageRating);
    });

    // When a star is clicked, treat that as a new review.
    starRating.addEventListener("click", function (e) {
        const rect = starRating.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const relativeX = Math.max(0, Math.min(offsetX, rect.width));
        // Round the new rating to the nearest whole star (can be changed to half stars if desired)
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

// document.addEventListener("DOMContentLoaded", function () {
//     // Only run the carousel if screen is small
//     if (window.innerWidth < 768) {
//         const items = document.querySelectorAll(
//             ".recipe-images.carousel .carousel-item"
//         );
//         let currentIndex = 0;
//         const intervalTime = 3000; // time in milliseconds

//         function showNext() {
//             items[currentIndex].classList.remove("active");
//             // Loop back to the start when at the end
//             currentIndex = (currentIndex + 1) % items.length;
//             items[currentIndex].classList.add("active");
//         }

//         // Start the interval for auto switching
//         setInterval(showNext, intervalTime);
//     }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   // Only run auto-switch on small screens
//   if (window.innerWidth <= 600) {
//     const items = document.querySelectorAll('.carousel-item');
//     let currentIndex = 0;
//     // Set the first item as active
//     items[currentIndex].classList.add('active');

//     // Auto-switch every 3 seconds (3000ms)
//     setInterval(() => {
//       items[currentIndex].classList.remove('active');
//       currentIndex = (currentIndex + 1) % items.length;
//       items[currentIndex].classList.add('active');
//     }, 3000);
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".food-images-grid");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    // Use the width of the carousel container to calculate scroll distance
    const scrollAmount = grid.offsetWidth;

    nextBtn.addEventListener("click", function () {
        grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", function () {
        grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
});

document.getElementById("year").innerHTML = new Date().getFullYear();
