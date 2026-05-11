const bg = document.querySelector('.page-bg');
window.addEventListener('resize', () => {
    bg.style.width = window.innerWidth + 'px';
    bg.style.height = window.innerHeight + 'px';
});

const matrix = document.getElementById('pixelMatrix');
const COLS = 50;
const ROWS = 8;
let grid = [];
let snake = [];
let obs = new Set();

function build() {
    matrix.innerHTML = '';
    grid = [];
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            let d = document.createElement('div');
            d.className = 'pixel';
            matrix.appendChild(d);
            grid.push({ x, y, el: d });
        }
    }
    makeObs();
    makeSnake();
}

function makeObs() {
    obs.clear();
    for (let i = 0; i < 24; i++) {
        let x = Math.floor(Math.random() * COLS);
        let y = Math.floor(Math.random() * ROWS);
        let f = grid.find(g => g.x == x && g.y == y);
        if (f && !obs.has(x + ',' + y)) {
            f.el.classList.add('obstacle');
            obs.add(x + ',' + y);
        }
    }
}

function makeSnake() {
    snake = [];
    let cx = Math.floor(COLS / 2);
    let cy = Math.floor(ROWS / 2);
    for (let i = 0; i < 5; i++) snake.push({ x: cx - i, y: cy });
    draw();
}

function draw() {
    grid.forEach(g => g.el.classList.remove('bug'));
    snake.forEach(s => {
        let f = grid.find(g => g.x == s.x && g.y == s.y);
        if (f) f.el.classList.add('bug');
    });
}

function move() {
    let dirs = [{x:1,y:0},{x:-1,y:0},{x:0,y:1},{x:0,y:-1}];
    let valid = dirs.filter(d => {
        let nx = snake[0].x + d.x;
        let ny = snake[0].y + d.y;
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) return false;
        if (obs.has(nx + ',' + ny)) return false;
        return true;
    });
    if (!valid.length) return;
    let d = valid[Math.floor(Math.random() * valid.length)];
    snake.unshift({ x: snake[0].x + d.x, y: snake[0].y + d.y });
    snake.pop();
    draw();
}

build();
setInterval(move, 60);

const btn = document.getElementById('menuToggle');
const side = document.getElementById('sidebar');
btn.onclick = () => side.classList.toggle('show');
document.addEventListener('click', (e) => {
    if (!side.contains(e.target) && !btn.contains(e.target)) side.classList.remove('show');
});

// 文件夹展开/折叠
function toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    folder.classList.toggle('open');
}

// 导航链接点击切换 active 状态
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('progressBar').style.width = '100%';
    }, 500);
});




const musicPlayer = document.getElementById('musicPlayer');
const songName = document.getElementById('songName');
const playBtn = document.getElementById('playBtn');
const audio = document.getElementById('audio');

// 加载音乐
fetch('https://www.cunyuapi.top/rwyymusic')
  .then(res => res.json())
  .then(data => {
    let name = data.name || '未知歌曲';
    // 最多显示7个字
    if (name.length > 7) {
      name = name.slice(0, 7) + '...';
    }
    songName.innerText = name;
    audio.src = data.song_url;
  });

// 播放/暂停
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.classList.add('playing');
  } else {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.classList.remove('playing');
  }
};







// 菜单按钮点击动画
const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', function () {
  this.classList.toggle('active');
});












// 弹窗控制
const modal = document.getElementById('welcomeModal');
const closeBtn = document.getElementById('closeModal');

console.log('Modal element:', modal);
console.log('Close button element:', closeBtn);

window.addEventListener('load', () => {
  console.log('Window loaded, showing modal');
  modal.classList.remove('hidden');
  getAllData();
});

closeBtn.addEventListener('click', () => {
  console.log('Close button clicked, hiding modal');
  modal.classList.add('hidden');
});

// 同时获取三个接口数据
async function getAllData() {
  console.log('Getting all data');
  await getDailyWord();
  await getWeather();
  await getHistoryToday();
  console.log('All data retrieved');
}

// 1. 每日一言
async function getDailyWord() {
  try {
    const res = await fetch('https://www.mxnzp.com/api/daily_word/recommend?app_secret=WnhrK251TWlUUThqaVFWbG5OeGQwdz09&app_id=rgihdrm0kslojqvm');
    const data = await res.json();
    if (data.code === 1) {
      const content = data.data[0].content;
      const author = data.data[0].author ? ' —— ' + data.data[0].author : '';
      document.getElementById('dailyWord').innerText = content + author;
    } else {
      document.getElementById('dailyWord').innerText = '获取失败';
    }
  } catch (e) {
    console.error('Daily word API error:', e);
    document.getElementById('dailyWord').innerText = '加载失败';
  }
}

// 2. 天气（自动定位城市）
async function getWeather() {
  try {
    const res = await fetch('https://uapis.cn/api/v1/misc/weather');
    const d = await res.json();
    const text = `${d.city} | ${d.weather} | ${d.temperature}℃ | ${d.wind_direction}${d.wind_power}`;
    document.getElementById('weatherInfo').innerText = text;
  } catch (e) {
    console.error('Weather API error:', e);
    document.getElementById('weatherInfo').innerText = '获取失败';
  }
}

// 3. 程序员历史上的今天
async function getHistoryToday() {
  try {
    // 使用指定的API获取程序员历史上的今天
    const res = await fetch('https://uapis.cn/api/v1/history/programmer/today');
    const data = await res.json();
    
    if (data && data.events && data.events.length > 0) {
      // 提取第一个历史事件
      const event = data.events[0];
      document.getElementById('historyToday').innerText = `${event.year}年 | ${event.title}`;
    } else {
      document.getElementById('historyToday').innerText = '暂无数据';
    }
  } catch (e) {
    console.error('History API error:', e);
    document.getElementById('historyToday').innerText = '加载失败';
  }
}

// 介绍和关于弹窗控制
function openIntroModal() {
  const modal = document.getElementById('introModal');
  modal.classList.remove('hidden');
  // 从后端获取介绍内容
  fetch('../backend/api.php?type=intro')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById('introContent').innerHTML = data[0].content;
      } else {
        document.getElementById('introContent').innerHTML = '<p>暂无介绍内容</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('introContent').innerHTML = '<p>加载失败</p>';
    });
}

function closeIntroModal() {
  const modal = document.getElementById('introModal');
  modal.classList.add('hidden');
}

function openAboutModal() {
  const modal = document.getElementById('aboutModal');
  modal.classList.remove('hidden');
  // 从后端获取关于内容
  fetch('../backend/api.php?type=about')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById('aboutContent').innerHTML = data[0].content;
      } else {
        document.getElementById('aboutContent').innerHTML = '<p>暂无关于内容</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('aboutContent').innerHTML = '<p>加载失败</p>';
    });
}

function closeAboutModal() {
  const modal = document.getElementById('aboutModal');
  modal.classList.add('hidden');
}