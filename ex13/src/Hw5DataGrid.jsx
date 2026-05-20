import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

function Hw5DataGrid() {
  // 1. 定義 State：用來儲存從文化部 API 抓回來的展覽總資料
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true); // 載入中的狀態動畫

  // 2. 定義 DataGrid 的欄位 (Columns)
  // 這裡對應 API 資料的欄位：title 還有 showInfo 內部的資訊
  const columns = [
    { field: 'title', headerName: '活動名稱', width: 400 },
    { 
      field: 'location', 
      headerName: '地點', 
      width: 300,
      // 因為地點藏在 showInfo[0].location 裡面，我們用 valueGetter 來取出
      valueGetter: (value, row) => {
        const info = row.showInfo?.[0];
        return info ? info.location : '無地點';
      }
    },
    { 
      field: 'price', 
      headerName: '票價', 
      width: 200,
      // 同理，票價藏在 showInfo[0].price 裡面
      valueGetter: (value, row) => {
        const info = row.showInfo?.[0];
        return info ? info.price : '無票價';
      }
    }
  ];

  // 3. 呼叫 API 的 useEffect (參考老師講義範例)
  useEffect(() => {
    const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
    
    setLoading(true);
    fetch(openUrl)
      .then((res) => res.json())
      .then((json) => {
        // ⚠️ 關鍵防呆：DataGrid 強制要求每筆資料都要有唯一的 "id" 欄位。
        // 但文化部 API 預設沒有給 id，所以我們用 map 自動幫每筆資料補上 id = 索引值或 UID
        const dataWithId = json.map((item, index) => ({
          id: item.UID || index, // 如果資料本身有 UID 就用 UID，沒有就用 index 當 id
          ...item
        }));
        
        setRows(dataWithId); // 將整理好、帶有 id 的資料存進 state
        setLoading(false);
      })
      .catch((error) => {
        console.error("抓取 API 失敗:", error);
        setLoading(false);
      });
  }, []); // 保持空陣列 []，代表網頁一打開只會執行這一次抓取

  return (
    <Box sx={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" component="h2" sx={{ color: '#00a86b', fontWeight: 'bold', marginBottom: '20px' }}>
        景點觀光展覽資訊
      </Typography>

      {/* 4. 這裡就是 DataGrid 表格區 */}
      {/* 外層必須包裹一個給定高度與寬度的容器，DataGrid 才能正常拉伸 */}
      <Box sx={{ height: 600, width: '100%', backgroundColor: '#fff', boxShadow: 1, borderRadius: 1 }}>
        <DataGrid
          rows={rows}                // 倒入 useEffect 抓回來的資料
          columns={columns}          // 倒入上面定義好的欄位結構
          loading={loading}          // 當資料還在抓取時，自動顯示轉圈圈動畫
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // 預設每頁顯示 10 筆資料
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}     // 讓使用者可以自由調整一頁要看幾筆
          checkboxSelection                     // 開啟最左邊的勾選方塊功能
          disableRowSelectionOnClick            // 點擊儲存格時，不會誤勾選整列
        />
      </Box>
    </Box>
  );
}

export default Hw5DataGrid;