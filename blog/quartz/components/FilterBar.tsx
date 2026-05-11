import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { useState } from "preact/hooks"

const CATEGORIES = ["全部", "零基础", "极限", "积分"]

export default (() => {
  const FilterBar: QuartzComponent = (_props: QuartzComponentProps) => {
    const [active, setActive] = useState("全部")

    return (
      <div class="filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            class={`filter-btn ${active === cat ? "active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    )
  }

  FilterBar.css = `
    .filter-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 16px 0;
      justify-content: center;
    }
    .filter-btn {
      padding: 6px 18px;
      border: 1px solid rgba(100, 181, 246, 0.25);
      border-radius: 20px;
      background: rgba(22, 33, 62, 0.5);
      color: #b0c7e0;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.25s;
      backdrop-filter: blur(8px);
    }
    .filter-btn:hover {
      background: rgba(100, 181, 246, 0.15);
      border-color: rgba(100, 181, 246, 0.5);
    }
    .filter-btn.active {
      background: #64b5f6;
      border-color: #64b5f6;
      color: #0d1117;
      font-weight: 600;
    }
  `

  return FilterBar
}) satisfies QuartzComponentConstructor
