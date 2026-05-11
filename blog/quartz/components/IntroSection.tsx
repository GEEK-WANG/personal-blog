import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const IntroSection: QuartzComponent = ((_props?: QuartzComponentProps) => {
  return (
    <div class="intro-section">
      <div class="intro-avatar">📐</div>
      <h1 class="intro-name">MathNotes</h1>
      <p class="intro-bio">微积分学习笔记 · 极限 · 积分 · 零基础</p>
      <div class="intro-tags">
        <span class="intro-tag">数学归纳法</span>
        <span class="intro-tag">洛必达</span>
        <span class="intro-tag">泰勒公式</span>
        <span class="intro-tag">Wallis公式</span>
        <span class="intro-tag">积分技巧</span>
      </div>
      <div class="intro-social">
        <a href="https://github.com/GEEK-WANG" target="_blank" rel="noopener">GitHub</a>
        <span class="intro-divider">·</span>
        <span>中国 · 湖北</span>
      </div>
    </div>
  )
}) satisfies QuartzComponent

IntroSection.css = `
  .intro-section { text-align:center; padding:40px 20px 30px; margin-bottom:8px; }
  .intro-avatar { width:80px; height:80px; margin:0 auto 16px; background:rgba(100,181,246,0.1); border:2px solid rgba(100,181,246,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; backdrop-filter:blur(8px); }
  .intro-name { font-size:2rem; font-weight:700; background:linear-gradient(135deg,#64b5f6,#90caf9); background-clip:text; -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin:0 0 10px; }
  .intro-bio { color:#8fa4c0; font-size:1.05rem; margin:0 0 16px; }
  .intro-tags { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:20px; }
  .intro-tag { background:rgba(22,33,62,0.6); color:#b0c7e0; padding:4px 14px; border-radius:12px; font-size:0.85rem; border:1px solid rgba(100,181,246,0.15); }
  .intro-social { color:#4a6fa5; font-size:0.85rem; }
  .intro-social a { color:#64b5f6!important; }
  .intro-divider { margin:0 8px; opacity:0.5; }
`

export default (() => IntroSection) satisfies QuartzComponentConstructor
