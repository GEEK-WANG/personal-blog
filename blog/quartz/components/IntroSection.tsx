import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const IntroSection: QuartzComponent = ((_props?: QuartzComponentProps) => {
  return (
    <div class="intro-section">
      <div class="intro-inner">
        <div class="intro-avatar">📐</div>
        <div class="intro-text">
          <h1 class="intro-name">MathNotes</h1>
          <p class="intro-bio">微积分学习笔记 · 极限 · 积分 · 零基础</p>
        </div>
        <div class="intro-tags">
          <span class="intro-tag">数学归纳法</span>
          <span class="intro-tag">洛必达</span>
          <span class="intro-tag">泰勒公式</span>
          <span class="intro-tag">Wallis公式</span>
          <span class="intro-tag">积分技巧</span>
        </div>
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
  .intro-section {
    padding: 24px 0 16px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(100, 181, 246, 0.1);
  }
  .intro-inner {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .intro-avatar {
    width: 48px;
    height: 48px;
    background: rgba(100, 181, 246, 0.1);
    border: 1.5px solid rgba(100, 181, 246, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    backdrop-filter: blur(8px);
    flex-shrink: 0;
  }
  .intro-text {
    flex: 1;
    min-width: 200px;
  }
  .intro-name {
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(135deg, #64b5f6, #90caf9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 4px;
    letter-spacing: -0.02em;
  }
  .intro-bio {
    color: #8fa4c0;
    font-size: 0.95rem;
    margin: 0;
  }
  .intro-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-left: auto;
  }
  .intro-tag {
    background: rgba(22, 33, 62, 0.6);
    color: #b0c7e0;
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    border: 1px solid rgba(100, 181, 246, 0.15);
    transition: all 0.2s ease;
  }
  .intro-tag:hover {
    background: rgba(100, 181, 246, 0.12);
    border-color: rgba(100, 181, 246, 0.3);
  }
  .intro-social {
    color: #4a6fa5;
    font-size: 0.8rem;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(100, 181, 246, 0.06);
  }
  .intro-social a {
    color: #64b5f6 !important;
    text-decoration: none !important;
  }
  .intro-divider {
    margin: 0 8px;
    opacity: 0.5;
  }
  @media (max-width: 640px) {
    .intro-inner {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .intro-tags {
      margin-left: 0;
    }
    .intro-name {
      font-size: 1.3rem;
    }
  }
`

export default (() => IntroSection) satisfies QuartzComponentConstructor
