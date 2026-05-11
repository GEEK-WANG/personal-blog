import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TopNav: QuartzComponent = ((_props?: QuartzComponentProps) => {
  return (
    <nav class="top-nav">
      <a href="/" class="top-nav-brand">
        <span class="top-nav-logo">📐</span>
        <span class="top-nav-name">MathNotes</span>
      </a>
      <div class="top-nav-links">
        <a href="/Mathnotes/零基础">零基础</a>
        <a href="/Mathnotes/极限">极限</a>
        <a href="/Mathnotes/积分">积分</a>
      </div>
    </nav>
  )
}) satisfies QuartzComponent

TopNav.css = `
  .top-nav {
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1;
  }
  .top-nav-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none !important;
    color: inherit !important;
    flex-shrink: 0;
  }
  .top-nav-logo {
    font-size: 1.3rem;
    line-height: 1;
  }
  .top-nav-name {
    font-size: 1.1rem;
    font-weight: 700;
    background: linear-gradient(135deg, #64b5f6, #90caf9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    letter-spacing: -0.02em;
  }
  .top-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .top-nav-links a {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    color: #b0c7e0 !important;
    text-decoration: none !important;
    transition: all 0.2s ease;
    font-weight: 500;
  }
  .top-nav-links a:hover {
    background: rgba(100, 181, 246, 0.12);
    color: #e0e8f0 !important;
  }
  @media (max-width: 640px) {
    .top-nav-links { display: none; }
    .top-nav-name { font-size: 1rem; }
  }
`

export default (() => TopNav) satisfies QuartzComponentConstructor
