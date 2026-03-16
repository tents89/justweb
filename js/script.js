// --- 1. 自動依照日期排序卡片 ---
function sortCardsByDate() {
    const grids = document.querySelectorAll('.project-grid');
    grids.forEach(grid => {
        const cards = Array.from(grid.querySelectorAll('.project-card'));
        cards.sort((a, b) => {
            const textA = a.querySelector('.last-updated')?.innerText || "";
            const textB = b.querySelector('.last-updated')?.innerText || "";
            const dateMatchA = textA.match(/\d{4}-\d{1,2}-\d{1,2}/);
            const dateMatchB = textB.match(/\d{4}-\d{1,2}-\d{1,2}/);
            const dateA = dateMatchA ? new Date(dateMatchA[0]) : new Date(0);
            const dateB = dateMatchB ? new Date(dateMatchB[0]) : new Date(0);
            return dateB - dateA;
        });
        cards.forEach(card => grid.appendChild(card));
    });
}

// --- 2. 打字機特效 ---
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (!textElement) return;
    const textContent = textElement.innerText;
    textElement.innerText = '';
    let i = 0;
    function typeWriter() {
        if (i < textContent.length) {
            textElement.innerText += textContent.charAt(i);
            i++;
            setTimeout(typeWriter, 60);
        }
    }
    setTimeout(typeWriter, 600);
}

// --- 3. Hero 粒子特效 ---
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const COUNT = window.innerWidth < 768 ? 30 : 55;

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.25,
            alpha: Math.random() * 0.5 + 0.15,
        });
    }

    const PRIMARY = [232, 134, 26];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const alpha = (1 - dist / 100) * 0.12;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${PRIMARY.join(',')},${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw dots
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${PRIMARY.join(',')},${p.alpha})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        requestAnimationFrame(draw);
    }
    draw();
}

// --- 4. 捲動浮現 ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            el.classList.add("active");
        }
    });
}

// --- 5. 回到頂部 ---
function handleBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 6. 事件監聽 ---
window.addEventListener("scroll", () => {
    handleBackToTop();
    reveal();
});

window.addEventListener("resize", reveal);

document.addEventListener("DOMContentLoaded", () => {
    sortCardsByDate();
    initTypewriter();
    initHeroParticles();
    reveal();
});
