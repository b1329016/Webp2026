var container = document.getElementById('container');
var wrongCount = 0; // 新增：用來記錄連續打錯的次數

// 輔助函數：亂數產生 a-z 的字元串
function generateRandomChars(count) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < count; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 初始化/重置邏輯
function resetGame() {
    var initialCount = Math.floor(Math.random() * 3); 
    container.textContent = generateRandomChars(initialCount);
    wrongCount = 0; // 重置打錯計數
    container.focus();
}

window.onload = function() {
    resetGame();
};

// 監聽 keyup 事件
window.addEventListener("keyup", function(e) {
    var currentStr = container.textContent;

    // 按下 Esc 重來
    if (e.key === 'Escape') {
        resetGame();
        return;
    }

    // 檢查是否有文字可以比對
    if (currentStr.length === 0) return;

    // --- 比對邏輯 ---
    if (e.key === currentStr[0]) {
        // 1. 打對了：消除首字，並重置打錯計數
        container.textContent = currentStr.substring(1);
        wrongCount = 0; 
        
        // 呼叫原本的增加字串函數 (1~3個)
        add_new_chars();
    } else {
        // 2. 打錯了：打錯計數 +1
        wrongCount++;
        console.log("連續打錯次數: " + wrongCount);

        // 3. 判斷是否連續打錯三次
        if (wrongCount >= 3) {
            console.log("觸發懲罰：額外增加 3 個亂數！");
            
            // 額外增加 3 個亂數產生的字串
            var penaltyChars = generateRandomChars(3);
            container.textContent += penaltyChars;
            
            // 觸發懲罰後，通常會重置計數，重新計算下一次連續三次
            wrongCount = 0; 
        }
    }
});

// 實作原本 ex#6 要求的新增函數
function add_new_chars() {
    var addCount = Math.floor(Math.random() * 3) + 1;
    var newChars = generateRandomChars(addCount);
    container.textContent += newChars;
}