document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const counter = document.querySelector('.carousel-counter');
  
    let currentIndex = 0;
  
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      counter.textContent = `${currentIndex + 1} / ${items.length}`;
    }
  
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
      updateCarousel();
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    });
  
    // Инициализация карусели
    updateCarousel();
  });
  