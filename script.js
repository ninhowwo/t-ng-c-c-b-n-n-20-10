// Hệ thống quà tặng - chỉ có bút nhớ
const giftType = "bút nhớ";
const giftIcon = "🖊️";
const giftColor = "#ffc0cb";

// Lưu trữ quà hiện tại
let currentGift = null;
let currentGiftType = null;

// Khởi tạo trang web
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    // Hiển thị trang chào mừng
    showPage('welcome-page');
    
    // Thêm hiệu ứng trái tim bay
    createFloatingHearts();
}

function setupEventListeners() {
    // Nút "đi thuii"
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', function() {
        showPage('gift-page');
        setTimeout(() => {
            showSpeechBubble();
        }, 500);
    });

    // Nút mở quà
    const openGiftBtn = document.getElementById('open-gift-btn');
    openGiftBtn.addEventListener('click', function() {
        openGiftBox();
    });
}

function showPage(pageId) {
    // Ẩn tất cả trang
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Hiển thị trang được chọn
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showSpeechBubble() {
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateY(20px)';
        speechBubble.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'translateY(0)';
        }, 100);
    }
}

function openGiftBox() {
    const bagOpening = document.getElementById('bag-opening');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const giftBag = document.getElementById('gift-bag');
    const openingLight = document.getElementById('opening-light');
    const bagBody = document.getElementById('bag-body');
    
    // Hiệu ứng mở nắp túi lên cao 90 độ
    if (bagOpening) {
        bagOpening.classList.add('open');
    }
    
    // Hiệu ứng ánh sáng khi mở túi
    if (openingLight) {
        openingLight.classList.add('active');
    }
    
    // Hiệu ứng rung nhẹ thân túi
    if (bagBody) {
        bagBody.style.animation = 'bodyShake 0.5s ease-in-out';
    }
    
    // Ẩn nút mở quà với hiệu ứng
    if (openGiftBtn) {
        openGiftBtn.style.transition = 'all 0.5s ease';
        openGiftBtn.style.opacity = '0';
        openGiftBtn.style.transform = 'scale(0.8) translateY(20px)';
    }
    
    // Hiệu ứng trái tim bay lên
    setTimeout(() => {
        createHeartParticles();
    }, 200);
    
    // Hiệu ứng sparkle
    setTimeout(() => {
        createSparkleEffect();
    }, 500);
    
    // Sau khi mở nắp túi, hiển thị quà
    setTimeout(() => {
        selectAndShowGift();
    }, 2000);
}

function createHeartParticles() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '💞'];
    const colors = ['#ff6b9d', '#ff8fab', '#ffa8c5', '#ffb6c1', '#dda0dd', '#e6a8d8'];
    
    // Tạo 15-20 trái tim bay lên
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize = (6 + Math.random() * 14) + 'px'; // 6px - 20px
            heart.style.left = (Math.random() * 120 + 10) + 'px'; // Vị trí ngẫu nhiên trong hộp
            heart.style.top = (Math.random() * 60 + 10) + 'px';
            
            heartsContainer.appendChild(heart);
            
            // Tự động xóa sau animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 100); // Tạo trái tim mỗi 100ms
    }
}

function createSparkleEffect() {
    const giftBag = document.getElementById('gift-bag');
    if (!giftBag) return;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '16px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        // Vị trí ngẫu nhiên xung quanh túi quà
        const angle = (i / 8) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        sparkle.style.left = (giftBag.offsetLeft + giftBag.offsetWidth/2 + x) + 'px';
        sparkle.style.top = (giftBag.offsetTop + giftBag.offsetHeight/2 + y) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animation
        sparkle.style.animation = 'sparkle 1.5s ease-out forwards';
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

function selectAndShowGift() {
    // Chỉ có một loại quà duy nhất
    currentGift = "bạn";
    currentGiftType = giftType;
    
    // Hiển thị kết quả
    showGiftResult(giftType, "bạn");
}

function showGiftResult(giftType, recipient) {
    // Chuyển sang trang kết quả
    showPage('result-page');
    
    // Tạo nội dung quà
    const giftResult = document.getElementById('gift-result');
    if (giftResult) {
        giftResult.innerHTML = `
            <div class="gift-item" style="border-color: ${giftColor}; background: linear-gradient(135deg, ${giftColor}20, ${giftColor}10);">
                <div class="gift-icon">${giftIcon}</div>
                <div class="gift-name">${giftType}</div>
            </div>
        `;
    }
    
    // Hiển thị thông điệp chúc mừng
    const congratulationsMessage = document.getElementById('congratulations-message');
    if (congratulationsMessage) {
        congratulationsMessage.textContent = "Chúc mừng cậu đã nhận được phần quà may mắn của bọn mình! 🎉";
    }
    
    // Thêm hiệu ứng trái tim bay
    setTimeout(() => {
        createCelebrationHearts();
    }, 500);
}

function createFloatingHearts() {
    const welcomePage = document.getElementById('welcome-page');
    if (!welcomePage) return;
    
    setInterval(() => {
        if (document.getElementById('welcome-page').classList.contains('active')) {
            createHeart();
        }
    }, 2000);
    
    // Tạo bong bóng động
    setInterval(() => {
        if (document.getElementById('welcome-page').classList.contains('active')) {
            createBubble();
        }
    }, 1500);
    
    // Tạo emoticon động
    setInterval(() => {
        if (document.getElementById('welcome-page').classList.contains('active')) {
            createEmoticon();
        }
    }, 3000);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
    heart.style.position = 'fixed';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '100vh';
    heart.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.innerHTML = '🫧';
    bubble.style.position = 'fixed';
    bubble.style.fontSize = '20px';
    bubble.style.pointerEvents = 'none';
    bubble.style.zIndex = '1000';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.top = '100vh';
    bubble.style.animation = 'bubbleUp 6s ease-out forwards';
    bubble.style.opacity = '0.7';
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        bubble.remove();
    }, 6000);
}

