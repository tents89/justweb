// --- 1. 自動依照日期排序卡片 ---
function sortCardsByDate() {
    const grids = document.querySelectorAll('.project-grid');

    grids.forEach(grid => {
        const cards = Array.from(grid.querySelectorAll('.project-card'));

        cards.sort((a, b) => {
            // 抓取最後更新日期文字
            const textA = a.querySelector('.last-updated')?.innerText || "";
            const textB = b.querySelector('.last-updated')?.innerText || "";

            // 正則抓取 YYYY-MM-DD 或 YYYY-M-D
            const dateMatchA = textA.match(/\d{4}-\d{1,2}-\d{1,2}/);
            const dateMatchB = textB.match(/\d{4}-\d{1,2}-\d{1,2}/);

            const dateA = dateMatchA ? new Date(dateMatchA[0]) : new Date(0);
            const dateB = dateMatchB ? new Date(dateMatchB[0]) : new Date(0);

            return dateB - dateA; // 降序：最新日期排在最前
        });

        // 依序重新加入 DOM
        cards.forEach(card => grid.appendChild(card));
    });
}

// --- 2. 打字機特效 ---
function initTypewriter() {
    const textElement = document.querySelector('.typewriter-text');
    if (textElement) {
        const textContent = textElement.innerText;
        textElement.innerText = '';
        let i = 0;

        function typeWriter() {
            if (i < textContent.length) {
                textElement.innerText += textContent.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }
}

// --- 3. 捲動浮現特效 (Scroll Reveal) ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 50; 

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

// --- 4. 回到頂部按鈕邏輯 ---
function handleBackToTop() {
    const mybutton = document.getElementById("backToTop");
    if (!mybutton) return;

    // 當捲動超過 300px 時顯示按鈕 (數值可調)
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// 回到頂部點擊功能
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- 5. 事件監聽與初始化 ---

// 監聽捲動事件
window.addEventListener("scroll", () => {
    handleBackToTop();
    reveal();
});

// 網頁載入後執行
document.addEventListener("DOMContentLoaded", () => {
    sortCardsByDate(); // 1. 先排序
    initTypewriter();  // 2. 打字機
    reveal();          // 3. 初次檢查顯示內容
});

// 視窗大小改變也要重新檢查（以免手機橫放效果跑掉）
window.addEventListener("resize", reveal);