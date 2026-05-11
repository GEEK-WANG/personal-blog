import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { ExplicitPublish } from "./quartz/plugins/filters/PublishFilter"

/**
 * Quartz 4 Configuration — MathNotes
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "📐 MathNotes",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "zh-CN",
    baseUrl: "geek-wang.github.io/personal-blog",
    ignorePatterns: [
      "blog",
      ".obsidian",
      ".git",
      ".github",
      "node_modules",
      ".superpowers",
      "docs",
      "web",
      "templates",
      "private",
      "__test-",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 204, 237, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1a1a2e",
          lightgray: "#16213e",
          gray: "#4a6fa5",
          darkgray: "#b0c7e0",
          dark: "#e0e8f0",
          secondary: "#64b5f6",
          tertiary: "#90caf9",
          highlight: "rgba(100, 181, 246, 0.12)",
          textHighlight: "#64b5f644",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        parseTags: true,
        parseBlockReferences: true,
        enableCheckbox: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        openLinksInNewTab: false,
      }),
      Plugin.Latex({
        renderEngine: "katex",
        customMacros: {},
      }),
      Plugin.Description({
        descriptionLength: 200,
        replaceExternalLinks: true,
      }),
    ],
    filters: [ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
