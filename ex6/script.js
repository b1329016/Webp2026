var container = document.getElementById('container');

// 輔助函數：亂數產生 a-z 的字元串 [cite: 131]
function generateRandomChars(count) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < count; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 封裝「初始化/重置」邏輯 [cite: 143]
function resetGame() {
    // 產生 0 到 2 個字元的隨機字串 [cite: 142]
    var initialCount = Math.floor(Math.random() * 3); 
    container.textContent = generateRandomChars(initialCount);
    container.focus();
}

// 2. 網頁載入時初始化 [cite: 141]
window.onload = function() {
    resetGame();
};

// 監聽 keyup 事件 [cite: 143]
window.addEventListener("keyup", function(e) {
    console.log("按下按鍵:", e.key); // [cite: 130]
    
    var currentStr = container.textContent;

    // 新增功能：按下 Esc 鍵時清除並重來
    if (e.key === 'Escape' || e.key === 'Esc') {
        container.textContent = ""; // 清除目前文字 [cite: 14]
        resetGame(); // 重新隨機產生新字串
        return; // 結束本次事件處理
    }

    // 3. 打入字元和第一個字相等時，消除該字元 [cite: 143]
    if (currentStr.length > 0 && e.key === currentStr[0]) {
        container.textContent = currentStr.substring(1); // 移除首字 [cite: 14]
        
        // 4. 消除後亂數產生 1 到 3 個字元接在後面 [cite: 142]
        add_new_chars();
    }
});

// 實作 add_new_chars 函數 [cite: 142]
function add_new_chars() {
    var addCount = Math.floor(Math.random() * 3) + 1;
    var newChars = generateRandomChars(addCount);
    container.textContent += newChars;
}