// 1. 設定 API 網址 (category=6 為展覽資訊)
var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

// 2. 建立 XMLHttpRequest 物件並發送請求
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

// 3. 監控請求狀態
xhr.onreadystatechange = function() {
    // readyState 4: 請求已完成；status 200: 成功回應
    if (this.readyState == 4 && this.status == 200) {
        // 將 JSON 字串解析為 JavaScript 陣列物件
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset);
    }
};

// 4. 定義渲染資料的函數
function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    
    // 遍歷所有展覽資料
    dataset.forEach(function(data, index) {
        // 5. 在表格末端插入新行 (-1 代表最後)
        var row = myTable.insertRow(-1);
        
        // 6. 依照 JSON 結構插入儲存格 (innerHTML 寫入內容)
        // 第一格：展覽名稱 (title)
        row.insertCell(0).innerHTML = data['title'];
        
        // 第二格：地點 (showInfo 陣列的第一筆資料中的 location)
        // 注意：需確保 showInfo[0] 存在
        var locationInfo = data['showInfo'][0] ? data['showInfo'][0]['location'] : "暫無地點";
        row.insertCell(1).innerHTML = locationInfo;
        
        // 第三格：票價 (showInfo 陣列的第一筆資料中的 price)
        var priceInfo = data['showInfo'][0] ? data['showInfo'][0]['price'] : "無票價資訊";
        row.insertCell(2).innerHTML = priceInfo;
    });
}

// 7. 延伸功能：一行一行刪除 (從最下方開始)
function deleteRowByRow() {
    var myTable = document.getElementById("csie");
    var rowCount = myTable.rows.length; // 獲取當前總行數

    // 只要行數大於 1 (保留標題列 index 0)，就執行刪除
    if (rowCount > 1) {
        // 刪除最後一行的索引值 (總數 - 1)
        myTable.deleteRow(rowCount - 1);
    } else {
        alert("已經沒有資料可以刪除囉！");
    }
}