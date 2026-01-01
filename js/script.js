// --- 1. 打字機特效 ---
const textElement = document.querySelector('.typewriter-text');
if (textElement) {
    const textContent = textElement.innerText;
    textElement.innerText = ''; // 清空原本文字
    let i = 0;

    function typeWriter() {
        if (i < textContent.length) {
            textElement.innerText += textContent.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // 打字速度 (毫秒)
        }
    }
    // 頁面載入後 0.5 秒開始打字
    setTimeout(typeWriter, 500);
}

// --- 2. 捲動浮現特效 (Scroll Reveal) ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        
        // 【修改點】原本是 100，改為 50
        // 只要元素進入視窗 50px 就會顯示，反應更靈敏
        var elementVisible = 50; 

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// 監聽捲動事件 (原本就有)
window.addEventListener("scroll", reveal);

// 【新增】當 HTML 結構讀取完成後，立刻執行一次
window.addEventListener("DOMContentLoaded", reveal);

// 【新增】當所有圖片都載入完成後，再執行一次 (防止圖片撐開高度導致判定跑掉)
window.addEventListener("load", reveal);

// 【保險】腳本載入當下也先跑一次
reveal();


// --- 3. 回到頂部按鈕邏輯 ---
let mybutton = document.getElementById("backToTop");

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    // 捲動超過 20px 就顯示按鈕，同時也順便觸發 reveal 檢查
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    // 確保捲動時持續檢查動畫
    reveal(); 
}

function topFunction() {
    // 平滑捲動回頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}