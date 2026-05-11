import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { Date, getDate } from "./Date"

const BlogIndex: QuartzComponent = (props: QuartzComponentProps) => {
  const { allFiles, fileData, displayClass, cfg } = props

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

  return (
    <div class={classNames(displayClass, "blog-index")}>
      <div class="blog-grid">
        {sorted.map((file) => {
          if (!file.slug) return null
          const title =
            (file.frontmatter?.title as string) ?? simplifySlug(file.slug)
          const desc = (file.frontmatter?.description as string) ?? ""
          const segments = file.slug.split("/").filter((s) => s && s !== "index")
          const category = segments.length > 0 ? segments[0] : ""
          const link = resolveRelative(fileData.slug!, file.slug)
          const date = getDate(cfg, file)

          return (
            <a key={file.slug} href={link} class="blog-card">
              <h3 class="blog-card-title">{title}</h3>
              <div class="blog-card-meta">
                {date && (
                  <span class="blog-card-date">
                    <Date date={date} locale={cfg.locale} />
                  </span>
                )}
                {category && <span class="blog-card-cat">{category}</span>}
              </div>
              {desc && <p class="blog-card-desc">{desc}</p>}
            </a>
          )
        })}
      </div>
    </div>
  )
}

BlogIndex.css = `
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
