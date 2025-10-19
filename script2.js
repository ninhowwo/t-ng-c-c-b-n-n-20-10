// Clone of script.js with gift changed to a small notebook
const giftType = "quyển note nhỏ xinh";
const giftIcon = "📝";
const giftColor = "#ffc0cb";

let currentGift = null;
let currentGiftType = null;

document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function initializePage() {
    showPage('welcome-page');
    createFloatingHearts();
}

function setupEventListeners() {
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', function() {
        showPage('gift-page');
        setTimeout(() => {
            showSpeechBubble();
        }, 500);
    });

    const openGiftBtn = document.getElementById('open-gift-btn');
    openGiftBtn.addEventListener('click', function() {
        openGiftBox();
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
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
    const openingLight = document.getElementById('opening-light');
    const bagBody = document.getElementById('bag-body');
    if (bagOpening) bagOpening.classList.add('open');
    if (openingLight) openingLight.classList.add('active');
    if (bagBody) bagBody.style.animation = 'bodyShake 0.5s ease-in-out';
    if (openGiftBtn) {
        openGiftBtn.style.transition = 'all 0.5s ease';
        openGiftBtn.style.opacity = '0';
        openGiftBtn.style.transform = 'scale(0.8) translateY(20px)';
    }
    setTimeout(() => { createHeartParticles(); }, 200);
    setTimeout(() => { createSparkleEffect(); }, 500);
    setTimeout(() => { selectAndShowGift(); }, 2000);
}

function createHeartParticles() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '💞'];
    const colors = ['#ff6b9d', '#ff8fab', '#ffa8c5', '#ffb6c1', '#dda0dd', '#e6a8d8'];
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize = (6 + Math.random() * 14) + 'px';
            heart.style.left = (Math.random() * 120 + 10) + 'px';
            heart.style.top = (Math.random() * 60 + 10) + 'px';
            heartsContainer.appendChild(heart);
            setTimeout(() => {
                if (heart.parentNode) heart.parentNode.removeChild(heart);
            }, 3000);
        }, i * 100);
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
        const angle = (i / 8) * 2 * Math.PI;
        const radius = 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        sparkle.style.left = (giftBag.offsetLeft + giftBag.offsetWidth/2 + x) + 'px';
        sparkle.style.top = (giftBag.offsetTop + giftBag.offsetHeight/2 + y) + 'px';
        document.body.appendChild(sparkle);
        sparkle.style.animation = 'sparkle 1.5s ease-out forwards';
        setTimeout(() => { sparkle.remove(); }, 1500);
    }
}

function selectAndShowGift() {
    currentGift = "bạn";
    currentGiftType = giftType;
    showGiftResult(giftType, "bạn");
}

function showGiftResult(giftType, recipient) {
    showPage('result-page');
    const giftResult = document.getElementById('gift-result');
    if (giftResult) {
        giftResult.innerHTML = `
            <div class="gift-item" style="border-color: ${giftColor}; background: linear-gradient(135deg, ${giftColor}20, ${giftColor}10);">
                <div class="gift-icon">${giftIcon}</div>
                <div class="gift-name">${giftType}</div>
            </div>
        `;
    }
    const congratulationsMessage = document.getElementById('congratulations-message');
    if (congratulationsMessage) {
        congratulationsMessage.textContent = "Chúc mừng cậu đã nhận được phần quà may mắn của bọn mình! 🎉";
    }
    setTimeout(() => { createCelebrationHearts(); }, 500);
}

function createFloatingHearts() {
    const welcomePage = document.getElementById('welcome-page');
    if (!welcomePage) return;
    setInterval(() => { if (document.getElementById('welcome-page').classList.contains('active')) { createHeart(); } }, 2000);
    setInterval(() => { if (document.getElementById('welcome-page').classList.contains('active')) { createBubble(); } }, 1500);
    setInterval(() => { if (document.getElementById('welcome-page').classList.contains('active')) { createEmoticon(); } }, 3000);
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
    setTimeout(() => { heart.remove(); }, 4000);
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
    setTimeout(() => { bubble.remove(); }, 6000);
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
    setTimeout(() => { emoticon.remove(); }, 5000);
}

function createCelebrationHearts() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => { createHeart(); }, i * 100);
    }
    for (let i = 0; i < 20; i++) {
        setTimeout(() => { createBubble(); }, i * 150);
    }
    for (let i = 0; i < 10; i++) {
        setTimeout(() => { createEmoticon(); }, i * 200);
    }
}

// Extra animations injected
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    @keyframes bubbleUp {
        0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.7; }
        25% { transform: translateY(-25vh) scale(1.1) rotate(90deg); opacity: 1; }
        50% { transform: translateY(-50vh) scale(0.9) rotate(180deg); opacity: 0.8; }
        75% { transform: translateY(-75vh) scale(1.05) rotate(270deg); opacity: 0.9; }
        100% { transform: translateY(-100vh) scale(0.8) rotate(360deg); opacity: 0; }
    }
    @keyframes emoticonUp {
        0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.8; }
        25% { transform: translateY(-25vh) scale(1.1) rotate(5deg); opacity: 1; }
        50% { transform: translateY(-50vh) scale(0.95) rotate(-5deg); opacity: 0.9; }
        75% { transform: translateY(-75vh) scale(1.05) rotate(3deg); opacity: 0.95; }
        100% { transform: translateY(-100vh) scale(0.9) rotate(0deg); opacity: 0; }
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

