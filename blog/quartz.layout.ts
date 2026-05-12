import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.TopNav(),
    Component.Search(),
    Component.Darkmode(),
  ],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/GEEK-WANG/personal-blog",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Homepage: show intro, snake, filter, blog cards on index page only
    Component.ConditionalRender({
      component: Component.IntroSection(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.SnakeGrid(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.BlogIndex(),
      condition: (page) => page.fileData.slug === "index",
    }),
    // Note pages: breadcrumbs (not on index)
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // Backlinks and graph only on note pages (not index)
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => page.fileData.slug !== "index",
    }),

  ],
  left: [
    Component.MobileOnly(Component.Explorer()),
    Component.DesktopOnly(Component.Explorer()),
    Component.PageTitle(),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.DesktopOnly(Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 2,
        scale: 1.1,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: [],
        showTags: true,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: [],
        showTags: true,
      },
    })),
  ],
}

// components for pages that display lists of pages (blog homepage)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.IntroSection(),
    Component.SnakeGrid(),
    Component.BlogIndex(),
  ],
  left: [
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
