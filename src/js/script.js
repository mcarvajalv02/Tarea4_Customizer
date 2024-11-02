const titleInput = document.getElementById("titleInput");
const titleDisplay = document.querySelector(".tshirt .title");
const horizontalRange = document.getElementById("rangeHorizontal");
const verticalRange = document.getElementById("rangeVertical");
const imagesContainer = document.querySelector(".images-container");
const agentImage = document.querySelector(".agent");
const agentSmallImage = document.querySelector(".agent-small");
const characterNameDisplay = document.querySelector(".character");
const tshirtBlack = document.querySelector('.tshirt-black');
const tshirtWhite = document.querySelector('.tshirt-white');

// Function to update the text on the t-shirt
titleInput.addEventListener("input", () => {
    titleDisplay.textContent = titleInput.value;
});

// Functions to move the text on the t-shirt
horizontalRange.addEventListener("input", () => {
    const posX = horizontalRange.value;
    titleDisplay.style.transform = `translate(${posX}px, ${-verticalRange.value}px)`;
});

verticalRange.addEventListener("input", () => {
    const posY = -verticalRange.value;
    titleDisplay.style.transform = `translate(${horizontalRange.value}px, ${posY}px)`;
});

// Initialize drag and click events on each image in the gallery
function initializeDraggableImages() {
    const images = imagesContainer.querySelectorAll("img");
    images.forEach((image) => {
        image.addEventListener("dragstart", dragElement);

        // Event to place the image on the t-shirt when clicked
        image.addEventListener("click", () => {
            agentImage.src = image.src;
            agentSmallImage.src = image.src;
            characterNameDisplay.textContent = image.alt;
        });
    });
}

// Function to handle image dragging
function dragElement(event) {
    event.dataTransfer.setData("text/plain", event.target.src);
    event.dataTransfer.setData("text/alt", event.target.alt);
}

// Function to handle dropping the image onto the t-shirt
document.querySelector(".tshirt").addEventListener("drop", (event) => {
    event.preventDefault();
    const imageSrc = event.dataTransfer.getData("text/plain");
    const imageAlt = event.dataTransfer.getData("text/alt");

    if (imageSrc) {
        agentImage.src = imageSrc;
        agentSmallImage.src = imageSrc;
        characterNameDisplay.textContent = imageAlt;
    }
});

// Allow the t-shirt to accept dragged elements
document.querySelector(".tshirt").addEventListener("dragover", (event) => {
    event.preventDefault();
});

// Handle t-shirt color change when selecting a color
const colorInputs = document.querySelectorAll('input[name="color"]');
colorInputs.forEach((input) => {
    input.addEventListener("change", () => {
        if (input.value === "white") {
            tshirtBlack.style.display = "none"; // Hide the black t-shirt
            tshirtWhite.style.display = "block"; // Show the white t-shirt
            titleDisplay.style.color = "black"; // Change text color to black for white t-shirt
            characterNameDisplay.style.color = "black"; // Change character name color to black for white t-shirt
        } else {
            tshirtBlack.style.display = "block"; // Show the black t-shirt
            tshirtWhite.style.display = "none"; // Hide the white t-shirt
            titleDisplay.style.color = "white"; // Change text color to white for black t-shirt
            characterNameDisplay.style.color = "white"; // Change character name color to white for black t-shirt
        }
    });
});

// Call the function to enable dragging on images
initializeDraggableImages();
