import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const COLS = 50
const ROWS = 8

const snakeScript = `
(function() {
  const container = document.querySelector(".snake-grid-inner");
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = "true";

  const cells = [];
  for (let y = 0; y < ${ROWS}; y++) {
    for (let x = 0; x < ${COLS}; x++) {
      const cell = document.createElement("div");
      cell.className = "pixel-cell";
      container.appendChild(cell);
      cells.push(cell);
    }
  }

  const obstacles = new Set();
  while (obstacles.size < 24) {
    const x = Math.floor(Math.random() * ${COLS});
    const y = Math.floor(Math.random() * ${ROWS});
    const key = x + "," + y;
    if (!obstacles.has(key)) {
      obstacles.add(key);
      cells[y * ${COLS} + x].classList.add("pixel-obstacle");
    }
  }

  const cx = Math.floor(${COLS} / 2);
  const cy = Math.floor(${ROWS} / 2);
  const snake = [];
  for (let i = 0; i < 5; i++) snake.push({ x: cx - i, y: cy });

  function draw() {
    cells.forEach(c => c.classList.remove("pixel-bug"));
    snake.forEach(s => {
      const idx = s.y * ${COLS} + s.x;
      if (idx >= 0 && idx < cells.length) cells[idx].classList.add("pixel-bug");
    });
  }
  draw();

  const dirs = [{ x:1, y:0 }, { x:-1, y:0 }, { x:0, y:1 }, { x:0, y:-1 }];
  setInterval(() => {
    const head = snake[0];
    const valid = dirs.filter(d => {
      const nx = head.x + d.x, ny = head.y + d.y;
      if (nx < 0 || ny < 0 || nx >= ${COLS} || ny >= ${ROWS}) return false;
      if (obstacles.has(nx + "," + ny)) return false;
      return true;
    });
    if (!valid.length) return;
    const m = valid[Math.floor(Math.random() * valid.length)];
    snake.unshift({ x: head.x + m.x, y: head.y + m.y });
    snake.pop();
    draw();
  }, 60);
})();
`

export default (() => {
  const SnakeGrid: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div class="snake-grid-outer">
        <div class="snake-grid-label">🐍 Notes Activity</div>
        <div class="snake-grid-inner" />
      </div>
    )
  }

  SnakeGrid.css = `
    .snake-grid-outer {
      width: 100%;
      margin: 20px 0;
      padding: 16px;
      background: rgba(22, 33, 62, 0.4);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(100, 181, 246, 0.1);
      border-radius: 12px;
    }
    .snake-grid-label {
      font-size: 0.85rem;
      color: #b0c7e0;
      text-align: center;
      margin-bottom: 10px;
    }
    .snake-grid-inner {
      display: grid;
      grid-template-columns: repeat(${COLS}, 1fr);
      grid-template-rows: repeat(${ROWS}, 1fr);
      gap: 2px;
      width: 100%;
      aspect-ratio: ${COLS} / ${ROWS};
      border-radius: 6px;
      overflow: hidden;
      min-height: 40px;
    }
    .pixel-cell {
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.7);
      min-width: 2px;
      min-height: 2px;
    }
    .pixel-obstacle {
      background: rgb(8, 150, 13);
    }
    .pixel-bug {
      background: #ffffff;
      box-shadow: 0 0 8px #ffffff;
    }
  `

  SnakeGrid.afterDOMLoaded = snakeScript

  return SnakeGrid
}) satisfies QuartzComponentConstructor
