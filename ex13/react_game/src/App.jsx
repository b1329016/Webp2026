import React, { useState } from 'react';
import './App.css'; // 記得在同資料夾建立樣式檔，或把 CSS 貼在底下

// === 1. 最小的格子元件 (Square) ===
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// === 2. 棋盤元件 (Board) ===
function Board({ xIsNext, squares, onPlay }) {
  // 點擊格子的處理函式
  function handleClick(i) {
    // 防呆機制：如果這一格已經有東西，或是已經分出輸贏，就不能再點
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    const nextSquares = squares.slice(); // 複製一份新的陣列（不可變動性）
    if (xIsNext) {
      nextSquares[i] = 'O'; // 根據講義範例，通常先手是 O 或者是 X，這裡用 O
    } else {
      nextSquares[i] = 'X';
    }
    onPlay(nextSquares); // 把更新後的棋盤狀態傳回給 Game 元件
  }

  // 判斷目前狀態（誰贏了，或是輪到誰）
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = '贏家是: ' + winner;
  } else {
    status = '下一步: ' + (xIsNext ? 'O' : 'X');
  }

  return (
    <>
      <div className="status">{status}</div>
      {/* 畫出 3x3 的格子棋盤 */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// === 3. 遊戲核心主元件 (Game) ===
export default function Game() {
  // 記錄遊戲的歷史步數陣列，初始值為一個包含 9 個 null 的陣列
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0); // 目前停留在第幾步
  const xIsNext = currentStep % 2 === 0; // 偶數步輪到 O，奇數步輪到 X
  const currentSquares = history[currentStep]; // 取得目前步驟的棋盤狀態

  // 當格子被點擊、棋盤狀態更新時執行的函式
  function handlePlay(nextSquares) {
    // 如果玩家回到過去重新下棋，要切斷原本後面的歷史紀錄
    const nextHistory = [...history.slice(0, currentStep + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentStep(nextHistory.length - 1);
  }

  // 跳轉到歷史某一步的按鈕功能（時光機）
  function jumpTo(nextStep) {
    setCurrentStep(nextStep);
  }

  // 產生右側的歷史紀錄按鈕清單
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `回到 #${move} 步`;
    } else {
      description = '遊戲開始';
    }
    return (
      <li key={move}>
        <button className="history-btn" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game-container">
      <h1 className="game-title">React 圈叉遊戲 (OXO)</h1>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <h3>歷史紀錄：</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

// === 4. 輔助函式：判斷贏家的演算法 ===
function calculateWinner(squares) {
  // 井字棋所有可能的連線獲勝組合（橫的、豎的、斜的）
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫線
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 豎線
    [0, 4, 8], [2, 4, 6]             // 斜線
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // 如果 a 有值，且 a 等於 b，a 也等於 c，代表連線成功！
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 回傳贏家是 'O' 還是 'X'
    }
  }
  return null; // 尚未分出輸贏
}