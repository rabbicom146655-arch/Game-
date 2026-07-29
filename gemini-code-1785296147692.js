// Telegram SDK Initialize
const tg = window.Telegram.WebApp;
tg.expand(); // অ্যাপ ফুলস্ক্রিন করা

// Elements Get
const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const energyDisplay = document.getElementById('energy');
const userNameDisplay = document.getElementById('user-name');

// Initial States
let score = 0;
let energy = 1000;
const maxEnergy = 1000;

// Telegram থেকে ইউজারের নাম ডাটা নিয়ে দেখানো
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    userNameDisplay.innerText = tg.initDataUnsafe.user.first_name;
}

// Tap Click Listener
coin.addEventListener('click', (e) => {
    if (energy > 0) {
        score += 1;
        energy -= 1;
        
        scoreDisplay.innerText = score;
        energyDisplay.innerText = energy;

        // ফোনে ভাইব্রেশন দেওয়া (Haptic Feedback)
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    }
});

// প্রতি ১ সেকেন্ডে ২ করে এনার্জি রিচার্জ
setInterval(() => {
    if (energy < maxEnergy) {
        energy = Math.min(maxEnergy, energy + 2);
        energyDisplay.innerText = energy;
    }
}, 1000);