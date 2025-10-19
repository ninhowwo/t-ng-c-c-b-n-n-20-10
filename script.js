// Hệ thống phân phối quà cho 27 tiểu thư
const giftDistribution = {
    // 12 phần giấy note
    "giấy note": [
        "Tiểu thư 1", "Tiểu thư 2", "Tiểu thư 3", "Tiểu thư 4", "Tiểu thư 5", "Tiểu thư 6",
        "Tiểu thư 7", "Tiểu thư 8", "Tiểu thư 9", "Tiểu thư 10", "Tiểu thư 11", "Tiểu thư 12"
    ],
    // 13 phần bút nhớ
    "bút nhớ": [
        "Tiểu thư 13", "Tiểu thư 14", "Tiểu thư 15", "Tiểu thư 16", "Tiểu thư 17", "Tiểu thư 18",
        "Tiểu thư 19", "Tiểu thư 20", "Tiểu thư 21", "Tiểu thư 22", "Tiểu thư 23", "Tiểu thư 24", "Tiểu thư 25"
    ],
    // 1 phần quà đặc biệt của Ninh-chan
    "món quà đặc biệt của Ninh-chan": ["Tiểu thư 26"],
    // 1 phần quà đặc biệt của Nerin ngố
    "món quà đặc biệt của Nerin ngố": ["Tiểu thư 27"]
};

// Biểu tượng cho từng loại quà
const giftIcons = {
    "giấy note": "📝",
    "bút nhớ": "🖊️",
    "món quà đặc biệt của Ninh-chan": "🎁",
    "món quà đặc biệt của Nerin ngố": "🎁"
};

// Màu sắc cho từng loại quà
const giftColors = {
    "giấy note": "#ffb6c1",
    "bút nhớ": "#ffc0cb", 
    "món quà đặc biệt của Ninh-chan": "#ff69b4",
    "món quà đặc biệt của Nerin ngố": "#ff1493"
};

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
    const giftLid = document.getElementById('gift-lid');
    const openGiftBtn = document.getElementById('open-gift-btn');
    
    // Hiệu ứng mở hộp
    if (giftLid) {
        giftLid.classList.add('open');
    }
    
    // Ẩn nút mở quà
    if (openGiftBtn) {
        openGiftBtn.style.opacity = '0';
        openGiftBtn.style.transform = 'scale(0.8)';
    }
    
    // Hiệu ứng sparkle
    createSparkleEffect();
    
    // Sau khi mở hộp, hiển thị quà
    setTimeout(() => {
        selectAndShowGift();
    }, 1000);
}

function createSparkleEffect() {
    const giftBox = document.getElementById('gift-box');
    if (!giftBox) return;
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        // Vị trí ngẫu nhiên xung quanh hộp quà
        const angle = (i / 10) * 2 * Math.PI;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        sparkle.style.left = (giftBox.offsetLeft + giftBox.offsetWidth/2 + x) + 'px';
        sparkle.style.top = (giftBox.offsetTop + giftBox.offsetHeight/2 + y) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animation
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

function selectAndShowGift() {
    // Chọn ngẫu nhiên một loại quà
    const giftTypes = Object.keys(giftDistribution);
    const randomGiftType = giftTypes[Math.floor(Math.random() * giftTypes.length)];
    
    // Lấy danh sách người nhận quà này
    const recipients = giftDistribution[randomGiftType];
    const randomRecipient = recipients[Math.floor(Math.random() * recipients.length)];
    
    currentGift = randomRecipient;
    currentGiftType = randomGiftType;
    
    // Hiển thị kết quả
    showGiftResult(randomGiftType, randomRecipient);
}

function showGiftResult(giftType, recipient) {
    // Chuyển sang trang kết quả
    showPage('result-page');
    
    // Tạo nội dung quà
    const giftResult = document.getElementById('gift-result');
    if (giftResult) {
        giftResult.innerHTML = `
            <div class="gift-item" style="border-color: ${giftColors[giftType]}; background: linear-gradient(135deg, ${giftColors[giftType]}20, ${giftColors[giftType]}10);">
                <div class="gift-icon">${giftIcons[giftType]}</div>
                <div class="gift-name">${giftType}</div>
            </div>
        `;
    }
    
    // Hiển thị thông điệp chúc mừng
    const congratulationsMessage = document.getElementById('congratulations-message');
    if (congratulationsMessage) {
        const messages = [
            `Chúc mừng ${recipient}! 🎉`,
            `Thật tuyệt vời ${recipient}! ✨`,
            `Xin chúc mừng ${recipient}! 💕`,
            `Tuyệt vời ${recipient}! 🌟`
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        congratulationsMessage.textContent = randomMessage;
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

function createCelebrationHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}

// Thêm CSS animation cho trái tim bay
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
