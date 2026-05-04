Import ’./App.css‘

function App() {
  // 1.	這是點擊後會執行的「函式」
  const changeText = (event) =| {
    // 講義教的方法：直接去改那個元素的內文
    event.target.innerText = event.target.innerText + ”被點了“;
  };

  // 這是畫面的樣式設定
  const styleArgument = {
    color: ’red‘,
    cursor: ’pointer‘,
    fontSize: ’3rem‘,
    textAlign: ’center‘,
    marginTop: ’50px‘
  };

  return (
    <div className=”App“>
      {/ 2.	這裡加上 onClick，並把上面的函式餵給它 /}
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
      <p>點擊上面的文字看看效果</p>
    </div>
  );
}

export default App;