function createEmoticon() {
    const emoticon = document.createElement('div');
    const emoticons = ['OwO', 'Uwu', '(◕‿◕)', '(｡◕‿◕｡)', '(◡‿◡)', '(◕‿◕)♡', '(◕‿◕)✨', '(◡‿◡)♡'];
    emoticon.innerHTML = emoticons[Math.floor(Math.random() * emoticons.length)];
    emoticon.style.position = 'fixed';
    emoticon.style.fontSize = '16px';
    emoticon.style.pointerEvents = 'none';
    emoticon.style.zIndex = '1000';
    emoticon.style.color = '#ff6b9d';
    emoticon.style.fontWeight = 'bold';
    emoticon.style.left = Math.random() * window.innerWidth + 'px';
    emoticon.style.top = '100vh';
    emoticon.style.animation = 'emoticonUp 5s ease-out forwards';
    emoticon.style.textShadow = '0 2px 4px rgba(255, 107, 157, 0.3)';
    
    document.body.appendChild(emoticon);
    
    setTimeout(() => {
        emoticon.remove();
    }, 5000);
}

function createCelebrationHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
    
    // Thêm bong bóng chúc mừng
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createBubble();
        }, i * 150);
    }
    
    // Thêm emoticon chúc mừng
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createEmoticon();
        }, i * 200);
    }
}

function createRibbonEffect() {
    const giftBox = document.getElementById('gift-box');
    if (!giftBox) return;
    
    // Tạo ruy băng bay
    for (let i = 0; i < 8; i++) {
        const ribbon = document.createElement('div');
        ribbon.innerHTML = '🎀';
        ribbon.style.position = 'absolute';
        ribbon.style.fontSize = '16px';
        ribbon.style.pointerEvents = 'none';
        ribbon.style.zIndex = '1000';
        
        // Vị trí ngẫu nhiên xung quanh hộp quà
        const angle = (i / 8) * 2 * Math.PI;
        const radius = 200;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        ribbon.style.left = (giftBox.offsetLeft + giftBox.offsetWidth/2 + x) + 'px';
        ribbon.style.top = (giftBox.offsetTop + giftBox.offsetHeight/2 + y) + 'px';
        
        document.body.appendChild(ribbon);
        
        // Animation ruy băng bay
        ribbon.style.animation = 'ribbonFly 2s ease-out forwards';
        
        setTimeout(() => {
            ribbon.remove();
        }, 2000);
    }
}

// Thêm CSS animation cho trái tim bay và hiệu ứng mới
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes giftGlow {
        0%, 100% {
            box-shadow: 0 15px 35px rgba(255, 107, 157, 0.4);
        }
        50% {
            box-shadow: 0 20px 50px rgba(255, 107, 157, 0.8), 0 0 30px rgba(255, 107, 157, 0.6);
        }
    }
    
    @keyframes ribbonFly {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg) translateY(-100px);
        }
    }
    
    @keyframes bubbleUp {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.7;
        }
        25% {
            transform: translateY(-25vh) scale(1.1) rotate(90deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) scale(0.9) rotate(180deg);
            opacity: 0.8;
        }
        75% {
            transform: translateY(-75vh) scale(1.05) rotate(270deg);
            opacity: 0.9;
        }
        100% {
            transform: translateY(-100vh) scale(0.8) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes emoticonUp {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.8;
        }
        25% {
            transform: translateY(-25vh) scale(1.1) rotate(5deg);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) scale(0.95) rotate(-5deg);
            opacity: 0.9;
        }
        75% {
            transform: translateY(-75vh) scale(1.05) rotate(3deg);
            opacity: 0.95;
        }
        100% {
            transform: translateY(-100vh) scale(0.9) rotate(0deg);
            opacity: 0;
        }
    }
    
    @keyframes bodyShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-2px); }
        20% { transform: translateX(2px); }
        30% { transform: translateX(-1px); }
        40% { transform: translateX(1px); }
        50% { transform: translateX(-1px); }
        60% { transform: translateX(1px); }
        70% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        90% { transform: translateX(-1px); }
    }
`;
document.head.appendChild(style);

// Thêm hiệu ứng hover cho các nút
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Thêm hiệu ứng click cho hộp quà
document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.getElementById('gift-box');
    if (giftBox) {
        giftBox.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});
