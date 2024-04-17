document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('main img');
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    document.body.appendChild(overlay);

    const overlayImage = document.createElement('img'); // Image element in the overlay
    overlay.appendChild(overlayImage);

    images.forEach(image => {
        image.addEventListener('click', function() {
            overlayImage.src = this.src; // Set the source of the overlay image to the clicked image
            overlay.style.display = 'flex'; // Show the overlay
        });
    });

    // Hide the overlay when clicked
    overlay.addEventListener('click', function() {
        this.style.display = 'none';
    });
});
