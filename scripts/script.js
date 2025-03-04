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
