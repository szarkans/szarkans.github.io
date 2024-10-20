document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('main img'); // Selects all images in the main element
    const overlay = document.createElement('div'); // Creates a new div element for the overlay
    overlay.className = 'image-overlay'; // Sets the class name for the overlay
    document.body.appendChild(overlay); // Appends the overlay to the document body

    const overlayImage = document.createElement('img'); // Creates an image element for the overlay
    overlay.appendChild(overlayImage); // Appends the image element to the overlay

    images.forEach(image => {
        image.addEventListener('click', function() {
            if (!this.classList.contains('no-expand')) { // Checks if the image does not have the 'no-expand' class
                overlayImage.src = this.src; // Sets the source of the overlay image to the clicked image's source
                overlay.style.display = 'flex'; // Displays the overlay
            }
        });
    });

    // Adds an event listener to the overlay to hide it when clicked
    overlay.addEventListener('click', function() {
        this.style.display = 'none'; // Sets the display style of the overlay to 'none' to hide it
    });
});
