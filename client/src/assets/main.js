
    let slideIndex = 0; // Use 0-based indexing internally for arrays
    let slides = document.querySelectorAll('.carousel-slide');
    let dots = document.querySelectorAll('.dot');
    const intervalTime = 10000; // 10 seconds for auto-slide (10000ms)
    let autoSlideTimeout; // Variable to hold the setTimeout ID

    function showSlides() {
        // Hide all slides and remove active class
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dots[i].classList.remove('active');
        }

        // Increment slideIndex and loop back if needed
        slideIndex++;
        if (slideIndex >= slides.length) { // Adjusted for 0-based index
            slideIndex = 0;
        }

        // Display the current slide and add active class
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        // Set the timeout for the next slide
        autoSlideTimeout = setTimeout(showSlides, intervalTime);
    }

    // Manual slide navigation via dots
    // n is 0-based index from the HTML onclick
    function currentSlide(n) {
        // Stop the current auto-slide timer
        clearTimeout(autoSlideTimeout);

        // Set slideIndex to the clicked dot's index
        slideIndex = n;

        // Show the selected slide
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dots[i].classList.remove('active');
        }
        slides[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');

        // Restart auto-sliding after a manual selection
        autoSlideTimeout = setTimeout(showSlides, intervalTime);
    }

    // Initialize the carousel
    // Show the first slide (index 0) immediately without waiting
    slides[0].classList.add('active');
    dots[0].classList.add('active');
    // Start the automatic slideshow after the initial display
    autoSlideTimeout = setTimeout(showSlides, intervalTime);
