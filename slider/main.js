var sliderTrack = document.querySelector(".slider-track");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var startStopBtn = document.getElementById("start");
var pauseBtn = document.getElementById("pauseToggle");

var slides = document.querySelectorAll(".slide");
var currentSlide = 0;
var autoSlideInterval;
var isAutoSliding = false;

function updateSlider() {
    sliderTrack.style.transform = "translateX(-" + (currentSlide * 100) + "%)";
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    updateSlider();
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    updateSlider();
}

startStopBtn.addEventListener("click", function() {
    if (isAutoSliding) {
        clearInterval(autoSlideInterval);
        startStopBtn.textContent = "Start";
        isAutoSliding = false;
    } else {
        autoSlideInterval = setInterval(nextSlide, 3000);
        startStopBtn.textContent = "Stop";
        isAutoSliding = true;
    }
});

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
