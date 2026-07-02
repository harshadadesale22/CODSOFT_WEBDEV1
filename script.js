const themeBtn = document.getElementById("theme-btn");
const iconMoon = document.getElementById("iconMoon");
const iconSun = document.getElementById("iconSun");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        iconMoon.style.display = "none";
        iconSun.style.display = "inline-block";
    }else{
        iconMoon.style.display = "inline-block";
        iconSun.style.display = "none";
    }

});
/* ===== Mobile menu toggle ===== */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

/* ===== Scroll reveal animation ===== */
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== Certificate zoom modal ===== */
function openCertModal(src){
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certModalImg");
    modalImg.src = src;
    modal.classList.add("active");
}

function closeCertModal(){
    document.getElementById("certModal").classList.remove("active");
}

// Close modal on background click
document.getElementById("certModal").addEventListener("click", (e) => {
    if (e.target.id === "certModal") {
        closeCertModal();
    }
});

/* ===== Education documents toggle ===== */
function toggleDocs(id, titleEl){
    const list = document.getElementById(id);
    list.classList.toggle("show");
    titleEl.classList.toggle("open");
}

/* ===== Typing effect for hero subtitle ===== */
const typingTarget = document.getElementById("typingText");
const typingWords = ["Web Developer", "Full Stack Developer", "Python Programmer", "Database Enthusiast"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop(){
    const currentWord = typingWords[wordIndex];

    if(isDeleting){
        charIndex--;
    } else {
        charIndex++;
    }

    typingTarget.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if(!isDeleting && charIndex === currentWord.length){
        speed = 1500;
        isDeleting = true;
    } else if(isDeleting && charIndex === 0){
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        speed = 400;
    }

    setTimeout(typeLoop, speed);
}

if(typingTarget) typeLoop();

/* ===== Scroll progress bar + glass navbar + active link + back to top ===== */
const progressBar = document.getElementById("progressBar");
const siteHeader = document.querySelector("header");
const backToTopBtn = document.getElementById("backToTop");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#navLinks a");

window.addEventListener("scroll", () => {
    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrolled + "%";

    // Glass navbar
    if(scrollTop > 60){
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

    // Back to top visibility
    if(scrollTop > 400){
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }

    // Active nav link highlight
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 90;
        if(scrollTop >= sectionTop){
            currentSection = section.getAttribute("id");
        }
    });

    navAnchors.forEach(link => {
        link.classList.remove("active-link");
        if(link.getAttribute("href") === "#" + currentSection){
            link.classList.add("active-link");
        }
    });
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});