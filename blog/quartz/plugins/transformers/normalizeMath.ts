import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const NormalizeMath: QuartzTransformerPlugin = () => {
  return {
    name: "NormalizeMath",
    markdownPlugins() {
      const fixPatterns = (val: string): string => {
        // Split $$\begin{X} on same line -> $$\n\begin{X}
        val = val.replace(/(\$\$)(\\begin\{[a-zA-Z*]+\})/g, "$1\n$2")
        // Split \end{X}$$ on same line -> \end{X}\n$$
        val = val.replace(/(\\end\{[a-zA-Z*]+\})(\$\$)/g, "$1\n$2")
        return val
      }

      return [
        () => (tree: any) => {
          // Visit ALL text-like nodes (use string visitor for any node type)
          visit(tree, (node: any) => {
            if (node.value && typeof node.value === "string") {
              node.value = fixPatterns(node.value)
            }
            if (node.children) {
              for (const child of node.children) {
                if (child.value && typeof child.value === "string") {
                  child.value = fixPatterns(child.value)
                }
              }
            }
          })
        },
      ]
    },
    htmlPlugins() {
      return [
        () => (tree: any) => {
          // Fix HTML-escaped & in math code blocks
          visit(tree, "element", (node: any) => {
            if (
              node.tagName === "code" &&
              node.properties?.className?.some?.((c: string) =>
                c === "language-math",
              )
            ) {
              visit(node, "text", (textNode: any) => {
                if (typeof textNode.value === "string") {
                  textNode.value = textNode.value.replace(/&amp;/g, "&")
                }
              })
            }
          })
        },
      ]
    },
  }
}
