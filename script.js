// COUNTDOWN
const weddingDate = new Date("April 12, 2026 00:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

}, 1000);


// SLIDESHOW
let slides = document.querySelectorAll(".slide");
let current = 0;

setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
}, 4000);


// MUSIC TOGGLE
const music = document.getElementById("bg-music");
const button = document.getElementById("music-btn");

// Try autoplay on load
window.addEventListener("load", () => {
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            // Autoplay blocked — wait for interaction
            const enableAudio = () => {
                music.play();
                document.removeEventListener("click", enableAudio);
            };
            document.addEventListener("click", enableAudio);
        });
    }
});

// Toggle button
button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

// HERO LOAD ANIMATION
window.addEventListener("load", () => {
    const reveals = document.querySelectorAll(".hero .reveal");

    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("active");
        }, index * 300);
    });
});


// SECTION REVEAL ON SCROLL
const sectionReveals = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sectionReveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
            section.classList.add("active");
        }
    });
});
