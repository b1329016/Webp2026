var imglist_Url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ca370d51a054836007519a00ff4ce59e&per_page=10&format=json&nojsoncallback=1&t=' + new Date().getTime();

async function getimg() {
console.log("嘗試抓取中...");
try {
const response = await fetch(imglist_Url);
if (!response.ok) throw new Error('網路回應不正常');

const data = await response.json();
console.log("成功拿到資料！", data);
add_new_img(data.photos.photo);
} catch (err) {
console.error("抓取失敗，原因：", err.message);
alert("抓取失敗！請檢查是否連上網路，或嘗試更換瀏覽器。");
}
}

function add_new_img(dataset) {
var gallery = document.getElementById('gallery');
gallery.innerHTML = '';
dataset.forEach(item => {
// 組合 Flickr 圖片網址
var imgUrl = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`;
var imgTag = document.createElement('img');
imgTag.src = imgUrl;
gallery.appendChild(imgTag);
});
}