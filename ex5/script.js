var count = 1; // 初始化計數器

// 生成按鈕的函數
function addfunction() {
    // 建立按鈕物件
    var btn = document.createElement("BUTTON");
    
    // 設定按鈕文字，使用模板字串放入目前的 count 值
    btn.innerHTML = `CLICK ME (${count})`;
    
    // 設定唯一 ID (例如 btn_1, btn_2) 並在設定後讓 count 加 1
    btn.setAttribute("id", "btn_" + count++);
    
    // 設定 Bootstrap 樣式：紅色外框按鈕
    btn.setAttribute("class", "btn btn-outline-danger ms-2");
    
    // 在主控台印出物件資訊供除錯
    console.log(btn);
    
    // 將按鈕加入網頁
    document.body.appendChild(btn);
};

// 刪除按鈕的函數
function delfunction() {
    // 透過 ID 尋找最後一個生成的按鈕，並先將 count 減 1 (--count)
    var btn = document.getElementById("btn_" + --count);
    
    // 印出即將刪除的物件
    console.log(btn);
    
    // 如果該物件存在，則從 body 中移除
    if (btn) {
        document.body.removeChild(btn);
    }
};