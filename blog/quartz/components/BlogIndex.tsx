import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { Date, getDate } from "./Date"
import { useState } from "preact/hooks"

const BlogIndex: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles, fileData, displayClass, cfg } = props
  const [activeCat, setActiveCat] = useState("全部")

  if (!allFiles || allFiles.length === 0) {
    return (
      <div class={classNames(displayClass, "blog-index")}>
        <p>No published notes yet.</p>
      </div>
    )
  }

  const sorted = [...allFiles].sort((a, b) => {
    const da = getDate(cfg, a)
    const db = getDate(cfg, b)
    if (da && db) return db.getTime() - da.getTime()
    if (da && !db) return -1
    if (!da && db) return 1
    return 0
  })

  const entries = sorted.map((file) => {
    if (!file.slug) return null
    const segments = file.slug.split("/").filter((s) => s && s !== "index")
    const title = (file.frontmatter?.title as string) ?? simplifySlug(file.slug)
    const desc = (file.frontmatter?.description as string) ?? ""
    const category = segments.length > 0 ? segments[0] : ""
    const link = resolveRelative(fileData.slug!, file.slug)
    const date = getDate(cfg, file)
    return { file, title, desc, category, link, date, slug: file.slug }
  }).filter(Boolean) as {
    file: typeof allFiles[number]
    title: string
    desc: string
    category: string
    link: string
    date: Date | null
    slug: string
  }[]

  const allCategories = [...new Set(entries.map((e) => e.category).filter(Boolean))]
  const categories = ["全部", ...allCategories]

  const filtered = activeCat === "全部" ? entries : entries.filter((e) => e.category === activeCat)

  return (
    <div class={classNames(displayClass, "blog-index")}>
      <div class="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            class={`filter-btn ${activeCat === cat ? "active" : ""}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div class="blog-grid">
        {filtered.map((entry) => (
          <a key={entry.slug} href={entry.link} class="blog-card">
            <h3 class="blog-card-title">{entry.title}</h3>
            <div class="blog-card-meta">
              {entry.date && (
                <span class="blog-card-date">
                  <Date date={entry.date} locale={cfg.locale} />
                </span>
              )}
              {entry.category && <span class="blog-card-cat">{entry.category}</span>}
            </div>
            {entry.desc && <p class="blog-card-desc">{entry.desc}</p>}
          </a>
        ))}
      </div>
    </div>
  )
}

BlogIndex.css = `
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
    font-family: inherit;
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

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 8px 0;
  }
  @media (max-width: 640px) {
    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
  .blog-card {
    display: block;
    padding: 20px;
    background: rgba(22, 33, 62, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 181, 246, 0.1);
    border-radius: 12px;
    text-decoration: none !important;
    color: inherit !important;
    transition: all 0.3s ease;
  }
  .blog-card:hover {
    background: rgba(100, 181, 246, 0.1);
    border-color: rgba(100, 181, 246, 0.3);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(100, 181, 246, 0.1);
  }
  .blog-card-title {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 10px 0;
    color: #e0e8f0;
  }
  .blog-card-meta {
    display: flex;
    gap: 12px;
    font-size: 0.8rem;
    color: #4a6fa5;
    margin-bottom: 8px;
  }
  .blog-card-desc {
    font-size: 0.9rem;
    color: #8fa4c0;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

export default (() => BlogIndex) satisfies QuartzComponentConstructor
