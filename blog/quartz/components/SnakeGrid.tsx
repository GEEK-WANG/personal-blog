import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useEffect, useRef } from "preact/hooks"

const COLS = 50
const ROWS = 8

export default (() => {
  const SnakeGrid: QuartzComponent = (_props: QuartzComponentProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (!containerRef.current) return
      const matrix = containerRef.current
      matrix.innerHTML = ""

      const cells: HTMLDivElement[] = []
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const cell = document.createElement("div")
          cell.className = "pixel-cell"
          matrix.appendChild(cell)
          cells.push(cell)
        }
      }

      const obstacles = new Set<string>()
      for (let i = 0; i < 24; i++) {
        const x = Math.floor(Math.random() * COLS)
        const y = Math.floor(Math.random() * ROWS)
        const idx = y * COLS + x
        if (!obstacles.has(`${x},${y}`)) {
          cells[idx].classList.add("pixel-obstacle")
          obstacles.add(`${x},${y}`)
        }
      }

      const cx = Math.floor(COLS / 2)
      const cy = Math.floor(ROWS / 2)
      const snake: { x: number; y: number }[] = []
      for (let i = 0; i < 5; i++) snake.push({ x: cx - i, y: cy })

      const draw = () => {
        cells.forEach((c) => c.classList.remove("pixel-bug"))
        snake.forEach((s) => {
          const idx = s.y * COLS + s.x
          if (idx >= 0 && idx < cells.length) cells[idx].classList.add("pixel-bug")
        })
      }
      draw()

      const dirs = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ]
      const interval = setInterval(() => {
        const head = snake[0]
        const valid = dirs.filter((d) => {
          const nx = head.x + d.x
          const ny = head.y + d.y
          if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) return false
          if (obstacles.has(`${nx},${ny}`)) return false
          return true
        })
        if (valid.length === 0) return
        const move = valid[Math.floor(Math.random() * valid.length)]
        snake.unshift({ x: head.x + move.x, y: head.y + move.y })
        snake.pop()
        draw()
      }, 60)

      return () => clearInterval(interval)
    }, [])

    return (
      <div class="snake-grid-outer">
        <div class="snake-grid-label">Notes Activity</div>
        <div
          ref={containerRef}
          class="snake-grid-inner"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gap: "2px",
          }}
        />
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
      width: 100%;
      aspect-ratio: 50 / 8;
      border-radius: 6px;
      overflow: hidden;
    }
    .pixel-cell {
      border-radius: 2px;
      background: rgba(255, 255, 255, 0.7);
      min-width: 3px;
      min-height: 3px;
    }
    .pixel-obstacle {
      background: rgb(8, 150, 13);
    }
    .pixel-bug {
      background: #c400e0;
      box-shadow: 0 0 6px #c400e0;
    }
  `

  return SnakeGrid
}) satisfies QuartzComponentConstructor
