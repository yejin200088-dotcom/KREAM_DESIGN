import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js'

const canvasEl = document.getElementById('canvas');
const staticImg = document.getElementById('staticImg');
const aboutCarousel = document.getElementById('aboutCarousel');
const nav = document.getElementById("nav");
const toggle = document.getElementById("toggle");

let app = LiquidBackground(canvasEl);
let stopTimeout;

function startLiquidEffect(imagePath, seconds = 5) {
    clearTimeout(stopTimeout);

    const tempImg = new Image();
    tempImg.src = imagePath;
    tempImg.onload = () => {
        staticImg.src = imagePath;
        app.loadImage(imagePath);
        
        canvasEl.style.opacity = '1';
        app.liquidPlane.uniforms.displacementScale.value = 4;
        
        stopTimeout = setTimeout(() => {
            const duration = 1500;
            const startTime = performance.now();
            const startScale = app.liquidPlane.uniforms.displacementScale.value;

            function smoothlyStop(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (app && app.liquidPlane) {
                    const easeOut = 1 - Math.pow(1 - progress, 3); 
                    app.liquidPlane.uniforms.displacementScale.value = startScale * (1 - easeOut);
                }

                if (progress < 1) {
                    requestAnimationFrame(smoothlyStop);
                } else {
                    canvasEl.style.opacity = '0';
                }
            }
            requestAnimationFrame(smoothlyStop);
        }, seconds * 1000); 
    };
}

// 초기 로드
startLiquidEffect('image/mainpage.jpg', 5);

// About Me 클릭
document.getElementById('goAbout').addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutCarousel) {
        aboutCarousel.style.display = 'block';
        const viewport = aboutCarousel.querySelector('.carousel__viewport');
        if (viewport) viewport.scrollLeft = 0;
    }
    startLiquidEffect('image/aboutme1.jpg', 3); 
    nav.classList.remove('active');
});

// Portfolio 클릭
document.getElementById('goPortfolio').addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutCarousel) aboutCarousel.style.display = 'none'; 
    startLiquidEffect('image/portfolio1.png', 3); 
    nav.classList.remove('active');
});

toggle.addEventListener("click", () => nav.classList.toggle("active"));